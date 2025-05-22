const WebSocket = require("ws");

const PORT = process.env.PORT || 5000;
const server = new WebSocket.Server({ port: PORT });

console.log("WebSocket server started on port " + PORT);

server.on("connection", (ws) => {
  console.log("Client connected");

  ws.on("message", (message) => {
    console.log("Received:", message);

    // Gelen mesajı tüm istemcilere gönder
    server.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  ws.on("close", () => {
    console.log("Client disconnected");
  });
});
