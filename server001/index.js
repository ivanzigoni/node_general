const { createServer, IncomingMessage } = require("node:http");
const functionMap = require("./functions");
const { urlCheck } = require("./helpers/urlCheck");


createServer(() => {})
    .listen(3000)
    .on("request", (req, res) => {

		if (!urlCheck(res, req.url)) {
			return;
		}
		
		req.on("data", (chunkBuffer) => {
			// const body = JSON.parse(chunkBuffer.toString()); // TODO
			
			const body = chunkBuffer.toString();

			req.body = JSON.parse(body);
		})

		req.on("end", () => {
			if (!["GET", "POST"].includes(req.method)) {
				res.writeHead(400, {});
				res.end(JSON.stringify({
					message: "only GET and POST allowed"
				}));
				return;
			}


			if (!req.body && req.method === "GET" || req.body && req.method === "POST") {

				const fn = functionMap[req.url];
				
				if (!fn) {
					res.writeHead(400, {});
					res.end(JSON.stringify({
						message: "no function with that name"
					}));
					return;
				}

				if (fn.method !== req.method) {
					res.writeHead(400, {});
					res.end(`function only accepts ${fn.method} requests`);
					return;
				}

				const options = {} // TODO?
				fn.fn(res, {});
				return;

			} else {
				res.writeHead(400, {});
				res.end(JSON.stringify({
					message: "POST requests must have payload. GET requests cannot have payload."
				}));
				return;
			}

		});

});