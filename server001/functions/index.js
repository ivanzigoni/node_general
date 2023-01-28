const { teste1 } = require("./teste1/")
const { teste2 } = require("./teste2/")
const { teste3 } = require("./teste3/")

const router = {
    "/teste1" : {
        method: "POST",
        fn: teste1
    },
    "/teste2": {
        method: "GET",
        fn: teste2,
    },
    "/teste3": {
        method: "GET",
        fn: teste3,
    }
}

module.exports = router;