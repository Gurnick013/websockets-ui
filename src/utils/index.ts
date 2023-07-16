import { players, roomPlayers } from "../db";

export const playerFiltersByName = (name) => players.filter((user) => user.name === name)[0];

export const playerFiltersById = (id) => players.filter((user) => user.index === id)[0];

export const roomFilters = (id) => roomPlayers.filter((room) => room.roomId === id)[0];

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
