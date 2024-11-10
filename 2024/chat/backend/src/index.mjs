import { Server } from "socket.io";
import express from "express";
import { createServer } from "node:http";
import jwt from 'jsonwebtoken';
import cors from 'cors';

const userLogins = [{ username: "test", password: "test" }, { username: "mirozoe", password: "test" }];
const app = express();
const PORT = process.env.PORT ?? "3000";

// Middleware to parse JSON request bodies
app.use(express.json());

// Middleware to enable CORS
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST"],
}));

// Instantiate an Express Application
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

let users = [];

io.on("connection", (socket) => {
  socket.emit(
    "active_users",
    users
  );

  socket.on("disconnect", () => {
    let disconnectedUser = "";
    users = users
      .map((user) => {
        if (user.id === socket.id) {
          disconnectedUser = user.name;
          return null;
        }
        return user;
      })
      .filter((user) => user !== null);
    console.log(users);
    console.log(`User ${disconnectedUser} disconnected`);
  });

  socket.on("login", (login) => {
    if (users.find((user) => user.id === socket.id) > 0) {
      console.log(`User ${login?.name} is already registered`);
    } else {
      const temp = { ...login };
      temp.id = socket.id;
      users.push(temp);
      console.log(`Login ${JSON.stringify(login)}`);

      // broadcasts to all users
      io.emit(
        "active_users",
        users
      );
    }
  });

  socket.on("private_chat", (msgObject) => {
    const target = users.filter((u) => u.id === msgObject.to);
    console.log(target[0]);
    console.log(msgObject.msg);
    if (target.length > 0) {
      socket.to(target[0].id).emit("private_chat", msgObject);
    }
  });
});

// Add an HTTP request listener
app.post('/auth', (req, res) => {
  const { username, password } = req.body;
  const user = userLogins.find(user => user.username === username && user.password === password);

  if (user) {
    const token = jwt.sign({ username }, 'your_secret_key', { expiresIn: '1h' });
    res.setHeader('Authorization', `Bearer ${token}`);
    res.status(200).send({ message: 'Authentication successful', token });
  } else {
    res.status(401).send({ message: 'Authentication failed' });
  }
});

// Open Server on selected Port
server.listen(PORT, () => console.info("Server listening on port ", PORT));
