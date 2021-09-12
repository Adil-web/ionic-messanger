require("dotenv").config();
const express = require('express');
const app = express();
const cors = require('cors')
const cookieParser = require('cookie-parser');
const router = require('./router/index');

// Error MiddleWare
const errorMiddleware = require("./middlewares/ErrorMiddleware");

// --- Sequelize ---
const sequelize = require("./db");
require("./models/models");


// --- SOCKET SERVER ---
const http = require('http');
const server = http.createServer(app);
const { addUser, getUsers, removeUser } = require("./utils/users");

// --- SOCKET ---
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});


io.on('connection', (socket) => {
  socket.on("init", (msg, room) => {
    addUser({
      privateRoom: msg.sender,
      socketID: socket.id,
      name: msg.name
    })
    console.log(getUsers())
    console.log(socket.id)
    console.log(socket.name)
    socket.emit("users", getUsers())
    socket.name = msg.name
    socket.join(socket.id)
    socket.mainRoom = room.split("--with--") // Abay--with--Adil || Adil--with--Abay
    socket.join(socket.mainRoom[0] + "--with--" + socket.mainRoom[1])
    socket.join(socket.mainRoom[1] + "--with--" + socket.mainRoom[0])
  })
  
  socket.on("chat_msg", (msg) => {
    console.log(msg)
    console.log(getUsers())
    // io.to(getUsers().find(user => user.privateRoom === room).socketID).emit("msg", msg)
    io.to(socket.mainRoom[0] + "--with--" + socket.mainRoom[1]).to(socket.mainRoom[1] + "--with--" + socket.mainRoom[0]).emit("msg", msg)
  })
  
  socket.on("disconnect", () => {
    console.log("disconnected")
    // socket.leave(getUsers().find(user => user.privateRoom === id).socketID)
    socket.leave(socket.mainRoom[0] + "--with--" + socket.mainRoom[1])
    socket.leave(socket.mainRoom[1] + "--with--" + socket.mainRoom[0])
    console.log(socket.rooms)
    removeUser(socket.id)
    io.emit("system-message", "disconnected")
  })
});

<<<<<<< HEAD
app.use(cors());
app.use(express.json());
app.use(cookieParser());
=======
var whitelist = ['http://localhost:8080', 'http://localhost:8081' ]
var corsOptions = {
  credentials: true,
  origin: function(origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
>>>>>>> f8ff3a21f5ed8809a3d1c997191b719396d12bb3
app.use('/api', router);
app.use(errorMiddleware);

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    server.listen(PORT, () => {
      console.log(`Server has been started on ${PORT}`);
    })
  } catch (error) {
    console.log(error)
  }
}

start();

// const { Console } = require('console');
// const express = require('express');
// const app = express();
// const http = require('http');
// const { addUser, removeUser, getUsers } = require('./utils/users');
// const server = http.createServer(app);
// const io = require("socket.io")(server, {
//   cors: {
//     origin: "*",
//     methods: ["GET", "POST"]
//   }
// });

// app.get('/', (req, res) => {
//   res.send('<h1>Hello world</h1>');
// });

// io.on('connection', (socket) => {
//   console.log(socket.id);
//   console.log('connected');

//   socket.on("init", (name) => {
//     addUser(socket.id, name)
//     const users = getUsers()
//     if (users.length>1) {
//       io.emit("sender", users.filter((user) => user.id !== socket.id)[0].id)
//       console.log(getUsers())
//     }
//     socket.on("chat_msg", (msg, id) => {
//       console.log(id, msg);
//       socket.emit("msg", msg)
//       socket.broadcast.to(id).emit('msg', msg);
//     })

//     socket.on("disconnect", () => {
//       removeUser(socket.id)
//       console.log(getUsers())

//       io.emit("system-message", "Disconnected...")
//     })
//   })

// });

// server.listen(3000, () => {
//   console.log('listening on 3000');
// })