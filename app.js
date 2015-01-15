// Worker initialisation
var worker = new SharedWorker('/worker.js');
worker.port.addEventListener('message', function(evt) {
  onMessage(evt.data);
});
worker.addEventListener('error', function(evt) {
  console.error(evt);
});
worker.port.start();

function getUserName() {
  var userElement = document.getElementById('identity');
  var userName = userElement.value.trim();
  if (userName) {
    return userName;
  }

  var userNames = ['John', 'Amparo', 'Jamie', 'Peter', 'Margaret', 'Maria'];
  var index = Math.round(Math.random() * userNames.length);
  userName = userNames[index];
  userName += '_' + Math.floor(Math.random() * 100);
  userElement.value = userName;

  return userName;
}

function getContent() {
  return document.getElementById('content').value;
}

function onMessage(msg) {
  var log = document.getElementById('log');
  var span = document.createElement('span');
  span.textContent = msg;
  log.innerHTML += msg + '<br/>';
}

document.getElementById('send').addEventListener('click', function() {
  worker.port.postMessage({
    user: getUserName(),
    msg: getContent()
  });
});

document.getElementById('count').addEventListener('click', function() {
  worker.port.postMessage({
    count: 1
  });
});
