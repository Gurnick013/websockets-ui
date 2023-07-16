import { games } from "../db";

export const createGame = (data) => {
  const newGame = {
    idGame: data.host,
    hostId: data.host,
    clientId: data.client,
    data: [],
  };
  games.push(newGame);
  return newGame;
};
