const { exec } = require('node:child_process');
const { join } = require("path");
const { path: { csvGenerator }} = require("../../../env");

function teste1(res, options) {
    const { req, req: { body } } = res;


    const { path, filename, lines } = body;


    if (!path || !filename || !lines) throw new Error("invalid query");

    exec(join(__dirname + "/bash.sh" + " " + csvGenerator + " " + path + " " + filename + " " + lines), (error, stdout) => {
        console.log(error, "error\n")

        if (error) {
            res.writeHead(500, {});
            res.end(JSON.stringify(error))
        } else {
            res.writeHead(200, {})
            res.end(JSON.stringify({ message: "success" }))
        };
    })
}

module.exports = { teste1 };