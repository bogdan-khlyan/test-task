const colors = require('./colors')
const { randomInteger, findMin, findMinPositive } = require('./utils')


const array = []
for (let i = 0; i < 10; ++i) {
    const arr = []
    for (let j = 0; j < 10; ++j) {
        arr.push(randomInteger(-100, 100))
    }
    array.push(arr)
}


const mins = array.map(item => Math.min.apply(null, item))
let min = findMin(mins)


const quantityToReplace = []
array.forEach(line => {
    let count = 0
    for (let i = 1; i < 9; ++i) {
        const current = Math.sign(line[i])
        const prev = Math.sign(line[i - 1])
        const next = Math.sign(line[i + 1])

        if (current === prev && current === next && next === prev) {
            let temp = 3
            for (let j = i + 1; j < 10; ++j) {
                if (Math.sign(line[j]) === current) {
                    ++temp
                    ++i
                } else {
                    break
                }
            }
            count += Math.trunc(temp / 3)
        }
    }
    quantityToReplace.push(count)
})

printArray(array)

function printArray(array) {
    console.log('\n')
    console.log(`${colors.BgRed}00${colors.Reset} - минимальное число в матрице;`)
    console.log(`${colors.BgGreen}00${colors.Reset} - наименьшее положительное число в строке`)
    console.log('\n')
    let result = '['
    for (let i = 0; i < 10; ++i) {
        result += '\n\t['
        const minPositive = findMinPositive(array[i])
        for (let j = 0; j < 10; ++j) {
            result += '   '
            result += prepareItem(array[i][j], i, j, min, minPositive)
        }
        result += '   ]'
        result += i === min.index ? ` ${colors.BgRed}*${colors.Reset}` : '  '
        result += ' к замене: ' + quantityToReplace[i]
    }
    result += '\n]'
    console.log(result)
}


function prepareItem(item, i, j, min, minPositive) {
    const isLast = j === 9
    const isMin = i === min.index && item === min.value
    const isMinPositive = minPositive.index === j && item === minPositive.value

    let result = String(item)

    let selectedColors = ''
    if (isMin) {
        selectedColors = colors.BgRed
    }
    if (isMinPositive) {
        selectedColors = colors.BgGreen
    }


    if (item.length === 4) {
        result += colors.Reset
        return result
    } else {
        if (item >= 0) {
            result = ' ' + result
        }
        if (!isLast) {
            result += ','
        }
        while(result.length < 5) {
            result += ' '
        }
        result += colors.Reset
        return selectedColors + result
    }
}

