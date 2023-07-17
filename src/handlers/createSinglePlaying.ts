import { createGame } from "./createGame";
import { responseToHostClient } from "../utils";

export const createSinglePlaying = (id, ws_server, sockets) => {
  const gameSettings = createGame({ host: id, client: -1, isOnline: false });
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
    hostId: gameSettings.hostId,
    clienId: gameSettings.clientId,
    isOnline: gameSettings.isOnline,
  };
  responseToHostClient(ws_server, sockets, gameSettings, response.host, response.client)
}
