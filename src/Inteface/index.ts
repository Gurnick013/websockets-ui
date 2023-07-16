export interface IPlayer {
  index: number;
  name: string;
  password?: string;
}

export interface IRoomPlayers {
  roomId: number;
  roomUsers: IPlayer[];
}

type data =
    | {
  indexPlayer: number;
  ships: IShip[];
  grid: number[][];
}[]
    | [];

export interface IGame {
  idGame: number;
  hostId: number;
  clientId: number;
  data: data;
  turn?: number;
}

export interface IShip {
  position: {
    x: number;
    y: number;
  };
  direction: boolean;
  length: number;
  type: 'small' | 'medium' | 'large' | 'huge';
  shipCells?: { x: number; y: number; status: 1 | 3 | 4 }[];
  isKilled?: boolean;
}
