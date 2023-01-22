const { teste1 } = require("./teste1/")

module.exports = {
    "/teste1" : {
        method: "POST",
        fn: teste1
    }
}