var glimpse = require('pbi-glimpse');

var deviceName = '/' + process.argv.length > 1 ? process.argv[1] : 'glimpse';
var actions = [{
        on: 'earth',
        do: function () {
            console.log('success');
        }
    },{
    on: 'light',
    do: function(data){
        console.log(data);
        if(serialPort) {
            serialPort.write(data?'1':'0');
            device.emit('update', data?'1':'0');
        }
    }
}
];

glimpse.init(12345);
var device = glimpse.create('light.js', deviceName, actions);
//return;
var SerialPort = require("serialport").SerialPort
var serialPort = new SerialPort("COM5", {
    baudrate: 1200
});



serialPort.on("open", function () {
    console.log('open');
    serialPort.on('data', function (data) {
        if (data) {
            console.log('data ...');
            console.log(data.toString('utf8'));
            device.emit('update', data.toString('utf8'));
            /*var s = data.toString('utf8').split(',');
            if (s.length === 3) {
                device.emit('update', {yaw: s[0], pitch: s[1], roll: s[2]});
            }*/
        }
    });
});