export function flatten(array) {
    let flattenedArray = [];
    array.forEach(element => {
        if (Array.isArray(element)) {
            flattenedArray = flattenedArray.concat(...element);
        } else {
            flattenedArray = flattenedArray.concat(element);
        }
    });

    return flattenedArray;
}
