
document.getElementById('breakBtn').addEventListener("click", function(event) {
  event.preventDefault();
  breakLevel(document.getElementById('level').value, document.getElementById('breakKey').value);
});

document.getElementById('checkBtn').addEventListener("click", function(event) {
  event.preventDefault();
  checkLevel(document.getElementById('level').value);
});

document.getElementById('rollbackBtn').addEventListener("click", function(event) {
  event.preventDefault();
  rollbackLevel(document.getElementById('level').value, document.getElementById('rollbackKey').value);
});

function breakLevel (level, key) {
  alert('Break level: ' + level + ':' + key);
}

function checkLevel (level, key) {
  alert('check: ' + level);
}

function rollbackLevel (level, key) {
  alert('Rollback level: ' + level + ':' + key);
}
