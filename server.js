const http = require("node:http");
const { WebSocketServer } = require("ws");

function loadVirtualAgents() {
  const rawAgents = process.env.VIRTUAL_AGENTS_JSON || "[]";

  try {
    const agents = JSON.parse(rawAgents);

    if (!Array.isArray(agents)) {
      throw new Error("VIRTUAL_AGENTS_JSON must be a JSON array");
    }

    return agents.map((item) => ({
      virtual_agent_id: item.virtual_agent_id,
      virtual_agent_name: item.virtual_agent_name,
      is_default: item.is_default,
    }));
  } catch (error) {
    throw new Error(`Invalid VIRTUAL_AGENTS_JSON: ${error.message}`);
  }
}

const server = http.createServer((request, response) => {
  if (request.method !== "GET" || request.url !== "/v1/listVirtualAgents") {
    response.writeHead(404, { "Content-Type": "application/json" });
    return response.end(JSON.stringify({ error: "Not found" }));
  }

  try {
    const virtualAgents = loadVirtualAgents();

    response.writeHead(200, { "Content-Type": "application/json" });
    response.end(JSON.stringify(virtualAgents));
  } catch (error) {
    response.writeHead(500, { "Content-Type": "application/json" });
    response.end(JSON.stringify({ error: error.message }));
  }
});

const webSocketServer = new WebSocketServer({ noServer: true });

webSocketServer.on("connection", (socket) => {
  socket.send("WebSocket connected");

  socket.on("message", (message) => {
    socket.send(`Echo: ${message}`);
  });
});

server.on("upgrade", (request, socket, head) => {
  const { pathname } = new URL(request.url, "http://localhost");

  if (pathname !== "/ws") {
    socket.destroy();
    return;
  }

  webSocketServer.handleUpgrade(request, socket, head, (webSocket) => {
    webSocketServer.emit("connection", webSocket, request);
  });
});

const port = Number(process.env.PORT || 10000);
server.listen(port, "0.0.0.0", () => {
  console.log(`Server listening on 0.0.0.0:${port}`);
});
