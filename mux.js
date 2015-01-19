var http = require('http');
var newRoute = require('./route');

var methods = ['GET', 'POST', 'UPDATE', 'DELETE', 'HEAD', 'OPTIONS'];

// Mux object Definition
var mux = {
	port: 3000,
	handlers: {
		GET: [],
		POST: [],
		DELETE: [],
		UPDATE: []
	},
	logger: function() {}
}

mux.args = {};

// 404 Handler
mux.badHandler = function(req, res) {
	res.writeHead(404, {});
	res.end("Not Found");
};

// Function to provide at a http.createServer();
mux.serve = function(req, res) {
	for (var i = 0; i < mux.handlers[req.method].length; i++) {
		if (mux.handlers[req.method][i].path == req.url) {
			mux.log(req, res);
			mux.handlers[req.method][i].handler(req, res);
			return;
		} else if (mux.handlers[req.method][i].pattern.valid) {
			if (mux.handlers[req.method][i].match(req.url)) {
				mux.args = mux.handlers[req.method][i].args;
				mux.handlers[req.method][i].handler(req, res);
			} else {
				continue;
			};
		} else {
			continue;
		};
	};
	mux.badHandler(req, res);
};

// Register handler on every methods
mux.handle = function(path, handler) {
	for (m in methods) {
		mux.handlers[m].push(newRoute(path, m, handler));
	};
};
// Register handler on GET resquest only
mux.get = function(path, handler) {
	mux.handlers['GET'].push(newRoute(path, "GET", handler));
};
// Register handler on POST resquest only
mux.post = function(path, handler) {
	mux.handlers['POST'].push(newRoute(path, "POST", handler));
};
// Register handler on DELETE resquest only
mux.delete = function(path, handler) {
	mux.handlers['DELETE'].push(newRoute(path, "DELETE", handler));
};
// Register handler on UPDATE resquest only
mux.update = function(path, handler) {
	mux.handlers['UPDATE'].push(newRoute(path, "UPDATE", handler));
};

// Set custom 404 handler
mux.set404 = function(func) {
	mux.badHandler = function(req, res) {
		res.writeHead(404, {});
		func(req, res);
	};
};

// Log request
mux.log = function(req, res) {
	if (mux.log !== null) {
		mux.logger(req, res);
	};
};

// Set a logger on the mux
mux.setLog = function(func) {
	mux.logger = func;
};

// Start a server with the mux
mux.listen = function(port) {
	mux.port = port;
	http.createServer(mux.serve).listen(mux.port);
	console.log("Server Listening on " + mux.port);
};

module.exports = mux;
