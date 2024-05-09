"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMessageToClient = void 0;
var WebSocket = require("ws");
var uuid_1 = require("uuid"); // Import UUID v4
var SlotDataInit_1 = require("./SlotDataInit");
var SlotResult_1 = require("./SlotResult");
var Global_1 = require("./Global");
// Map to store WebSocket connections with their associated client IDs
var clients = new Map();
// Function to handle client connections
function handleConnection(ws) {
    var isAlive = true;
    // Generate a unique client ID
    var clientId = (0, uuid_1.v4)();
    // Store the WebSocket connection with its associated client ID
    clients.set(clientId, ws);
    console.log("Client connected: ".concat(clientId));
    (0, SlotDataInit_1.sendInitdata)(clientId);
    // Function to handle pong messages
    function heartbeat() {
        isAlive = true;
    }
    // Set up a ping interval for the client
    var pingInterval = setInterval(function () {
        if (isAlive === false) {
            // If the client did not respond to the last ping, consider it disconnected
            console.log("Client ".concat(clientId, " not responding, terminating connection"));
            ws.terminate();
            clearInterval(pingInterval);
            // Remove the client from the map
            clients.delete(clientId);
        }
        else {
            isAlive = false;
            ws.ping();
        }
    }, 5000); // Ping every 5 seconds
    // Event listener for pong messages
    ws.on('pong', heartbeat);
    // Event listener for messages from the client
    ws.on('message', function incoming(message) {
        console.log("Received message from ".concat(clientId, ": ").concat(message.id));
        var messageData = JSON.parse(message);
        console.log(messageData);
        if (messageData.id == "Spin") {
            Global_1.gameWining.currentBet = messageData.Data.CurrentBet;
            var result = new SlotResult_1.CheckResult(clientId);
        }
    });
    // Event listener for closing connection
    ws.on('close', function close() {
        console.log("Client ".concat(clientId, " disconnected"));
        clearInterval(pingInterval);
        // Remove the client from the map
        clients.delete(clientId);
    });
}
// Assuming wss is your WebSocket server instance
var wss = new WebSocket.Server({ port: 3030 });
// Event listener for server connection
wss.on('connection', handleConnection);
function sendMessageToClient(clientId, id, message) {
    var ws = clients.get(clientId);
    if (ws && ws.readyState === WebSocket.OPEN)
        ws.send(JSON.stringify({ id: id, message: message }));
    else
        console.log("Client ".concat(clientId, " not found or not connected."));
}
exports.sendMessageToClient = sendMessageToClient;
