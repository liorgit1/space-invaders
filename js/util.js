// Returns a new cell object. e.g.: {type: SKY, gameObject: ALIEN}
function createCell(gameObject = null) {
    return {
        type: 'SKY',
        gameObject: gameObject
    }
}
function getElCell(pos) {
    return document.querySelector(`[data-i='${pos.i}'][data-j='${pos.j}']`);
}
function renderCell(pos, value) {
    var elCell = getElCell(pos)
    elCell.innerHTML = value
}

function copyMat(mat) {
    var newMat = [];
    for (var i = 0; i < mat.length; i++) {
        newMat[i] = [];
        for (var j = 0; j < mat[0].length; j++) {
            newMat[i][j] = mat[i][j];
        }
    }
    return newMat;
}



function getEmptyPos() {
    const emptyPoses = []
    for (var i = 0; i < 1; i++) {
        for (var j = 0; j < gBoard[0].length - 1; j++) {
            const currCell = gBoard[i][j]
            if (!currCell.gameObject) {
                emptyPoses.push({ i: i, j: j })
            }
        }
    }

    if (!emptyPoses.length) return null
    const randIdx = getRandomIntInclusive(0, emptyPoses.length - 1)
    return emptyPoses[randIdx]
}
function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}
