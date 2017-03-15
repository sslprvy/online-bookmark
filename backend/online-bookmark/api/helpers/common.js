module.exports = {
    pick
};

function pick(object, ...fields) {
    return fields.reduce((accumulator, field) => {
        if (object.hasOwnProperty(field)) {
            accumulator[field] = object[field];

            return accumulator;
        }
    }, {});
}
