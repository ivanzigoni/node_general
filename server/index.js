const { createServer, IncomingMessage } = require("node:http");
const { Transform } = require("node:stream");
const functionMap = require("./functions");
const getFunction = require("./helpers/getFunction");
const { urlCheck } = require("./helpers/urlCheck");


createServer(() => {})
    .listen(3000)
    .on("request", (req, res) => {

		if (!urlCheck(res, req.url)) {
			return;
		}

		req.on("data", (chunkBuffer) => {
			const body = JSON.parse(chunkBuffer.toString());
			req.body = body;
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