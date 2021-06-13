
export const deleteHelper = (arr, id) => {

    const newArr = [...arr];

    const idx = newArr.findIndex((item) => item._id === id);

    newArr.splice(idx, 1);

    return newArr
};