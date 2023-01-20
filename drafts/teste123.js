const fs = require("fs");
const { Transform } = require("stream");

fs.createReadStream("./files/output.txt")
  .pipe(new Transform({ transform(chunk, encoding, cb) { cb(null, Buffer.from(chunk.toString() + "\n") ) }}))
  .pipe(process.stdout)