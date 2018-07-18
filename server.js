var express = require('express');
var app = express();


var prevCounter = 0;
var clientsData = [];

app.get('/prev', async function (req, res) {
    console.log("got /prev GET request.");
    prevCounter++;
    var ip = req.header('x-forwarded-for') || req.connection.remoteAddress;
    clientsData.push({ip:ip, time: new Date()});

    res.end(`this is the ${++counter} time you log in...`);
    if(clientsData.length == 0){
        res.end(`You (${clientsData[0].ip}) are the first client that connected, no prev client`);
    }else{
        res.end(`the prev ip that connected the server is ${clientsData[clientsData.length - 1].ip}`);
    }
});

app.get('/total', async function (req, res) {
    console.log("got /total GET request.");
    res.end(`There were total ${prevCounter} of /prev requests served so far.`);
});

app.get('/stats ', async function (req, res) {
    console.log("got /stats GET request.");
    res.end(`stats = \n${JSON.stringify(clientsData)}`);
});



// Initialize the app.
var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
});