import { roomFilters } from "../utils";
import { roomPlayers } from "../db";

export const addUserToRoom = (receivedMessage, id) => {
  const { indexRoom } = JSON.parse(receivedMessage.data);
    if (indexRoom !== id) {
      const clientRoom = roomFilters(id);
      if (clientRoom) {
        roomPlayers.splice(roomPlayers.indexOf(clientRoom), 1);
      }
      const hostRoom = roomFilters(indexRoom);
      if (hostRoom) {
        roomPlayers.splice(roomPlayers.indexOf(hostRoom), 1);
      }
      return { host: indexRoom, client: id };
    }
};
