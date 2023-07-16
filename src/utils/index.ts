import { players } from "../db";

export const hasWhitespace = (str: string): boolean => {
  return /\s/.test(str);
}

export const getPlayerNameByIndex = (index: string): string => {
  const player = players.find((player) => player.index === index);
  if (player) {
    return player.name;
  } else {
    throw new Error(`Player not found with index ${index}`);
  }
};

export const sendToAllClients = (message, ws_server) =>{
  ws_server.clients.forEach((client) => {
    client.send(JSON.stringify(message));
  });
};
