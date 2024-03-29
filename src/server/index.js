const serve = require("koa-static-server");
const koa = require("koa");
const app = new koa();
const http = require("http");
const readline = require("readline");

stack = [];

app.use(serve({ rootDir: "../../dist" }));

app.use(async next => {
  if (this.path !== "/") {
    return await next();
  }
});

const server = http.createServer(app.callback());

const io = require("socket.io")(server);
let activeroom = null;
let usernames = [];

//Handling Sockets
io.on("connection", function(socket) {
  socket.on("login", function({ username, room }) {
    stack.push(socket);
    console.log(`[Server] login: ${username + " -> " + room}`);
    usernames.push(username);
    socket.join(room);
    activeroom = Object.keys(socket.rooms).slice(1);
    socket.username = username;
    socket.emit("users.login", { username, room });
  });

  // Web socket emit is called when a message is created.
  socket.on("message", ({ text }) => {
    activeroom = Object.keys(socket.rooms).slice(1);
    console.log(`[Server] message: ${text}` + ` -> room: ${activeroom}`);
    const message = {
      text,
      username: socket.username,
      room: activeroom
    };
    io.to(activeroom).emit("messages.new", { message });
  });

  // Logs user out gracefully
  socket.on("logout", ({ username }) => {
    if (username) {
      console.log(`[Server] logout: ${username}`);
      usernames = usernames.filter(u => u !== username);
      io.to(activeroom).emit("users.logout", { username });
      socket.leave(activeroom);
    }
  });

  // Handles abrupt disconnects
  socket.on("disconnect", ({ username }) => {
    console.log(`[Server] disconnected: ${socket.id} disconnect!`);

    const i = usernames.indexOf(username);
    usernames.splice(i, 1);
    socket.disconnect(true);
  });

  // Search for all rooms
  function findRooms() {
    let openRooms = [];
    const rooms = io.sockets.adapter.rooms;
    const sockets = io.sockets.sockets;
    if (rooms) {
      for (const room in rooms) {
        if (!sockets[room]) {
          openRooms.push({
            name: room,
            counts: io.sockets.adapter.rooms[room].length
          });
        }
      }
    }
    return openRooms;
  }

  // Returns room list
  socket.on("rooms", function() {
    const rooms = findRooms();
    io.emit("rooms.list", { rooms: rooms });
  });
});

function askQuestion(query) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise(resolve =>
    rl.question(query, ans => {
      rl.close();
      resolve(ans);
    })
  );
}

const port = 3000;

server.listen(port, async () => {
  console.log(`listening on port ${port}`);

  const ans = await askQuestion("Press Enter to close server");

  while (stack.length) {
    var s = stack.pop();
    console.log("Disconnecting: " + s.id);
    s.disconnect(true);
  }

  console.log("Closing Server");
  process.exit();
});
