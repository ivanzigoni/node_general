const fs = require("fs");
const { Transform } = require("stream")

function main() {


    const writeStream = fs.createWriteStream("./files/output.txt");    

    const testeTransform = new Transform({
        transform(chunk, encoding, cb) {
            cb(null, chunk)
        }
    })

    const testeTransform2 = new Transform({
        transform(chunk, encoding, cb) {
            cb(null, chunk);
        }
    })


    process.stdin
        .pipe(testeTransform)
        .pipe(testeTransform2)
        .pipe(writeStream);


}
main();
