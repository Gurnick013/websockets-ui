import { randomAttackHandler } from "../utils";
import { playerAttack } from "./playerAttack";

export const randomAttack = (ws_server, ws, receivedMessage, sockets) => {
    const { data, id } = receivedMessage;
    const newReqObj = randomAttackHandler(data, id);
    if (newReqObj) {
      playerAttack(ws_server, newReqObj, ws, sockets);
    }
};
