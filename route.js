var newRoute = function(path, meth, handler) {
	return {
		path: path,
		method: meth,
		tokens: path.split("/"),
		handler: handler
	}
}

module.exports = newRoute;
