import express from "express";
import { Server } from "socket.io";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.static(path.join(__dirname, "public")));

const expressServer = app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

const io = new Server(expressServer, {
  cors: {
    origin:
      process.env.NODE_ENV === "production"
        ? false
        : ["http://localhost:5173", "http://127.0.0.1:5500"],
  },
});

// interface User {
//   id: string;
//   name: string;
//   room: string;
//   role: "Player 1" | "Player 2" | "Spectator";
// }

// interface UserState {
//   users: User[];
//   setUsers: (users: User[]) => void;
// }

// const UsersState: UserState = {
//   users: [],
//   setUsers: function (newUsersArray: User[]) {
//     this.users = newUsersArray;
//   },
// };

io.on("connection", (socket) => {
  socket.on("joinRoom", ({ room, name }) => {
    console.log(`${name} joined "${room}"`);

    const user = socket.data;

    const roomType = room === "lobby" ? "Lobby" : `${room.toUpperCase()} arena`;

    const prevRoom = user.room;

    if (prevRoom) {
      socket.leave(prevRoom);
      io.to(prevRoom).emit(
        "message",
        adminMessage(`${name} left the ${roomType}`)
      );
    }

    console.log(room);
    socket.join(room);

    user.room = room;
    user.name = name;
    socket.emit("statusChange", "lobby");

    socket.broadcast
      .to(room)
      .emit(
        "message",
        adminMessage(
          `${user.name} has joined ${roomType} ${
            user.role ? `as ${user.role}` : ""
          }`
        )
      );

    // // Update user list for room
    // io.to(user.room).emit("userList", {
    //   users: getUsersInRoom(user.room),
    // });

    // // Update rooms list for everyone
    // io.emit("roomList", {
    //   rooms: getAllActiveRooms(),
    // });
  });

  socket.on("chatMessage", ({ text, room }) => {
    console.log(Array.from(socket.rooms));
    io.to(room).emit("message", { text, user: socket.data.name, admin: false });
  });

  // When user disconnects - to all others
  socket.on("disconnect", () => {
    // const user = getUser(socket.id);
    // userLeavesApp(socket.id);

    // if (user) {
    //   io.to(user.room).emit(
    //     "message",
    //     buildMsg(ADMIN, `${user.name} has left the room`)
    //   );

    //   io.to(user.room).emit("userList", {
    //     users: getUsersInRoom(user.room),
    //   });

    //   io.emit("roomList", {
    //     rooms: getAllActiveRooms(),
    //   });
    // }

    console.log(`User ${socket.id} disconnected`);
  });

  // Listening for a message event
  //   socket.on("message", ({ name, text }) => {
  //     const room = getUser(socket.id)?.room;
  //     if (room) {
  //       io.to(room).emit("message", `${name}: ${text}`);
  //     }
  //   });

  //   // Listen for activity
  //   socket.on("activity", (name) => {
  //     const room = getUser(socket.id)?.room;
  //     if (room) {
  //       socket.broadcast.to(room).emit("activity", name);
  //     }
  //   });
});

// User functions
// function activateUser(id: string, name: string, room: string) {
//   const usersInTheRoom = getUsersInTheRoom(room);
//   let role: User["role"];
//   switch (usersInTheRoom.length) {
//     case 0:
//       role = "Player 1";
//       break;
//     case 1:
//       role = "Player 2";
//       break;
//     default:
//       role = "Spectator";
//   }
//   const user: User = { id, name, room, role };
//   UsersState.setUsers([
//     ...UsersState.users.filter((user) => user.id !== id),
//     user,
//   ]);
//   return user;
// }

// function userLeavesApp(id: User["id"]) {
//   UsersState.setUsers(UsersState.users.filter((user) => user.id !== id));
// }

// function getUser(id: User["id"]) {
//   return UsersState.users.find((user) => user.id === id);
// }

// function getUsersInTheRoom(room: User["room"]) {
//   return UsersState.users.filter((user) => user.room === room);
// }

// function getAllActiveRooms() {
//   return Array.from(new Set(UsersState.users.map((user) => user.room)));
// }
function adminMessage(text: string) {
  return {
    user: "ADMIN",
    text,
    admin: true,
  };
}
