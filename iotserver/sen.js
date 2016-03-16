/**
 * Created by spatney on 3/16/2016.
 */

var path = require('path');
var Glimpse = require('pbi-glimpse');

var glimpseSteps = new Glimpse('steps', path.join(__dirname,'text.js'));
var glimpseState = new Glimpse('state', path.join(__dirname,'text.js'));

var steps;
var state;

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

var net = require('net');
var HOST = '127.0.0.1';
var PORT = 8001;
var sensoria = new net.Socket();

sensoria.connect(PORT, HOST, function() {
    console.log('CONNECTED TO: ' + HOST + ':' + PORT);
});

var sChunk = "";
sensoria.on('data', function(data) {
    data = data.toString('utf8');
    sChunk+=data;
    if(data.indexOf('+') !== -1){
        var arr = sChunk.split('+');

        data = arr[0].split(',');
        sChunk = arr[1];

        if(data.length  > 1) {
            console.log(data)
            if(steps !== undefined && state!== undefined) {
                steps.emit('update', data[0]);
                state.emit('update', data[4]);
            }
        }
    }
});