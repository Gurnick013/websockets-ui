import { userRegistration } from "./userRegistration";

export const actionType = (type, receivedMessage, ws) => {
  switch (type) {
    case 'reg':
      userRegistration(receivedMessage, ws);
      break;
    default:
      console.log(`Unknown message type ${type}`);
      break;
  }
}
