import { playerFiltersById, roomFilters } from "../utils";
import { roomPlayers } from "../db";

export const createRoom = (id) => {
  const room = roomFilters(id);
  if (!room) {
    const player = playerFiltersById(id);
    const room = {
      roomId: id,
      roomUsers: [
        {
          name: player?.name,
          index: player?.index,
        },
      ],
    };
    roomPlayers.push(room);
  }
};
