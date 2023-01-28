const gm = require("gm").subClass({ appPath: String.raw`/home/ivan/Downloads/magick` });
const fs = require("fs");
const randomHex = require('random-hex');
const { crawler } = require("../../../crawler/");

function generateImage(path, res) {
  gm(400, 400, randomHex.generate())
  .drawText(200, 200, Array.from({ length: 200 }).reduce(acc => acc + `k`, `j`))
  .magnify(0.1)
  .write(path, function (err) {
    if (err) {
      res.writeHead(500, {})
      res.end("error generating image");
      console.log(err);
    }
  })
}

async function main(res, options) {

    const now = new Date().getTime();

    const path = __dirname + `/tmp/${now}.jpg`

    generateImage(path, res);

    while (!fs.existsSync(path) || !fs.readFileSync(path).byteLength) {

        const TIMEOUT = new Date().getTime() - now >= 20000;

        if (TIMEOUT) { res.writeHead(500, {}); res.end("timeout generating file"); return; };

        process.stdout.write("waiting for file " + `${new Date().getTime()}\r`);
    }

    console.log("\r");

    await crawler(path);

    fs.rm(path, (err) => { if (err)  { console.log(err); } });

    if (!res.writableFinished) {
        res.end("ok")
    }

    console.log("end");
}

let jobRunning = false;
let job;
function teste3(res, options) {
    if (jobRunning === false) {
      jobRunning = true;
      main(res, options);
      job = setInterval(() => { main(res, options); }, 30000);
    } else {
      jobRunning = false;
      clearInterval(job);
      crawler(null, true);
      res.end("job suspended")
    }
}

module.exports = { teste3 };
