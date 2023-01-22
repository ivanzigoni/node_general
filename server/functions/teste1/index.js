const { exec } = require('node:child_process');
const { join } = require("node:path");
const fs = require("node:fs");

function main(res, options) {

    const { req: { body: { path, filename, lines } } } = res;

    const stream = fs.createWriteStream(`${path}/${filename}.csv`);

    stream.write(`column1type=string,column2type=string,column3type=int,column4type=date\n`);
    res.write(`column1type=string,column2type=string,column3type=int,column4type=date\n`)

    for (let i = 0; i < lines; i += 1) {
        const column1 = `column1-${i}`
        const column2 = `column2-${i}`
        const column3 = i
        const column4 = new Date()

        stream.write(`${column1},${column2},${column3},${column4.toISOString()}\n`)
        res.write(`${column1},${column2},${column3},${column4.toISOString()}\n`)
    }

    stream.close();
    return;
}


function teste1(res, options) {
    const { req, req: { body } } = res;


    const { path, filename, lines } = body;


    if (!path || !filename || !lines || !body) {
        throw new Error("invalid query");
    }


    main(res, options);
    res.end(JSON.stringify({ message: "file created" }))
}

module.exports = { teste1 };