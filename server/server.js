import { set } from "mongoose";
import { app, io, server } from "./app.js";
import connectDB from "./config/connectDB.js";

app.get("/", (req, res) =>
  res.send(
    `<h1>Site is Working. click <a href=${process.env.FRONTEND_URL}>here</a> to visit frontend.</h1>`
  )
);

io.on("connection", (socket) => {
  console.log("User Connected", socket.id);
  const preWrittenMessages = [
    "Hi there! 👋",
    "I'm Wysa - an AI chatbot built by therapists",
    "I'm here to understand your concerns and connect you with the best resources available to support you",
    "Can I help you?",
  ];

  preWrittenMessages.forEach((message, index) => {
    setTimeout(() => {
      socket.emit("welcomeMessages", {
        sender: "Wysa",
        content: message,
      });
    }, index * 800);
  });

  socket.on("sendMessage", (message) => {
    setTimeout(() => {
      socket.emit("welcomeMessages", {
        sender: "Wysa",
        content: message,
      });
    }, parseInt(socket.handshake.query.delay));
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

connectDB()
  .then(() => {
    server.listen(process.env.PORT, () => {
      console.log(`Server is running on port ` + process.env.PORT + " 🚀");
    });
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
