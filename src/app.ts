import express from "express";
import { createServer, Server } from "http";
import { Server as SocketServer } from "socket.io";

class App {
  public app: express.Application;
  public server: Server;
  private socketServer: SocketServer;
  constructor() {
    this.app = express();
    this.server = createServer(this.app);
    this.socketServer = new SocketServer(this.server, {
      cors: {
        origin: "*",
      },
    });

    this.socketServer.on("connection", (socket) => {
      console.log("Socket connected");

      socket.on("disconnect", () => {
        console.log("Socket disconnected");
      });

      socket.on("message", (message) => {
        // this.socketServer.emit("message", message); envia para todos
        socket.broadcast.emit("message", message); // envia para todos menos o que enviou
      });
    });
  }
}

export default App;
