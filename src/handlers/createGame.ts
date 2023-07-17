import { games } from "../db";

export const createGame = (initParams) => {
  const gameParams = {
    idGame: initParams.host,
    hostId: initParams.host,
    clientId: initParams.client,
    isOnline: initParams.isOnline,
    data: [],
  };
  games.push(gameParams);
  return gameParams;
};
