import express from "express";
import { config } from "dotenv";

import ErrorMiddleWare from "./middlewares/ErrorMiddleware.js";
import isAuthenticated from "./middlewares/authMiddleware.js";
import ErrorHandler from "./utils/Errorhandler.js";
import jwt from "jsonwebtoken";

import cors from "cors";
import http from "http";
import { Server } from "socket.io";

config({
  path: "./config/config.env",
});

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
io.use((socket, next) => {
  try {
    const token = socket.handshake.auth.token;
    if (!token) return next(new ErrorHandler("Authentication Error"));

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (error) {
    return next(new ErrorHandler("Authentication Error"));
  }
});

import userRoutes from "./routes/userRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/main", isAuthenticated, chatRoutes);

export { server, io };
export default app;

app.use(ErrorMiddleWare);
