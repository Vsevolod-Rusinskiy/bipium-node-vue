const base64 = require("base-64");

function getBasicAuthHeader(username, password) {
    return `Basic ${base64.encode(`${username}:${password}`)}`;
}

module.exports = {
    getBasicAuthHeader,
};