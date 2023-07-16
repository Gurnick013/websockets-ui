import { players, roomPlayers } from "../db";

export const playerFiltersByName = (name) => players.filter((user) => user.name === name)[0];

export const playerFiltersById = (id) => players.filter((user) => user.index === id)[0];

export const roomFilters = (id) => roomPlayers.filter((room) => room.roomId === id)[0];

export const responseToAllClients = (message, ws_server) =>{
  ws_server.clients.forEach((client) => {
    client.send(JSON.stringify(message));
  });
};
