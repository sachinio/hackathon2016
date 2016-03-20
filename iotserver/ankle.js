var path = require('path');
var Glimpse = require('pbi-glimpse');
var scales = require('../node_modules/scales/scales.js');
var _ = require('lodash')

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


var minMin = 700;
var maxMax = 1000;

var s0Max = minMin;
var s1Max = minMin;
var s2Max = minMin;
var s0Min = maxMax;
var s1Min = maxMax;
var s2Min = maxMax;
var autoCalibrate = true;
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

                var one = parseInt(data[5]);
                var two = parseInt(data[6]);
                var three = parseInt(data[7]);

                if(autoCalibrate) {
                    s0Max = _.min([maxMax, _.max([one, s0Max])]);
                    s1Max = _.min([maxMax, _.max([two, s1Max])]);
                    s2Max = _.min([maxMax, _.max([three, s2Max])]);

                    s0Min = _.max([minMin,_.min([one, s0Min])]);
                    s1Min = _.max([minMin,_.min([two, s1Min])]);
                    s2Min = _.max([minMin,_.min([three, s2Min])]);
                }

                var s0 = scales.linear()
                    .domain([s0Min, s0Max])
                    .range([0, 1]);

                var s1 = scales.linear()
                    .domain([s1Min, s1Max])
                    .range([0, 1]);

                var s2 = scales.linear()
                    .domain([s2Min, s2Max])
                    .range([0, 1]);

                var r = {
                    left: s0(one),
                    right: s1(two),
                    heel: s2(three),
                };
                
                console.log(r);
                ankle.emit('update', r);
            }
        }
    }
});