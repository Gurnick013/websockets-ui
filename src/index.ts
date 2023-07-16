import { httpServer } from "./http_server";
import { WebSocketServer } from "ws";

const HTTP_PORT = 8181;
const WSS_PORT = Number(process.env.PORT || 3000);

const server = httpServer;
const wss = new WebSocketServer({ port: WSS_PORT });

wss.on('connection', (ws) => {
  console.log('Connected');
  ws.on('message', (message: string) => {
    const receivedMessage = JSON.parse(message);
    console.log(receivedMessage)
  })
})
console.log(`Start static http server on the ${HTTP_PORT} port!`);

server.listen(HTTP_PORT);

process.on('SIGINT', () => {
  server.listen(HTTP_PORT).close();
  wss.close();
})

wss.on('close', () => console.log('Connection is closed'));
wss.on('error', (e) => console.log(`Error: ${e.message}`));
