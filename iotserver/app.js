var path = require('path');
var Glimpse = require('pbi-glimpse');

var glimpse = new Glimpse('rain', path.join(__dirname,'rain.js'));
var sock;
var rain = glimpse.connect(function(err, socket) {
    sock = socket;
    console.log('connected');
    if(err) return console.log('ERROR', err);

     socket.on('light', function(data) {
         console.log('light triggered', data);
         socket.emit('update', data ? '1' : '0');
         serialPort.write(data ? '1' : '0');
     });
});

var SerialPort = require("serialport").SerialPort
var serialPort = new SerialPort("COM6", {
    baudrate: 9600
});

serialPort.on("open", function () {
    console.log('open');
    serialPort.on('data', function (data) {
        //console.log('data ...');
        if (data) {
            /*console.log(data.toString('utf8'));
            if(sock) {
                sock.emit('rain', data.toString('utf8'));
            }*/
            /*  var s = data.toString('utf8').split(',');
             if (s.length === 3) {
             device.emit('update', {yaw: s[0], pitch: s[1], roll: s[2]});
             }*/
        }
    });
});