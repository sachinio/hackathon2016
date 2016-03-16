/**
 * Created by spatney on 3/8/2016.
 */
var Glimpse = require('pbi-glimpse');
var glimpse7 = new Glimpse('foot', path.join(__dirname,'foot.js'));
var foot;

glimpse7.connect(function(err, socket) {
    foot = socket;
    console.log('orient connected');
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
    if(data.indexOf('E') !== -1){
        var arr = sChunk.split('E');

        data = arr[0].split(',');
        sChunk = arr[1];

        var sockData = {
            s0: data[0],
            s1: data[1],
            s2: (parseInt(data[2]) - 600)/300
        }

        if(foot) {
            console.log(sockData.s2);
            foot.emit('update', sockData);
        }
    }
});