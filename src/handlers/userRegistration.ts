import { playerFiltersByName } from "../utils";
import { players } from "../db";

export const userRegistration = (receivedMessage, ws, id) => {
  const { name, password } = JSON.parse(receivedMessage.data);
  const player = playerFiltersByName(name);

  let userIndex: number;
  let isError: boolean;
  let errorText: string;
  if (!player) {
    players.push({
      index: id,
      name,
      password,
    });
    userIndex = id;
    isError = false;
    errorText = '';
  } else {
    userIndex = id;
    if (player.password === password) {
      isError = false;
      errorText = '';
      player.index = id;
    } else {
      isError = true;
      errorText = 'Wrong password';
    }
  }

  const updatedMessage = {
    type: 'reg',
    data: JSON.stringify({
      name,
      index: userIndex,
      error: isError,
      errorText: errorText,
    }),
    id: 0,
  };
  console.log(players, '-------');
  ws.send(JSON.stringify(updatedMessage));
}
