import { sendToAllClients } from '../utils';
import { roomUsers } from "../db";

export const updateRoom = (ws, userId, roomId, ws_server) => {

  const rooms = {
    roomId: roomId,
    roomUsers: [
      {
        name: 'Nicki',
        index: userId,
      },
    ],
  };

  roomUsers.push(rooms);

  const updatedMessage = {
    type: 'update_room',
    data: JSON.stringify(roomUsers),
    id: 0,
  };
  sendToAllClients(updatedMessage, ws_server);
  console.log(`Create room ${roomId}`);
};
