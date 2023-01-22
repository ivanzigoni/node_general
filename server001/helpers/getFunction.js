const functionsMap = require("../functions/");

function getFunction(res) {
  const { req, req: { method, url } } = res;

  console.log(url);
  console.log(functionsMap)

  const fn = functionsMap[url];

  if (!fn) {
    res.writeHead(404, {});
    res.end("no function with that name");
    return;
  }

  if (fn.method !== method) {
    res.writeHead(400, {});
    res.end(`this function only accepts ${fn.method} requests`);
    return;
  }

  fn.fn()
}

module.exports = getFunction;
