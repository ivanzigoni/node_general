const fs = require("node:fs");

function writeInDisk(diskStream, line) {
    diskStream.write(line);
}

function writeInResponse(res, line, should) {
    if (should) res.write(line)
}

function main(res, options) {

    const { req: { body: { path, filename, lines, getFile = false } } } = res;

    const destinationPath = `${path}/${filename}.csv`;

    const diskStream = fs.createWriteStream(destinationPath);

    const csvHeader = `column1type=string,column2type=string,column3type=int,column4type=date\n`

    writeInDisk(diskStream, csvHeader);
    writeInResponse(res, csvHeader, getFile);


    for (let i = 0; i < lines - 1; i += 1) {
            const column1 = `column1-${i}`
            const column2 = `column2-${i}`
            const column3 = i
            const column4 = new Date().toISOString()
            const line = `${column1},${column2},${column3},${column4}\n`
    
            writeInDisk(diskStream, line)
            writeInResponse(res, line, getFile)
    }

    diskStream.end();
    res.end();

    return;
}


function teste1(res, options) {
    console.log("aqui")
    const { req, req: { body } } = res;


    const { path, filename, lines, getFile } = body;


    if (!path || !filename || !lines || !body) {
        res.writeHead(400)
        res.end("bad request")
        return;
    }

    main(res, options)
}

module.exports = { teste1 };