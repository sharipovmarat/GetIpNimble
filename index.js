var http = require('http');
var net = require('net');
var fs = require('fs');
var actip;
//var md5 = require('md5');
//var math = require('math');

//var salt = 225237;//math.random(0,1000000);
//var key = 'DFG12Q8A'; // the token specified in management_token parameter
//var str2hash = salt + '/' + key;
//var md5raw = md5(str2hash, true);
//var base64hash = new Buffer(md5raw).toString('base64');//md5raw.toString('base64');
//var requiest_url = 'salt=' + salt + '&hash='  + base64hash;
//var ips = require('ip.json');
var server = new http.Server(
    function(req, res){
     if (req.url == '/getip'){
         console.log(actip);
         res.end(actip);
     }
    }
).listen(3000);



var timer =setInterval(function(){
fs.readFile('ip.json',  function (err,data) {
    var ipconn = -1;
    data = JSON.parse(data);
    var i;
    for(i = 0; i < data.length; i++) {
        //console.log(data[i].ip);
        //console.log(data[i].port);
        requiest_url = 'salt=225237&hash=HDf4PQa58LiUz6N+vD6DWg==';
        var ip = data[i].ip;
        var port = data[i].port;

        var url = 'http://'+ ip +':'+port+'/manage/server_status?'+ requiest_url;
        //console.log(url);

        http.get(url, function(res){

            var body = '';

            res.on('data', function(chunk){
                body += chunk;
            });

            res.on('end', function(){
                var fbResponse = JSON.parse(body);
                console.log("For ip: ", ip);
                console.log("Got a connections: ", fbResponse.Connections);

                if (ipconn<fbResponse.Connections) {
                    actip = ip;
                    ipconn = fbResponse.Connections;
                };
            });

        }).on('error', function(e){
            console.log("Got an error: ", e);
        })
    }
})}, 6000);
