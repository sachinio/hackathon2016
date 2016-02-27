var path = require('path');
var Glimpse = require('pbi-glimpse');

//glimpse.init(12345);
//glimpse.create('light.js', deviceName, actions);
var glimpse = new Glimpse('rain', path.join(__dirname,'rain.js'));
var sock;
var rain = glimpse.connect(function(err, socket) {
    sock = socket;
    console.log('connected');
    if(err) return console.log('ERROR', err);

    /*socket.on('abc', function(data) {
        console.log('abc event', data);
    });

    socket.on('blah', function(data) {
        console.log('blah event', data);
    });

    socket.on('light', function(data) {
        console.log('light triggered', data);
        socket.emit('update', data ? '1' : '0');
    });

    socket.emit('message', {something:12345});*/

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

            console.log(data.toString('utf8'));
            if(sock) {
                sock.emit('rain', data.toString('utf8'));
            }
            /*  var s = data.toString('utf8').split(',');
             if (s.length === 3) {
             device.emit('update', {yaw: s[0], pitch: s[1], roll: s[2]});
             }*/
        }
    });
});



//return;
// var SerialPort = require("serialport").SerialPort
// var serialPort = new SerialPort("COM5", {
//     baudrate: 1200
// });



// serialPort.on("open", function () {
//     console.log('open');
//     serialPort.on('data', function (data) {
//         if (data) {
//             console.log('data ...');
//             console.log(data.toString('utf8'));
//             device.emit('update', data.toString('utf8'));
//             /*var s = data.toString('utf8').split(',');
//             if (s.length === 3) {
//                 device.emit('update', {yaw: s[0], pitch: s[1], roll: s[2]});
//             }*/
//         }
//     });
// });