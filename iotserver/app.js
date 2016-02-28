var path = require('path');
var Glimpse = require('pbi-glimpse');

var sport = "COM6"
var glimpse = new Glimpse('soil', path.join(__dirname,'soil.js'));
var glimpse2 = new Glimpse('rain', path.join(__dirname,'rain.js'));
var glimpse3 = new Glimpse('distance', path.join(__dirname,'multi.js'));
var glimpse4 = new Glimpse('orient', path.join(__dirname,'glimpse.js'));
var soil;
var rain;
var distance;
var orient;

glimpse.connect(function(err, socket) {
    soil = socket;
    console.log('connected');
    if(err) return console.log('ERROR', err);
});

glimpse2.connect(function(err, socket) {
    rain = socket;
    console.log('connected');
    if(err) return console.log('ERROR', err);
});

glimpse3.connect(function(err, socket) {
    distance = socket;
    console.log('connected');
    if(err) return console.log('ERROR', err);
});

glimpse4.connect(function(err, socket) {
    orient = socket;
    console.log('connected');
    if(err) return console.log('ERROR', err);
});
//return;
var SerialPort = require("serialport").SerialPort
var serialPort = new SerialPort(sport, {
    baudrate: 115200
});

var chunk = "";
serialPort.on("open", function () {
    console.log('open');
    var la = new Date().getTime();
    serialPort.on('data', function (data) {
        var s = data.toString('utf8').split(',');

        if(s.indexOf('E') === -1){
            chunk +=s;
        }else {
            chunk += s;
            var arr = chunk.split('E');
            s = arr[0];
            chunk = arr[1];

            if (s.length === 6) {
                var ti = new Date().getTime();
                if (soil && rain && distance && orient) {
                    if ((ti - la) > 1000) {
                        la = ti;
                        soil.emit('update', s[0]);
                        rain.emit('rain', s[1]);

                    }
                    distance.emit('update', s[2]);
                    //console.log(s[5]);
                    orient.emit('update', s[5]);
                }
            }
        }
    });
});