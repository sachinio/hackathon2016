var net = require('net');

var HOST = '127.0.0.1';
var PORT = 8001;
var sensoria = new net.Socket();

sensoria.connect(PORT, HOST, function() {
    console.log('CONNECTED TO: ' + HOST + ':' + PORT);
});

sensoria.on('data', function(data) {
});