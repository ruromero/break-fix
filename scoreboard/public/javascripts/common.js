const loc = window.location;
let new_uri = "ws://" + loc.hostname + ':40510';

const appSocket = new WebSocket(new_uri);

function addScore(score) {
  const tableRef = document.getElementById('scores').tBodies[0];
  const newRow = tableRef.insertRow(score.position);
  const positionCell = newRow.insertCell(0)
  positionCell.className='position';
  positionCell.appendChild(document.createTextNode(score.position));
  const pointsCell = newRow.insertCell(1)
  pointsCell.className='points';
  pointsCell.appendChild(document.createTextNode(score.points));
  const playerCell = newRow.insertCell(2)
  playerCell.className='player';
  playerCell.appendChild(document.createTextNode(score.player));
}

function updateScores() {
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

function removeScore(position) {
  const tableRef = document.getElementById('scores').tBodies[0];
  tableRef.deleteRow(position);
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
    if(object.data.previous !== -1) {
      removeScore(object.data.previous);
    }
    addScore(object.data);
    updateScores();
  }
  if(object.type === 'removeScore') {
    removeScore(object.data.position);
  }
  if(object.type === 'clearScores') {
    clearScores();
  }
};
