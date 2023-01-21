function teste1(res, options) {
    const { req } = res;

    
    // console.log(req.body);
    
    res.writeHead(204, {});
    return res.end("d")
}

module.exports = { teste1 };