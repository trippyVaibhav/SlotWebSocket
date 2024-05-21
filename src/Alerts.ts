import { sendMessageToClient } from "./App";

export function Alerts(clientId : string,Alert: string)
{
    sendMessageToClient(clientId,"Alert",Alert);
}
