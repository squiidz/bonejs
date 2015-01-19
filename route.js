var newRoute = function(path, meth, handler) {
	var route = {
		path: path,
		method: meth,
		tokens: path.split('/'),
		pattern: {
			valid: false,
			id: null,
			pos: null,
			beg: null
		},
		handler: handler,
		args: {},
		match: function(path) {
			var pathSp = path.split('/');
			var pathPos = pathSp.slice(0, route.pattern.pos).join('');
			if (pathPos == route.pattern.beg && route.tokens.length == pathSp.length) {
				route.args = {
					id: route.pattern.id,
					val: pathSp[route.pattern.pos]
				};
				return true;
			} else {
				return false;
			};
		}
	};
	findPattern(route);
	return route;
}

function findPattern(route) {
	for (var i = 0; i < route.tokens.length; i++) {
		var k = route.tokens[i].split("");
		for (var j = 0; j < k.length; j++) {
			if (k[j] == ":") {
				route.pattern.valid = true;
				route.pattern.pos = i;
				route.pattern.id = k.slice(1, k.length).join('');
				route.pattern.beg = route.tokens.slice(0, i).join('');
			};
		};
	};
};

module.exports = newRoute;
