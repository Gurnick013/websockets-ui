import { userRegistration } from "./userRegistration";
import { updateRoom } from "./updateRoom";
import { createRoomHandler } from "./createRoom";

export const actionType = (type, receivedMessage, ws, ws_server, id) => {
  switch (type) {
    case 'reg':
      userRegistration(receivedMessage, ws, id);
      updateRoom(ws_server);
      break;
    case 'create_room':
      createRoomHandler(id);
      updateRoom(ws_server);
      break;
    default:
      console.log(`Unknown message type ${type}`);
      break;
  }
}
