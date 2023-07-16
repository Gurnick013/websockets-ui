export interface IPlayer {
  index: number;
  name: string;
  password?: string;
}

export interface IRoomPlayers {
  roomId: number;
  roomUsers: IPlayer[];
}
