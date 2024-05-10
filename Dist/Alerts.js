"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Alerts = void 0;
var App_1 = require("./App");
function Alerts(clientId, Alert) {
    (0, App_1.sendMessageToClient)(clientId, "Alet", Alert);
}
exports.Alerts = Alerts;
