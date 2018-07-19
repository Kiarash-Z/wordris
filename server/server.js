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

const rooms = [];

io.on("connection", socket => {
  socket.on('user:search', () => {
    const joinNewRoom = () => {
      const roomId = uuid();
      socket.join(roomId);
      rooms.push(roomId);
    }
    if (!rooms.length) joinNewRoom();
    else {
      let isRoomFound = false;
      rooms.forEach((room, index) => {
        // if user already joined a room we don't even search for the others
        if (isRoomFound) return;
        io.of('/').in(rooms[0]).clients((err, clients) => {
          if (clients.length === 1) {
            socket.join(room)
            isRoomFound = true;
            io.in(room).emit('user:matched', room);
            if (index === (rooms.length - 1) && !isRoomFound) joinNewRoom();
          }
        });
      });
    }
  });

  socket.on('details:set', ({ score }) => {
    const room = Object.keys(socket.rooms)[0];
    socket.to(room).emit('details:get', score);
  });

  socket.on("disconnect", () => console.log('Client disconnected'));
});

server.listen(port, () => console.log(`Listening on port ${port}`));