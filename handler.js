var handler = {
	path: "",
	handle: function() {}
};

handler.gen = function(path, func) {
	var hand = {
		path: path,
		serveHTTP: func
	};
	return hand;
};

module.exports = handler;
