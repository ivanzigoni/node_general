const { createServer } = require("node:http");
const { urlCheck } = require("./pipes/urlCheck");
const { setRequestMetadata } = require("./pipes/setRequestMetadata");
const { getFunction } = require("./helpers/getFunction");
const { validateMethod } = require("./pipes/validateMethod");


createServer(() => {})
    .listen(3000)
    .on("request", (req, res) => {

		[validateMethod, urlCheck, setRequestMetadata].forEach(fn => fn(res));
		
		req.on("data", (chunkBuffer) => {
			const body = chunkBuffer.toString();

			req.body = JSON.parse(body);
		})

		req.on("end", () => {
			const handler = getFunction(res);

			const options = {} // TODO

			if (handler) {
				handler.fn(res, options);
			}
		});

});