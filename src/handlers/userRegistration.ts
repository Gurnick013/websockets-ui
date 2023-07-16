import { registerPlayer } from "../db";

export const userRegistration = (receivedMessage, ws, id) => {
  const { name, password } = JSON.parse(receivedMessage.data);
  const updatedMessage = {
    type: 'reg',
    data: JSON.stringify({
      name,
      index: id,
      error: false,
      errorText: '',
    }),
    id: 0,
  };
  ws.send(JSON.stringify(updatedMessage));
  registerPlayer(name, password, id);
}
