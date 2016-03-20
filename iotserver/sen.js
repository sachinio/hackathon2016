/**
 * Created by spatney on 3/16/2016.
 */

var path = require('path');
var Glimpse = require('pbi-glimpse');
var scales = require('../node_modules/scales/scales.js');
var _ = require('lodash');

var glimpseSoccer = new Glimpse('soccer', path.join(__dirname,'soccer.js'));


var soccer;

glimpseSoccer.connect(function(err, socket) {
    soccer = socket;
    console.log('soccer connected');
    if(err) return console.log('ERROR', err);
});

var net = require('net');
var HOST = '127.0.0.1';
var sensoriaShoe = new net.Socket();

sensoriaShoe.connect(8001, HOST, function() {
    console.log('CONNECTED TO Shoe');
});

var minMin = 700;
var maxMax = 1000;

var s0Max = minMin;
var s1Max = minMin;
var s2Max = minMin;
var s0Min = maxMax;
var s1Min = maxMax;
var s2Min = maxMax;
var autoCalibrate = true;
var bChunk = "";
sensoriaShoe.on('data', function(data) {
    data = data.toString('utf8');
    bChunk+=data;
    if(data.indexOf('+') !== -1){
        var arr = bChunk.split('+');

        data = arr[0].split(',');
        bChunk = arr[1];

        if(data.length > 2) {
            if (soccer) {
                var one = parseInt(data[0]);
                var two = parseInt(data[1]);
                var three = parseInt(data[2]);

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
                    side: s2(three),
                };
                soccer.emit('update', r);
                //console.log(r);
            }
        }
    }
});