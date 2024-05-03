"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.callAPI = void 0;
var https = require("https");
// Function to make API call
function callAPI() {
    return new Promise(function (resolve, reject) {
        var options = {
            hostname: 'api.example.com',
            path: '/endpoint',
            method: 'GET',
        };
        var req = https.request(options, function (res) {
            var data = '';
            res.on('data', function (chunk) {
                data += chunk;
            });
            res.on('end', function () {
                resolve(data);
            });
        });
        req.on('error', function (error) {
            reject(error);
        });
        req.end();
    });
}
exports.callAPI = callAPI;
