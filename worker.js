var connections = 0;
var ports = [];

self.addEventListener('connect', function(evt) {
  port = evt.ports[0];
  ports.push(port);
  var index = ports.length - 1;
  connections++;

  ports[index].addEventListener('message', function(e) {
    var data = e.data;
    if (data.count) {
      ports[index].postMessage('We have ' + ports.length + ' ports and '
       + connections + ' connections');
      return;
    }
    var msg = data.user + ' : ' + data.msg;
    ports.forEach(function(p) {
      p.postMessage(msg);
    });
  });
  port.start();
  port.postMessage('Current connections ' + connections);
});
