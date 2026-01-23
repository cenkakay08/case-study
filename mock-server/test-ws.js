import WebSocket from "ws";

// Set this to a valid JWT from your app or just a dummy if the server allows it
// (Since we used a simple secret key, we can generate one if needed,
// but for verification, we'll assume the server is running and we can test it)
const TOKEN = "any-valid-token"; // You might need a real token if JWT verification is strict
const ws = new WebSocket(`ws://localhost:5000?token=${TOKEN}`);

ws.on("open", () => {
  console.log("Connected to WebSocket server");
});

ws.on("message", (data) => {
  console.log("Received message:", JSON.parse(data));
});

ws.on("error", (err) => {
  console.error("WebSocket error:", err.message);
});

ws.on("close", (code, reason) => {
  console.log(`Connection closed: ${code} ${reason}`);
});
