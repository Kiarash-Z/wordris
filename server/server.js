const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const uuid = require('uuid/v1');

const port = process.env.PORT || 4001;
const index = require("./routes/index");
const app = express();

app.use(index);

const server = http.createServer(app);
const io = socketIo(server);

let rooms = [];

io.on("connection", socket => {
  let socketRoom = null;
  const deleteRoom = () => {
    if (!socketRoom) return;
    rooms = rooms.filter(r => r !== socketRoom);
    socketRoom = null;
  };

  socket.on('user:search', () => {
    const joinNewRoom = () => {
      const roomId = uuid();
      socket.join(roomId);
      socketRoom = roomId;
      rooms.push(roomId);
    };
    if (!rooms.length) joinNewRoom();
    else {
      let isRoomFound = false;
      rooms.forEach((room, i) => {
        // if user already joined a room we don't even search for the others
        if (isRoomFound) return;
        io.of('/').in(rooms[0]).clients((err, clients) => {
          if (clients.length === 1) {
              if (clients[0] !== socket.id) {
                socket.join(room)
                isRoomFound = true;
                io.in(room).emit('user:matched');
              }
            if (i === (rooms.length - 1) && !isRoomFound) joinNewRoom();
          }
        });
      });
    }
  });

  socket.on('user:stopSearch', deleteRoom);

  socket.on('details:set', ({ stars, isGameovered }) => {
    const room = Object.keys(socket.rooms)[1];
    socket.to(room).emit('details:get', { stars, isGameovered });
    if (isGameovered) {
      io.of('/').in(room).clients((err, clients) => {
        clients.forEach(clientId => {
          io.sockets.sockets[clientId].leave(room);
        })
      });
      deleteRoom();
    }
  });

  socket.on('disconnect', () => {
    io.of('/').in(socketRoom).clients((err, clients) => {
      if (clients.length === 2) {
        clients.forEach(clientId => {
          io.sockets.sockets[clientId].leave(socketRoom);
        })
      }
      deleteRoom();
    })
  });
});

server.listen(port, () => console.log(`Listening on port ${port}`));