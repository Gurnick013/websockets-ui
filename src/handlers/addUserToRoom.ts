import { handleRoom, responseToHostClient } from "../utils";
import { createGame } from "./createGame";
import { updateRoom } from "./updateRoom";

export const addUserToRoom = (receivedMessage, id, ws_server, sockets) => {
  const { indexRoom } = JSON.parse(receivedMessage.data);
  const initParams = handleRoom(indexRoom, id);
  if (initParams) {
    const gameSettings = createGame(initParams);
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
};
