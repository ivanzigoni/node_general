function validateMethod(res) {

	const { req } = res;

	if (!["GET", "POST"].includes(req.method)) {
		res.writeHead(400, {});
		res.end(JSON.stringify({
			message: "only GET and POST allowed"
		}));
		return;
	}

	if (!req.body && req.method === "GET" || req.body && req.method === "POST") {
		return;
	} else {
		res.writeHead(400, {});
		res.end(JSON.stringify({
			message: "POST requests must have payload. GET requests cannot have payload."
		}));
		return;
	}
}

module.exports = { validateMethod };
