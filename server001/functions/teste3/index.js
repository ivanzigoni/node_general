const gm = require("gm").subClass({ appPath: String.raw`/home/ivan/Downloads/magick` });
const fs = require("fs");
const randomHex = require('random-hex');

function generateImage(path, res) {
  gm(400, 400, randomHex.generate())
  .drawText(200, 200, Array.from({ length: 200 }).reduce(acc => acc + `k`, `j`), "wat")
  .magnify(0.1)
  .write(path, function (err) {
    if (err) {
      res.writeHead(500, {})
      res.end("error");
      console.log(err, "sopinha pa nois");
    }
  })
}

async function main(res, options) {

    const now = new Date().getTime();

    const path = `/home/ivan/Documents/testes/node_general/files/${now}.jpg`;

    generateImage(path, res);

    while (!fs.existsSync(path) || !fs.readFileSync(path).byteLength) {
      process.stdout.write("waiting for file " + `${new Date().getTime()}\r`);
    }

    const stream = fs.createReadStream(path)
    .on("data", (chunk) => { res.write(chunk); })
    .on("close", () => {
      fs.rm(path, (err) => { if (err) stream.emit("error") });
      res.end();
    })
    .on("end", () => {
      stream.emit("close");
    })
    .on("error", (err) => {
      console.log(err);
      res.end("error reading stream")
    })

}


function teste3(res, options) {
    main(res, options);
}

module.exports = { teste3 };
