function randomInteger(min, max) {
    const rand = min + Math.random() * (max + 1 - min)
    return Math.floor(rand)
}

function findMin(array) {
    const min = {
        index: 0,
        value: array[0]
    }
    for (let i = 1; i < array.length; ++i) {
        if (array[i] < min.value) {
            min.index = i
            min.value = array[i]
        }
    }
    return min
}

function findMinPositive(array) {
    const min = {}
    min.index = array.findIndex(item => item >= 0)
    min.value = array[min.index]
    for (let i = min.index; i < array.length; ++i) {
        if (array[i] >= 0 && array[i] < min.value) {
            min.index = i
            min.value = array[i]
        }
    }
    return min
}

module.exports = { randomInteger, findMin, findMinPositive }