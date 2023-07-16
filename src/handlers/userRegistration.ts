import { registerPlayer } from "../db";

export const userRegistration = (receivedMessage, ws) => {
  const { name, password } = JSON.parse(receivedMessage.data);
  const updatedMessage = {
    type: 'reg',
    data: JSON.stringify({
      name,
      index: ws.index,
      error: false,
      errorText: '',
    }),
    id: 0,
  };
  ws.send(JSON.stringify(updatedMessage));
  registerPlayer(name, password, ws.index);
  console.log(`Client ${ws.index} register: player name - ${name}`);
}
