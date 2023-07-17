import { games } from "../db";
import { gameFilters, playerFiltersById } from "../utils";

export const finishHandler = (receivedMessage) => {
  const { indexPlayer, gameId } = JSON.parse(receivedMessage.data);
  const game = gameFilters(gameId);
  const ships = game.data.filter((user) => user.indexPlayer !== indexPlayer)[0].ships;
  if (ships.length === ships.reduce((acc, ship) => (ship.isKilled ? acc + 1 : acc), 0)) {
    const player = playerFiltersById(indexPlayer);
    if (player.wins !== undefined) {
      player.wins = player.wins + 1;
    }
    games.splice(games.indexOf(game), 1);
    return {
      game,
      response: JSON.stringify({
        type: 'finish',
        data: JSON.stringify({
          winPlayer: indexPlayer,
        }),
        id: 0,
      }),
    };
  }
  return undefined;
}
