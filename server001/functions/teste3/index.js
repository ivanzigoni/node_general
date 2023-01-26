const gm = require("gm").subClass({ appPath: String.raw`/home/ivan/Downloads/magick` });
const fs = require("fs");
const randomHex = require('random-hex');

function generateImage(path) {
  gm(400, 400, randomHex.generate())
  .drawText(200, 200, Array.from({ length: 200 }).reduce(acc => acc + `k`, `j`), "wat")
  .magnify(0.1)
  .write(path, function (err) {
    if (err) {
      console.log(err, "sopinha pa nois");
    }
  })
}

async function main(res, options) {

    const path = "/home/ivan/Documents/testes/node_general/files/teste1.jpg";

    generateImage(path);

    while (!fs.existsSync(path)) {
      console.log("waiting for file")
    }

    const stream = fs.createReadStream(path)
      .on("data", (chunk) => { res.write(chunk); })
      .on("end", () => {
        fs.rm(path, (err) => { if (err) console.log(err, "frango com batata"); });
        stream.close((err) => { if (err) console.log(err); })
        res.end();
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
