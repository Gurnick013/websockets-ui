import { games, players, roomPlayers } from "../db";
import { botShips } from "../Inteface";

export const playerFiltersByName = (name) => players.filter((user) => user.name === name)[0];

export const playerFiltersById = (id) => players.filter((user) => user.index === id)[0];

export const roomFilters = (id) => roomPlayers.filter((room) => room.roomId === id)[0];

export const gameFilters = (id) => games.filter((game) => game.idGame === id)[0]

export const responseToAllClients = (message, ws_server) =>{
  ws_server.clients.forEach((client) => {
    client.send(JSON.stringify(message));
  });
};

export const responseToHostClient = (ws_server, sockets, gameSettings, responseForHost, responseForClient) => {
  ws_server.clients.forEach((client) => {
    sockets.forEach((socket, key) => {
      if (gameSettings.hostId === key && socket === client) {
        client.send(responseForHost);
      }
      if (gameSettings.clientId === key && socket === client) {
        client.send(responseForClient);
      }
    });
  });
};

export const handleRoom = (indexRoom, id) => {
  if (indexRoom !== id) {
    const clientRoom = roomFilters(id);
    if (clientRoom) {
      roomPlayers.splice(roomPlayers.indexOf(clientRoom), 1);
    }
    const hostRoom = roomFilters(indexRoom);
    if (hostRoom) {
      roomPlayers.splice(roomPlayers.indexOf(hostRoom), 1);
    }
    return { host: indexRoom, client: id, isOnline: true };
  }
}

export const generateShipPosition = (ships) => {
  return ships.map((ship) => {
    ship.shipCells = [];
    for (let i = 0; i < ship.length; i++) {
      ship.shipCells.push({
        y: ship.direction ? ship.position.y + i : ship.position.y,
        x: ship.direction ? ship.position.x : ship.position.x + i,
        status: 1,
      });
    }
    ship.isKilled = false;
    return ship;
  });
}

export const generateBattleField = (ships) => {
  const grid = Array(10).fill(0).map(() => Array(10).fill(0));
  ships.forEach((ship) => {
    for (let i = 0; i < ship.length; i++) {
      grid[ship.direction ? ship.position.y + i
          : ship.position.y][ship.direction
          ? ship.position.x
          : ship.position.x + i] = 1
    }
  });
  return grid;
}

export const initGame = (initGameParams, indexPlayer, ships) => {
  if (initGameParams) {
    initGameParams.data[initGameParams.data.length] = {
      indexPlayer,
      ships: generateShipPosition(ships),
      grid: generateBattleField(ships),
    };
    if (!initGameParams.isOnline) {
      initGameParams.data[initGameParams.data.length] = {
        indexPlayer: -1,
        ships: generateShipPosition(botShips),
        grid: generateBattleField(botShips),
      };
    }
    if (initGameParams.data.length === 2) {
      return initGameParams;
    }
  }
}
