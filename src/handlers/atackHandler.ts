import { actionResponse, getCellAround } from "../utils";
import { games } from "../db";

export const attackHandler = (receivedMessage) => {
    const { x, y, indexPlayer, gameId } = JSON.parse(receivedMessage.data);
    const game = games.filter((game) => game.idGame === gameId)[0];
    if (game.turn === indexPlayer) {
      const responses = [];
      const grid = game.data.filter((user) => user.indexPlayer !== indexPlayer)[0].grid;
      const targetCell = grid[y][x];
      if (targetCell === 0) {
        grid[y][x] = 2;
        responses.push(actionResponse(x, y, indexPlayer, 'miss'));
      }
      if (targetCell === 1) {
        const ships = game.data.filter((user) => user.indexPlayer !== indexPlayer)[0].ships;
        const ship = ships.filter((ship) => {
          const curShip = ship.shipCells?.filter((cells) => cells.y === y && cells.x === x);
          return curShip && curShip?.length > 0;
        })[0];
        const cell = ship.shipCells?.filter((cell) => cell && cell.x === x && cell.y === y)[0];
        if (cell && cell.status === 1) {
          if (
              ship.shipCells &&
              ship.shipCells.filter((cell) => cell?.status === 3).length === ship.shipCells.length - 1
          ) {
            ship.shipCells.forEach((cell) => {
              if (cell) {
                cell.status = 4;
                grid[cell.y][cell.x] = 4;
                responses.push(actionResponse(cell.x, cell.y, indexPlayer, 'killed'));
                getCellAround(grid, cell.y, cell.x).forEach((cell) => {
                  grid[cell.y][cell.x] = 2;
                  responses.push(actionResponse(cell.x, cell.y, indexPlayer, 'miss'));
                });
              }
            });
            ship.isKilled = true;
          } else {
            cell.status = 3;
            grid[y][x] = 3;
            responses.push(actionResponse(x, y, indexPlayer, 'shot'));
          }
        }
      }
      return { game, responses: responses.length > 0 ? responses : undefined };
    }
  return { game: undefined, responses: undefined };
};
