"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMessageToClient = void 0;
var WebSocket = require("ws");
var uuid_1 = require("uuid"); // Import UUID v4
var SlotResult_1 = require("./SlotResult");
var Global_1 = require("./Global");
var utils_1 = require("./utils");
var GambleResults_1 = require("./GambleResults");
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
        var _a;
        console.log("Received message from ".concat(clientId, ": ").concat(message.id));
        var messageData = JSON.parse(message);
        console.log((_a = messageData === null || messageData === void 0 ? void 0 : messageData.Data) === null || _a === void 0 ? void 0 : _a.GameID);
        console.log(messageData.Data);
        if (messageData.id == utils_1.messageId.auth) {
            Global_1.gameSettings.initiate(messageData.Data.GameID, clientId);
        }
        if (messageData.id == utils_1.messageId.spin && Global_1.gameSettings.startGame) {
            Global_1.gameSettings.currentBet = messageData.Data.CurrentBet;
            var result = new SlotResult_1.CheckResult(clientId);
            //  result.searchWinSymbols();
        }
        if (messageData.id == "gamble") {
            console.log("message data", messageData);
            if (Global_1.playerData.currentWining > 1) {
                Global_1.gameSettings.gamble.start = true;
            }
            else {
                Global_1.gameSettings.gamble.start = false;
            }
            console.log("gamblestart", Global_1.gameSettings.gamble.start);
            if (Global_1.gameSettings.gamble.start) {
                if (!Global_1.gameSettings.gamble.game || !Global_1.gameSettings.gamble.game.checkIfClientExist(clients))
                    Global_1.gameSettings.gamble.game = new GambleResults_1.GambleGame(clientId);
                if (messageData === null || messageData === void 0 ? void 0 : messageData.collect) {
                    Global_1.gameSettings.gamble.game.updateplayerBalance();
                    Global_1.gameSettings.gamble.game.reset();
                    return;
                }
                if (Global_1.gameSettings.gamble.game.gambleCount < Global_1.gameSettings.gamble.maxCount) {
                    Global_1.gameSettings.gamble.game.generateData(Global_1.playerData.currentWining);
                }
                else {
                    Global_1.gameSettings.gamble.game.updateplayerBalance();
                    Global_1.gameSettings.gamble.game.reset();
                }
                // gameSettings.gamble.currentCount++;
                console.log("player balance", Global_1.playerData);
            }
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
var wss = new WebSocket.Server({ port: 3036
});
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
