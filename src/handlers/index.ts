import { userRegistration } from "./userRegistration";
import { updateRoom } from "./updateRoom";
import { createRoom } from "./createRoom";
import { addUserToRoom } from "./addUserToRoom";
import { createGame } from "./createGame";
import { responseToHostClient } from "../utils";

export const actionType = (type, receivedMessage, ws, ws_server, id, sockets) => {
  switch (type) {
    case 'reg':
      userRegistration(receivedMessage, ws, id);
      updateRoom(ws_server);
      break;
    case 'create_room':
      createRoom(id);
      updateRoom(ws_server);
      break;
    case 'add_user_to_room':
      const initData = addUserToRoom(receivedMessage, id);
      if (initData) {
        const gameSettings = createGame(initData);
        updateRoom(ws_server);
        const response = {
          host: JSON.stringify({
            type: 'create_game',
            data: JSON.stringify({ idGame: gameSettings.hostId, idPlayer: gameSettings.hostId }),
            id: 0,
          }),
          client: JSON.stringify({
            type: 'create_game',
            data: JSON.stringify({ idGame: gameSettings.hostId, idPlayer: gameSettings.clientId }),
            id: 0,
          }),
        };
        responseToHostClient(ws_server, sockets, gameSettings, response.host, response.client)
      }
      break;
    default:
      console.log(`Unknown message type ${type}`);
      break;
  }
}
