const http = require("http");
const fs = require("fs");

function makeRequest(res) {

    http.get("http://www.pudim.com.br/pudim.jpg", (resPudim) => {

        const wstream = fs.createWriteStream(__dirname + "/pudim.jpg");

        resPudim.on("data", (chunk) => {
            wstream.write(chunk);
        })
        
        resPudim.on("end", () => {
            res.end();
        })
    })


}



function teste2(res, options) {
    makeRequest(res);
}

module.exports = { teste2 };
