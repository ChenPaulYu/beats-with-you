export const deleteKey = (obj, key) => {
    let copy = Object.assign({}, obj)
    delete copy[key]
    return copy
}

export const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};