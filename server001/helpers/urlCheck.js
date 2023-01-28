function urlCheck(res) {
    const { req: { url } } = res;

    if (!url) {
        res.writeHead(404);
        res.end(JSON.stringify({ message: "need to specify a function" }))
        return false;
    }

    if (url.length <= 1) {
        res.writeHead(404);
        res.end(JSON.stringify({ message: "need to specify a function" }))
        return false;
    }

    return true;
}

module.exports = { urlCheck };