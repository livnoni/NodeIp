var express = require('express');
var app = express();


var counter = 0;

app.get('/total', async function (req, res) {
    console.log("got /total request.");
    // console.log("req.connection=\n"+JSON.stringify(req.connection));
    var ip = req.header('x-forwarded-for') || req.connection.remoteAddress;


    console.log("ip=",ip)
    // console.log("req.connection.remoteAddress=\n"+JSON.stringify(req.connection.remoteAddress));

    res.end(`this is the ${++counter} time you log in...`);
});



// Initialize the app.
var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
});