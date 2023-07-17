import { responseToHostClient } from "../utils";
import { attackHandler } from "./atackHandler";
import { finishHandler } from "./finishHandler";
import { updateWinners } from "./updateWinners";

export const playerAttack = (ws_server, receivedMessage, ws, sockets) => {
  const { game, responses } = attackHandler(receivedMessage);
  if (game && responses) {
    responses.forEach((response) => responseToHostClient(ws_server, sockets, game, response, response));
    const responseTurn = {
      host: JSON.stringify({
        type: 'turn',
        data: JSON.stringify({
          currentPlayer: game.data.filter((user) => user.indexPlayer !== game.turn)[0]?.indexPlayer,
        }),
        id: 0,
      }),
      client: JSON.stringify({
        type: 'turn',
        data: JSON.stringify({
          currentPlayer: game.data.filter((user) => user.indexPlayer !== game.turn)[0]?.indexPlayer,
        }),
        id: 0,
      }),
      hostId: game.hostId,
      clienId: game.clientId,
      isOnline: game.isOnline,
    };
    responseToHostClient(ws_server, sockets, game, responseTurn.host, responseTurn.client);
    const response = finishHandler(receivedMessage);
    if (response) {
      responseToHostClient(ws_server, sockets, response.game, response.response, response.response);
      updateWinners(ws_server);
    } else if (!game.isOnline && game.turn === responseTurn.clienId) {
      setTimeout(() => {
        ws.emit(
            'message',
            JSON.stringify({
              type: 'randomAttack',
              data: JSON.stringify({
                gameId: game?.idGame,
                indexPlayer: -1,
              }),
              id: 0,
            }),
        );
      }, 1000);
    }
  }
};
