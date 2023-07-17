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

export const getCellAround = (grid, y, x) => {
  const battleField = [];
  for (let i = y - 1; i <= y + 1; i++) {
    for (let j = x - 1; j <= x + 1; j++) {
      if (j >= 0 && j < 10 && i >= 0 && i < 10 && (i !== y || j !== x) && grid[i][j] === 0) {
        battleField.push({ x: j, y: i });
      }
    }
  }
  return battleField;
};

export const actionResponse = (x, y, indexPlayer, status) => {
  return JSON.stringify({
    type: 'attack',
    data: JSON.stringify({
      position: {
        x,
        y,
      },
      currentPlayer: indexPlayer,
      status: status,
    }),
    id: 0,
  });
};

export const getRandomCell = (grid) => {
  const cell = {
    x: Math.floor(Math.random() * 10),
    y: Math.floor(Math.random() * 10),
  };
  return grid[cell.y][cell.x] !== 0 && grid[cell.y][cell.x] !== 1 ? getRandomCell(grid) : cell;
};

export const randomAttackHandler = (receivedMessage) => {
  const { indexPlayer, gameId } = JSON.parse(receivedMessage.data);
  const game = gameFilters(gameId);
  const grid = game.data.filter((user) => user.indexPlayer !== indexPlayer)[0].grid;
  const { x, y } = getRandomCell(grid);
  const { data, id } = JSON.parse(receivedMessage);
  return {
    type: 'attack',
    data: { ...data, x, y },
    id,
  };
};
