var express = require('express');
var app = express();
var device = require('express-device'); //nice module to get device type
app.use(device.capture());


var prevCounter = 0;
var lastClientIp;
var clientsData = {};

app.get('/prev', function (req, res) {
    console.log("got /prev GET request.");
    prevCounter ++;

    var ip = req.header('x-forwarded-for') || req.connection.remoteAddress;

    if(! clientsData[ip]){
        clientsData[ip] = [];
    }
    clientsData[ip].push({time: new Date(), deviceType: req.device.type, protocol:req.protocol, isSecureConnection:req.secure});

    if(lastClientIp){
        res.end(`The prev ip that have been connected to the server is ${lastClientIp}`);
    }else{
        res.end(`You (${ip}) are the first client that connected, no prev client`);
    }

    lastClientIp = ip;

});

app.get('/total', function (req, res) {
    console.log("got /total GET request.");
    res.end(`There were total ${prevCounter} of /prev requests served so far.`);
});

app.get('/stats', function (req, res) {
    console.log("got /stats GET request.");

    if(Object.keys(clientsData).length > 0){
        res.end(`stats = \n${JSON.stringify(clientsData, null, 4)}`);
    }else{
        res.end(`We can not display statistics because there are no clients data.`);
    }
});

// Initialize the app.
var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
});