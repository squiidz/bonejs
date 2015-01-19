var server = require('./mux.js')

server.handle("/test", "POST", function(req, res) {
	res.writeHead(200, {
		"Content-Type": "text/html"
	});
	res.end("TEST");
});

server.listen(3000);
