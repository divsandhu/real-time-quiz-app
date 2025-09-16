// server/index.js
import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import roomsRouter from "./routes/rooms.js";
import initSocketHandlers from "./socketHandlers/index.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/rooms", roomsRouter);

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: ["http://localhost:5173"] } // adjust to your client origin
});

initSocketHandlers(io); // attach socket handlers in modular file

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server listening on ${PORT}`));
