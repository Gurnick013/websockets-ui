import { randomAttackHandler } from "../utils";
import { playerAttack } from "./playerAttack";

export const randomAttack = (ws_server, ws, receivedMessage, sockets) => {
    const newReqObj = randomAttackHandler(receivedMessage);
    if (newReqObj) {
      playerAttack(ws_server, newReqObj, ws, sockets);
    }
};
