/**
 * Created by spatney on 3/16/2016.
 */

var path = require('path');
var Glimpse = require('pbi-glimpse');

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
                var r = {
                    left: (1000 - parseInt(data[0])) / 1000,
                    right: (1000 - parseInt(data[1])) / 1000,
                    side: (1000 - parseInt(data[2])) / 1000,
                }
                soccer.emit('update', r);
                console.log(r);
            }
        }
    }
});