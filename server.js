/**
 * Created by msharipov on 09.11.2015.
 */
var request = require("request")

var url = "http://91.201.214.94:" +
    "8086" +
    "/manage/server_status?salt=225237&hash=HDf4PQa58LiUz6N+vD6DWg=="

request({
    url: url,
    json: true
}, function (error, response, body) {

    if (!error && response.statusCode === 200) {
        console.log(response.request.uri.hostname);
        console.log(body.Connections) // Print the json response
    }
})