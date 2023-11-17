const STATUS_FIELD_INDEX = "3";

function hasStatusChanged(values, prevValues) {
    return values.hasOwnProperty(STATUS_FIELD_INDEX) && prevValues.hasOwnProperty(STATUS_FIELD_INDEX);
}

module.exports = {
    hasStatusChanged,
};
