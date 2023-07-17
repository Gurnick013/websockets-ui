import { players } from "../db";
import { responseToAllClients } from "../utils";

export const updateWinners = (ws_server) => {
  const updatedMessage = {
    type: 'update_winners',
    data: JSON.stringify(players),
    id: 0,
  };
  responseToAllClients(updatedMessage, ws_server);
};
