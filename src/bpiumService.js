const BP = require('bp-api').default;
const bp = new BP('test-test-test99999.bpium.ru', 'leto99999@gmail.com', 'qwerty');
const base64 = require('base-64');

function getBasicAuthHeader(username, password) {
    const encodedCredentials = base64.encode(`${username}:${password}`);
    return `Basic ${encodedCredentials}`;
}

module.exports = {
    getBasicAuthHeader,
    getRecords: async (catalogId) => {
        return await bp.getAllRecords(catalogId);
    },


};