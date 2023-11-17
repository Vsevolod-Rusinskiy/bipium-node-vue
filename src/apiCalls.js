const { getBasicAuthHeader } = require('./bpiumService');
const axios = require('axios');

// todo 
 async function someApiCall() {
    const authHeader = getBasicAuthHeader('leto99999@gmail.com', 'qwerty');
    const response = await axios.get('https://test-test-test99999.bpium.ru/api/v1/catalogs', {
        headers: {
            Authorization: authHeader,
        },
    });
    return response.data;
}
module.exports = someApiCall;
