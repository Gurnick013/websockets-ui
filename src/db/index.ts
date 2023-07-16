import { IRoomUsers } from "../Inteface";

class Player {
  name: string;
  password: string;
  index: string;
  wins: number;

  constructor(name: string, password: string, index: string) {
    this.name = name;
    this.password = password;
    this.index = index;
    this.wins = 0;
  }
}

export const players: Player[] = [];

export const roomUsers: IRoomUsers[] = [];

export const registerPlayer = (name: string, password: string, index: string) => {
  // if (playerExists(name)) {
  //   return { index: -1, error: true, errorText: 'Player already exists' };
  // }

  const newPlayer = new Player(name, password, index);
  newPlayer.wins = 0;
  players.push(newPlayer);

  return {
    index,
    error: false,
    errorText: '',
  };
}
