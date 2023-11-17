const { getNewComment, updateOrderComment } = require("../services/commentService");
const { getBasicAuthHeader } = require("../services/authService");
const { hasStatusChanged } = require("../services/utils");
const { findCatalogIdByName } = require("../services/catalogService");
const { COMMENT_FIELD_INDEX } = require("../constants");
const axios = require("axios");

const updateOrder = async (req, res) => {
    try {
        const { catalogId, recordId, values, prevValues } = req.body.payload;

        if (!hasStatusChanged(values, prevValues)) {
            console.log("Статус заказа не изменился.");
            return res.status(200).send("Статус заказа не изменился.");
        }

        const newComment = await getNewComment();
        const authHeader = getBasicAuthHeader(process.env.BPIUM_USERNAME, process.env.BPIUM_PASSWORD);
        await updateOrderComment(catalogId, recordId, newComment, authHeader);

        console.log("Статус заказа обновлен с новым комментарием.");
        res.status(200).send("Статус заказа обновлен с новым комментарием.");
    } catch (error) {
        console.error("Ошибка при обновлении заказа:", error);
        res.status(500).send("Ошибка при обновлении комментария.");
    }
};

const createOrder = async (req, res) => {
    try {
        const { values } = req.body.payload;
        const comment = values[COMMENT_FIELD_INDEX] || "Без комментария";

        const newRecordPayload = {
            values: {
                3: [req.body.payload],
                4: comment,
            },
        };

        const authHeader = getBasicAuthHeader(process.env.BPIUM_USERNAME, process.env.BPIUM_PASSWORD);

        const { data } = await axios.get(`${process.env.BPIUM_API_URL}`, {
            headers: { Authorization: authHeader },
        });

        const storeCatalogId = await findCatalogIdByName("Склад", data);

        if (!storeCatalogId) {
            console.error('Не найден идентификатор каталога "Склад"');
            return res.status(404).send('Не найден идентификатор каталога "Склад"');
        }

        await axios.post(`${process.env.BPIUM_API_URL}/${storeCatalogId}/records`, newRecordPayload, {
            headers: { Authorization: authHeader, "Content-Type": "application/json" },
        });

        console.log("Запись в склад успешно создана.");
        res.status(200).send("Запись в склад успешно создана.");
    } catch (error) {
        console.error("Ошибка при создании записи в складе:", error);
        res.status(500).send("Ошибка при создании записи.");
    }
};

module.exports = {
    updateOrder,
    createOrder,
};
