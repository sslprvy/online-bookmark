module.exports = {
    pick,
    omit
};

function pick(object, ...fields) {
    return fields.reduce((accumulator, field) => {
        if (object.hasOwnProperty(field)) {
            accumulator[field] = object[field];

            return accumulator;
        }
    }, {});
}

function omit(object, ...fields) {
    return Object.keys(object).reduce((accumulator, property) => {
        if (!fields.includes(property)) {
            accumulator[property] = object[property];
        }
        return accumulator;
    }, {});
}
