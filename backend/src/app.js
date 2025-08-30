import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import mongoose from "mongoose";
import cors from "cors";
import { connectToSocket } from "./controllers/socketManager.js";
import userRoutes from "./routes/users.routes.js";
const app = express();
const server = createServer(app);
const io = connectToSocket(server);

app.set("port", process.env.PORT || 8000);

app.use(cors());
app.use(express.json({ limit: "40kb" }));
app.use(express.urlencoded({ limit: "40kb", extended: true }));
app.use("/api/v1/users", userRoutes);

app.get("/", (req, res) => {
  return res.json({ hello: "world" });
});
const start = async () => {
  const connectDB = async () => {
    try {
      await mongoose.connect(
        "mongodb+srv://shravangoyal71:shravan123@shravan.wbquz5c.mongodb.net/?retryWrites=true&w=majority&appName=shravan"
      );
      console.log("MongoDB connected!");
    } catch (err) {
      console.error("MongoDB connection failed:", err.message);
    }
  };
  connectDB();
  server.listen(app.get("port"), () => {
    console.log("listening");
  });
};
start();
