var path = require('path');
var Glimpse = require('pbi-glimpse');
var scales = require('../node_modules/scales/scales.js');

var glimpseSteps = new Glimpse('steps', path.join(__dirname,'text.js'));
var glimpseState = new Glimpse('state', path.join(__dirname,'text.js'));
var glimpseAnkle = new Glimpse('ankle', path.join(__dirname,'soccer.js'));

var steps;
var state;
var ankle;

glimpseSteps.connect(function(err, socket) {
    steps = socket;
    console.log('steps connected');
    if(err) return console.log('ERROR', err);
});

glimpseState.connect(function(err, socket) {
    state = socket;
    console.log('state connected');
    if(err) return console.log('ERROR', err);
});

glimpseAnkle.connect(function(err, socket) {
    ankle = socket;
    console.log('state connected');
    if(err) return console.log('ERROR', err);
});

var net = require('net');
var HOST = '127.0.0.1';
var sensoriaAnklet = new net.Socket();

sensoriaAnklet.connect(8002, HOST, function() {
    console.log('CONNECTED TO Anklet');
});

var sChunk = "";

var scale = scales.linear()
    .domain([100, 500]) //input domain
    .range([0, 1]);

sensoriaAnklet.on('data', function(data) {
    data = data.toString('utf8');
    sChunk+=data;
    if(data.indexOf('+') !== -1){
        var arr = sChunk.split('+');

        data = arr[0].split(',');
        sChunk = arr[1];

        if(data.length  > 5) {
            if(steps !== undefined && state!== undefined && ankle !== undefined) {
                steps.emit('update', data[0]);
                state.emit('update', data[4]);
                var r = {
                    left: scale(parseInt(data[5])),
                    right: scale(parseInt(data[6])),
                    heel: scale(parseInt(data[7])),
                };
                console.log(r);
                ankle.emit('update', r);
            }
        }
    }
});