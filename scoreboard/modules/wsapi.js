const WebSocket = require('ws');

const WebSocketServer = WebSocket.Server;
wss = new WebSocketServer({port: 40510});

wss.on('connection', function (ws) {
  ws.send('Connected at: ' + `${new Date()}`);
});

exports.newScore = (pos, score) => {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({
        position: pos,
        score: score
      }));
    }
  });
};
