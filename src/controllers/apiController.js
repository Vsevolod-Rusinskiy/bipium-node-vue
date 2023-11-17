const { getBasicAuthHeader } = require('../services/authService');
const { findCatalogIdByName } = require('../services/catalogService');
const { COMMENT_FIELD_INDEX, STATUS_FIELD_INDEX } = require('../constants');
const axios = require('axios');

const createApiRecordInCatalog = async (req, res) => {
    try {
        const { comment, status, catalog } = req.body;
        const orderPayload = {
            values: { [COMMENT_FIELD_INDEX]: comment, [STATUS_FIELD_INDEX]: [status.value] },
        };

        const authHeader = getBasicAuthHeader(process.env.BPIUM_USERNAME, process.env.BPIUM_PASSWORD);

        const { data } = await axios.get(`${process.env.BPIUM_API_URL}`, {
            headers: { Authorization: authHeader },
        });

        const orderCatalogId = await findCatalogIdByName(catalog, data);

        if (!orderCatalogId) {
            console.error('Не найден идентификатор каталога "Заказы"');
            return res.status(404).send('Не найден идентификатор каталога "Заказы"');
        }

        await axios.post(`${process.env.BPIUM_API_URL}/${orderCatalogId}/records`, orderPayload, {
            headers: { Authorization: authHeader, 'Content-Type': 'application/json' },
        });

        console.log('Заказ успешно создан.');
        res.status(200).send('Заказ успешно создан.');
    } catch (error) {
        console.error('Ошибка при создании заказа:', error);
        res.status(500).send('Ошибка при создании заказа.');
    }
};

module.exports = {
    createApiRecordInCatalog,
};
