import { userRegistration } from "./userRegistration";
import { updateRoom } from "./updateRoom";

export const actionType = (type, receivedMessage, ws, userId, gameId, ws_server) => {
  switch (type) {
    case 'reg':
      userRegistration(receivedMessage, ws, userId);
      break;
    case 'create_room':
      updateRoom(receivedMessage, ws, userId, ws_server);
      break;
    default:
      console.log(`Unknown message type ${type}`);
      break;
  }
}
