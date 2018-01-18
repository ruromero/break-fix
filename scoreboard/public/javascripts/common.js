const loc = window.location;
let new_uri = "ws://" + loc.hostname + ':40510';

const appSocket = new WebSocket(new_uri);

function getPosition(score) {
  const rows = document.getElementById('scores').tBodies[0].getElementsByTagName('tr');
  let pos = 0;
  while(pos < rows.length) {
    if(rows[pos].getElementsByClassName('points')[0].innerText < score.points) {
      return pos;
    }
    pos++;
  }
}

function addScore(score) {
  const tableRef = document.getElementById('scores').tBodies[0];
  const pos = getPosition(score);
  const newRow = tableRef.insertRow(pos);
  newRow.id = score.gameId;
  const positionCell = newRow.insertCell(0);
  positionCell.className='position';
  positionCell.appendChild(document.createTextNode(pos));
  const pointsCell = newRow.insertCell(1)
  pointsCell.className='points';
  pointsCell.appendChild(document.createTextNode(score.points));
  const playerCell = newRow.insertCell(2)
  playerCell.className='player';
  playerCell.appendChild(document.createTextNode(score.player));
}

function updateRanks() {
  const positions = document.getElementsByClassName('position');
  for(let pos = 0; pos < positions.length; pos++) {
    positions[pos].innerText = pos + 1;
  }
  const rows = document.getElementById('scores').tBodies[0].getElementsByTagName('tr');
  rows[0].className='champ';
  if(rows.length > 1) {
    rows[1].className='';
  }
}

function removeScore(gameId) {
  const row = document.getElementById(gameId);
  if(row !== null) {
    row.parentNode.removeChild(row);
  }
}

function clearScores() {
  const tableRef = document.getElementById('scores').tBodies[0];
  let pos = 0;
  while(pos < tableRef.childElementCount) {
    tableRef.deleteRow(pos);
  }
}

appSocket.onmessage = (event) => {
  console.log('event received: ' + event.data);
  const object = JSON.parse(event.data);
  if(object.type === 'addScore') {
    removeScore(object.data.gameId);
    addScore(object.data);
    updateRanks();
  }
  if(object.type === 'removeScore') {
    removeScore(object.data.gameId);
    updateRanks();
  }
  if(object.type === 'clearScores') {
    clearScores();
  }
};
