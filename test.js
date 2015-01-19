var mux = require('./mux.js')

mux.get("/test", function(req, res) {
	res.writeHead(200, {
		"Content-Type": "text/html"
	});
	res.end("TEST");
});

mux.get("/test/:var", function(req, res) {
	res.writeHead(200, {
		"Content-Type": "text/html"
	});
	res.end(mux.args.val);
});

mux.listen(3000);
