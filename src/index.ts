import { httpServer } from "./http_server";
import { WebSocket, WebSocketServer } from "ws";
import { actionType } from "./handlers";

const HTTP_PORT = 8181;
const WSS_PORT = Number(process.env.PORT || 3000);

const server = httpServer;
const ws_server = new WebSocketServer({ port: WSS_PORT });

const sockets = new Map<number, WebSocket>();
let sessionId: number = 0;

ws_server.on('connection', (ws) => {
  console.log('Connected');
  const currentSocketID = sessionId++;
  sockets.set(currentSocketID, ws);
  ws.on('message', (message: string) => {
    const receivedMessage = JSON.parse(message);
    const { type } = receivedMessage;
    console.log(receivedMessage)
    actionType(type, receivedMessage, ws, ws_server, currentSocketID, sockets)
  })
})
console.log(`Start static http server on the ${HTTP_PORT} port!`);

server.listen(HTTP_PORT);

process.on('SIGINT', () => {
  server.listen(HTTP_PORT).close();
  ws_server.close();
})

ws_server.on('close', () => console.log('Connection is closed'));
ws_server.on('error', (e) => console.log(`Error: ${e.message}`));
