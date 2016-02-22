var glimpse = require('pbi-glimpse');

var deviceName = '/' + process.argv.length > 1 ? process.argv[1] : 'glimpse';
var actions = [{
        on: 'earth',
        do: function () {
            console.log('success');
        }
    }
];

glimpse.init(12345);
var device = glimpse.create('glimpse.js', deviceName, actions);

var SerialPort = require("serialport").SerialPort
var serialPort = new SerialPort("COM6", {
    baudrate: 9600
});

serialPort.on("open", function () {
    console.log('open');
    serialPort.on('data', function(data) {
        if(data) {
            //console.log(data.toString('utf8'));
            var s = data.toString('utf8').split(',');
            if(s.length===3) {
                device.emit('update', {yaw: s[0], pitch: s[1], roll: s[2]});
            }
        }
    });
    serialPort.write("ls\n", function(err, results) {
        console.log('err ' + err);
        console.log('results ' + results);
    });
});