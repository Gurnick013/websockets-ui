import { gameFilters, initGame, responseToHostClient } from "../utils";

export const addShipsToBattlefield = (receivedMessage, ws, ws_server, sockets) => {
  const { gameId, ships, indexPlayer } = JSON.parse(receivedMessage.data);
  const initGameParams = gameFilters(gameId);
  const gameStarted = initGame(initGameParams, indexPlayer, ships);
  if (gameStarted) {
    const response = {
      host: JSON.stringify({
        type: 'start_game',
        data: JSON.stringify({
          ships: gameStarted.data.filter((user) => user.indexPlayer === gameStarted.hostId)[0]?.ships,
          currentPlayerIndex: gameStarted.hostId,
        }),
        id: 0,
      }),
      client: JSON.stringify({
        type: 'start_game',
        data: JSON.stringify({
          ships: gameStarted.data.filter((user) => user.indexPlayer === gameStarted.clientId)[0]?.ships,
          currentPlayerIndex: gameStarted.clientId,
        }),
        id: 0,
      }),
      hostId: gameStarted.hostId,
      clienId: gameStarted.clientId,
      isOnline: gameStarted.isOnline,
    };
    responseToHostClient(ws_server, sockets, gameStarted, response.host, response.client);
    const turnInit = gameStarted.data.map((user) => user.indexPlayer)[Math.floor(Math.random() * 2)]
    const responseTurnInit = {
      ...response,
      host: JSON.stringify({
        type: 'turn',
        data: JSON.stringify({
          currentPlayer: turnInit,
        }),
        id: 0,
      }),
      client: JSON.stringify({
        type: 'turn',
        data: JSON.stringify({
          currentPlayer: turnInit,
        }),
        id: 0,
      }),
    };
    responseToHostClient(ws_server, sockets, gameStarted, responseTurnInit.host, responseTurnInit.client);
    if (!gameStarted.isOnline && turnInit === responseTurnInit.clienId) {
      ws.emit('message', JSON.stringify({
        type: 'randomAttack',
        data: JSON.stringify({
          gameId: gameStarted?.idGame,
          indexPlayer: gameStarted?.clientId,
        }),
        id: 0,
      }));
    }
  }
};
