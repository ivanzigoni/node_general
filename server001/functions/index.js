const { teste1 } = require("./teste1/")
const { teste2 } = require("./teste2/")

module.exports = {
    "/teste1" : {
        method: "POST",
        fn: teste1
    },
    "/teste2": {
        method: "GET",
        fn: teste2,
    }
}