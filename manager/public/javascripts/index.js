
document.getElementById('usernameFormBtn').addEventListener("click", function(event) {
  saveUsername(document.forms['usernameForm'].username.value);
});

function saveUsername(username) {
  window.localStorage.setItem('username', username);
  console.log(username);
}
