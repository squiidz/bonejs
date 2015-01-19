var http = require('http');

var server = {
  port: 3000,
  handlers: [],
  logger: function() {}
}

server.badHandler = function(req, res) {
  res.writeHead(404, {});
  res.end("Not Found");
};

server.serve = function(req, res) {
  for (var i = 0; i < server.handlers.length; i++) {
    if (req.url == server.handlers[i].path) {
      server.log(req, res);
      server.handlers[i].serveHTTP(req, res);
      return;
    } else {
      continue;
    };
  };
  server.badHandler(req, res);
};


server.handle = function(path, action) {
  var handler = {
    path: path,
    serveHTTP: action
  };

  server.handlers.push(handler);
};

server.handleFunc = function(handler) {
  server.handlers.push(handler);
}

server.set404 = function(func) {
  server.badHandler = function(req, res) {
    res.writeHead(404, {});
    func(req, res);
  };
};

server.log = function(req, res) {
  if (server.log !== null) {
    server.logger(req, res);
  };
};

server.setLog = function(func) {
  server.logger = func;
};

server.listen = function(port) {
  server.port = port;
  http.createServer(server.serve).listen(server.port);
  console.log("Server Listening on " + server.port);
};

module.exports = server;
