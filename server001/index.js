const { createServer, IncomingMessage } = require("node:http");
const functionMap = require("./functions");
const { urlCheck } = require("./helpers/urlCheck");
const { requestMetadata } = require("./helpers/requestObject");
const { getFunction } = require("./helpers/getFunction");
const { validateMethod } = require("./helpers/validateMethod");


createServer(() => {})
    .listen(3000)
    .on("request", (req, res) => {
		
		req.on("data", (chunkBuffer) => {
			const body = chunkBuffer.toString();

			req.body = JSON.parse(body);
		})

		req.on("end", () => {

			[validateMethod, urlCheck, requestMetadata].forEach(fn => fn(res));

			const handler = getFunction(res);

			const options = {} // TODO

			handler && handler.fn(res, options);
		});

});