import { httpServer } from "./http_server";
import { WebSocketServer } from "ws";
import { actionType } from "./handlers";
import { randomUUID } from "crypto";

const HTTP_PORT = 8181;
const WSS_PORT = Number(process.env.PORT || 3000);

const server = httpServer;
const ws_server = new WebSocketServer({ port: WSS_PORT });

ws_server.on('connection', (ws) => {
  console.log('Connected');
  ws.on('message', (message: string) => {
    const receivedMessage = JSON.parse(message);
    const { type } = receivedMessage;
    const userId = randomUUID();
    const gameId = randomUUID();
    console.log(receivedMessage, '-------')
    actionType(type, receivedMessage, ws, userId, gameId, ws_server)
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
