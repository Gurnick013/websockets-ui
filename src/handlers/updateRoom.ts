import { responseToAllClients } from '../utils';
import { roomPlayers } from "../db";

export const updateRoom = (ws_server) => {
  const updatedMessage = {
    type: 'update_room',
    data: JSON.stringify(roomPlayers),
    id: 0,
  };
  responseToAllClients(updatedMessage, ws_server);
};
