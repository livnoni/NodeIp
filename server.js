//https://nodeip.herokuapp.com/
var express = require('express');
var app = express();
var device = require('express-device');
app.use(device.capture());


var prevCounter = 0;
var lastClientIp;
var clientsData = {};

app.get('/prev', function (req, res) {
    console.log("got /prev GET request.");
    prevCounter ++;
    var ip = req.header('x-forwarded-for') || req.connection.remoteAddress;

    console.log("Hi to "+req.device.type.toUpperCase()+" User");
    console.log("req.device=\n"+JSON.stringify(req.device));
    console.log("req.cookies=\n"+JSON.stringify(req.cookies));
    console.log("req.hostname=\n"+JSON.stringify(req.hostname));
    console.log("req.ip=\n"+JSON.stringify(req.ip));
    console.log("req.method=\n"+JSON.stringify(req.method));
    console.log("req.originalUrl=\n"+JSON.stringify(req.originalUrl));
    console.log("req.params=\n"+JSON.stringify(req.params));
    console.log("req.protocol=\n"+JSON.stringify(req.protocol));
    console.log("req.secure=\n"+JSON.stringify(req.secure));
    console.log("req.sessionID =\n"+JSON.stringify(req.sessionID ));


    if(! clientsData[ip]){
        clientsData[ip] = {};
        clientsData[ip].times = [];
    }
    clientsData[ip].times.push(new Date());

    if(lastClientIp){
        res.end(`The prev ip that connected the server is ${lastClientIp}`);
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
        res.end(`stats = \n${JSON.stringify(clientsData)}`);
    }else{
        res.end(`We can not display statistics because there are no clients data.`);
    }
});



// Initialize the app.
var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
});