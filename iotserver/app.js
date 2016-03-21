var path = require('path');
var Glimpse = require('pbi-glimpse');
var scales = require('../node_modules/scales/scales.js');
var _ = require('lodash');

var arduinoPort = "/dev/ttyACM0";
var xbeePort = "/dev/ttyAMA0";

var glimpse = new Glimpse('soil', path.join(__dirname,'soil.js'));
var glimpse2 = new Glimpse('rain', path.join(__dirname,'rain.js'));
var glimpse3 = new Glimpse('distance', path.join(__dirname,'text.js'));
var glimpse4 = new Glimpse('orient', path.join(__dirname,'glimpse.js'));
var glimpse5 = new Glimpse('light', path.join(__dirname,'light.js'));
var glimpse6 = new Glimpse('vote', path.join(__dirname,'vote.js'));

var soil;
var rain;
var distance;
var orient;
var light;
var vote;

glimpse.connect(function(err, socket) {
    soil = socket;
    console.log('soil connected');
    if(err) return console.log('ERROR', err);
});

glimpse2.connect(function(err, socket) {
    rain = socket;
    console.log('rain connected');
    if(err) return console.log('ERROR', err);
});

glimpse3.connect(function(err, socket) {
    distance = socket;
    console.log('distance connected');
    if(err) return console.log('ERROR', err);
});

glimpse4.connect(function(err, socket) {
    orient = socket;
    console.log('orient connected');
    if(err) return console.log('ERROR', err);
});

glimpse5.connect(function(err, socket){
    light = socket;
    console.log('light connected');
    if(err) return console.log('ERROR', err);

    socket.on('light', function(data){
        if(xbee) {
            xbee.write('1-' + (data ? '1' : '0') + '-');
        }
    })
});

glimpse6.connect(function(err, socket) {
    vote = socket;
    console.log('vote connected');
    if(err) return console.log('ERROR', err);
});


var votes = ['Glimpse','Hololens','XBOX','Custom Visuals','Chocolate','Sprite'];

var votingSim = function() {
    setInterval(function(){
        var i = Math.random() * 1000 % votes.length |0
        if(vote)vote.emit('update', votes[i]);
    },2000);
}

//votingSim();

//return;

var SerialPort = require("serialport").SerialPort;

var arduino101 = new SerialPort(arduinoPort, {
    baudrate: 115200
});

var xbee = new SerialPort(xbeePort, {
    baudrate: 9600
});

var scale = scales.linear()
    .domain([250, 1050])
    .range([7, 1]);

var scale2 = scales.linear()
    .domain([7, 1])
    .range([0, 1]);


var chunk = "";
arduino101.on("open", function () {
    console.log('open');
    var la = new Date().getTime();
    var la2 = new Date().getTime();
    arduino101.on('data', function (data) {
        var dataUtf8 = data.toString('utf8');
        if(dataUtf8.indexOf('E') === -1){
            chunk +=dataUtf8;
        }else {
            chunk += dataUtf8;
            var arr = chunk.split('E');
            dataUtf8 = arr[0];
            chunk = arr[1];
            dataUtf8 = dataUtf8.split(',');
            if (dataUtf8.length === 7) {
                var ti = new Date().getTime();
                var ti2 = new Date().getTime();
                if (soil && rain && distance && orient) {
                    if ((ti - la) > 1000) {
                        la = ti;
                        soil.emit('update', dataUtf8[0]);
                        rain.emit('rain', dataUtf8[1]);
                    }
                    if ((ti2 - la2) > 100) {
                        la2 = ti2;
                        var dist =Math.floor(scale(dataUtf8[2]));
                        distance.emit('update', {
                            text: dist + ' cm',
                            width: scale2(dist)
                        });
                    }
                    orient.emit('update', dataUtf8[5]);
                }
            }
        }
    });
});