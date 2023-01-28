function makeQuery(url) {

    if (!url.includes("?")) {
        return {
            query: {},
            url,
        }
    }

    const queryString = url.split("?")[1].split("&");

    const queryObject = queryString.reduce((acc, query) => {

        const [key, value] = query.split("=");

        acc[key] = isNaN(Number(value)) ? (value === "true" ? true : value === "false" ? false : value) : Number(value);

        return acc;

    }, {});

    return {
        url: url.split("?")[0],
        query: queryObject,
    }

}

function requestMetadata(req) {
    const { url, query } = makeQuery(req.url);

    req.url = url;
    req.query = query;

    return;
}

module.exports = { requestMetadata };
