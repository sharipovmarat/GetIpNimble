var http = require('http');
var net = require('net');
//var fs = require('fs');
var request = require("request")

//var curl = require('node-curl');
var actip;

//var md5 = require('md5');
//var math = require('math');

//var salt = 225237;//math.random(0,1000000);
//var key = 'DFG12Q8A'; // the token specified in management_token parameter
//var str2hash = salt + '/' + key;
//var md5raw = md5(str2hash, true);
//var base64hash = new Buffer(md5raw).toString('base64');//md5raw.toString('base64');
//var requiest_url = 'salt=' + salt + '&hash='  + base64hash;
var ips = require('./ip.json');

var server = new http.Server(
    function(req, res){
     if (req.url == '/getip'){
         console.log(actip);
         res.end(actip);
     }
    }
).listen(3000);

//dataip = ips[0].ip;
console.log(ips.length);

//fs.readFile('ip.json',  function (err,data) {
//    data = JSON.parse(data);
//    dataip = data;
//});


var timer = setInterval(function(){
//    dataip = ips[0].ip.toString();

    var ipconn = -1;
    var i;

    for(i = 0; i < ips.length; i++) {


        //console.log(data[i].ip);
        //console.log(data[i].port);
        var hash  = 'salt=225237&hash=HDf4PQa58LiUz6N+vD6DWg==';
        requiest_url = '/manage/server_status?' + hash;
        var ip = ips[i].ip;
        //console.log(ip);
        var port = ips[i].port;

        var url = 'http://'+ ips[i].ip +':'+port+ requiest_url;

        request({
            url: url,
            json: true
        }, function (error, response, body) {

            if (!error && response.statusCode === 200) {
                console.log(response.request.uri.hostname);
                console.log(body.Connections) // Print the json response
                if (ipconn == -1 ) {
                    ipconn = body.Connections;
                    actip = response.request.uri.hostname;
                } else
                if (ipconn>body.Connections) {
                    ipconn = body.Connections;
                    actip = response.request.uri.hostname;
                }
            }
        });

    };
}, 6000);
