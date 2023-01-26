const gm = require("gm").subClass({ appPath: String.raw`/home/ivan/Downloads/magick` });
const fs = require("fs");
const randomHex = require('random-hex');

function main(res, options) {

    gm(400, 400, randomHex.generate())
    .drawText(10, 50, "from scratch")
    .write("/home/ivan/Documents/testes/node_general/files/teste1.jpg", function (err) {
      console.log(err)
    });


}

function teste3(res, options) {
    main(res, options);
}

module.exports = { teste3 };
