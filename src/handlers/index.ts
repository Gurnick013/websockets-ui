import { userRegistration } from "./userRegistration";
import { updateRoom } from "./updateRoom";
import { createRoom } from "./createRoom";
import { addUserToRoom } from "./addUserToRoom";
import { addShipsToBattlefield } from "./addShipsToBattlefield";
import { playerAttack } from "./playerAttack";
import { createSinglePlaying } from "./createSinglePlaying";
import { randomAttack } from "./randomAttack";

export const actionType = (type, receivedMessage, ws, ws_server, id, sockets) => {
  switch (type) {
    case 'reg':
      userRegistration(receivedMessage, ws, id);
      updateRoom(ws_server);
      break;
    case 'create_room':
      createRoom(id);
      updateRoom(ws_server);
      break;
    case 'add_user_to_room':
      addUserToRoom(receivedMessage, id, ws_server, sockets);
      break;
    case 'add_ships':
      addShipsToBattlefield(receivedMessage, ws, ws_server, sockets);
      break;
    case 'attack':
      playerAttack(ws_server, receivedMessage, ws, sockets);
      break;
    case 'randomAttack':
      randomAttack(ws_server, ws, receivedMessage, sockets);
      break;
    case 'single_play':
      createSinglePlaying(id, ws_server, sockets);
      break;
    default:
      console.log(`Unknown message type ${type}`);
      break;
  }
}
