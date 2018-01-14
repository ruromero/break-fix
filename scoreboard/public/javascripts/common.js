const loc = window.location;
let new_uri = "ws://" + loc.hostname + ':40510';

const appSocket = new WebSocket(new_uri);

appSocket.onmessage = (event) => {
  console.log('event received: ' + event.data);
};