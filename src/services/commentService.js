const axios = require("axios");
const { COMMENT_FIELD_INDEX, EXTERNAL_API_URL } = require("../constants");

async function getNewComment() {
    const response = await axios.get(EXTERNAL_API_URL);
    return response.data.value;
}

async function updateOrderComment(catalogId, recordId, comment, authHeader) {
    const updatePayload = { values: { [COMMENT_FIELD_INDEX]: comment } };
    return axios.patch(`${process.env.BPIUM_API_URL}/${catalogId}/records/${recordId}`, updatePayload, {
        headers: { Authorization: authHeader, "Content-Type": "application/json" },
    });
}

module.exports = {
    getNewComment,
    updateOrderComment,
};
