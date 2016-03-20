/**
 * Created by sachinpatney on 3/19/16.
 */

var path = require('path');
var Glimpse = require('pbi-glimpse');

var glimpse = new Glimpse('scratch', path.join(__dirname,'scratch.js'));

glimpse.connect(function(err, socket) {
    console.log('connected');
    if(err) return console.log('ERROR', err);
});