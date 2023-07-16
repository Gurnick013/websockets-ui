export interface IPlayer {
  name: string;
  index: string;
}

export interface IRoomUsers {
  roomId: number;
  roomUsers: IPlayer[];
}
