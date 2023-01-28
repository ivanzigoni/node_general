const router = require("../functions");

function getFunction(res) {
  const { req } = res;
  const { url } = req;

  const handler = router[url];
				
  if (!handler) {
    res.writeHead(404, {});
    res.end(JSON.stringify({
      message: "no function with that name"
    }));
    return;
  }

  if (handler.method !== req.method) {
    res.writeHead(400, {});
    res.end(`function only accepts ${handler.method} requests`);
    return;
  }

  return handler;
}

module.exports = { getFunction };
