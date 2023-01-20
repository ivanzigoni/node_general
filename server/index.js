const { createServer, IncomingMessage } = require("node:http");
const { Transform } = require("node:stream");
const functionMap = require("./functions");
const getFunction = require("./helpers/getFunction");
const { urlCheck } = require("./helpers/urlCheck");


createServer(() => {})
    .listen(3000)
    .on("request", (req, res) => {
        req.on("data", (buffer) => {

					if (!["GET", "POST"].includes(req.method)) {
						res.writeHead(400, {});
						res.end("invalid request1");
						return;
					}

					if (buffer && req.method === "GET" || !buffer && req.method === "POST") {

						const fn = functionMap[req.url];
						
						if (!fn) {
							res.writeHead(400, {});
							res.end("no function with that name");
							return;
						}

						if (fn.method !== req.method) {
							res.writeHead(400, {});
							res.end(`function only accepts ${fn.method} requests`);
							return;
						}

						const options = {} // TODO?
						res.req.body = JSON.parse(JSON.stringify(buffer));
						fn.fn(res, {});
						return;
					} else {
						res.writeHead(400, {});
						res.end("invalid request batata");
						return;
					}
        });

				if (req.method !== "POST") {
					req.emit("data");
				}
});