const ALIEN_SPEED = 250;
var GgoLeft = true
var gAliensInterval;
// The following two variables represent the part of the matrix (some rows)
// that we should shift (left, right, and bottom)
// We need to update those when:
// (1) shifting down and (2) last alien was cleared from row
var gAliensTopRowIdx;
var randBottomcollIdx
var gAliensBottomRowIdx;
var gIsAlienFreeze = true;
function createAlien(i, j) {
    var alien = {
        pos: {
            i: i,
            j: j,
        },
    }

    gAliens.push(alien)
    return alien
    // board[alien.pos.i][alien.pos.j] = alien
}



// runs the interval for moving aliens side to side and down
// it re-renders the board every time
// when the aliens are reaching the hero row - interval stops
function moveAliens() {
    if (gIsAlienFreeze || !gGame.isOn) return;
    gAliensBottomRowIdx = findBottomRowIdx()

    // shootRock()
    if (gAliensBottomRowIdx === gHero.pos.i) {
        gameOver()

        return
    }


    gBoard = moveAliensLeft()
    renderBoard(gBoard)
}
let shootIdxI =gAliensBottomRowIdx+1
let shootIdxJ = randBottomcollIdx

// function shootRock() {
    
//     randBottomcollIdx = findBottomcollsIdxs(gAliensBottomRowIdx)
    
    
    
    
//     let shootRockIntervalId = setInterval(() => { 
//         if (shootIdxI > gBoard.length){
//             clearInterval(shootRockIntervalId)
//             return
//         }
        
//         if (gBoard[shootIdxI][shootIdxJ].gameObject ===HERO)gameOver()
        
//         blinkRock({ i: shootIdxI, j: shootIdxJ });
//         shootIdxI++
        
        
        
        
        
        
        
        
//     },1000)
    
// }

function findBottomcollsIdxs(row) {
    var collsIdxs = []


    for (let i = 0; i < gBoard[row].length; i++) {
        if (gBoard[row][i].gameObject === ALIEN) {

            collsIdxs.push(i)


        }

    }

    var randIdx = getRandomIntInclusive(0, collsIdxs.length - 1);
    var randomCollIdx = collsIdxs[randIdx];
    console.log('randomCollIdx :>> ', randomCollIdx);
    return randomCollIdx

}
function moveAliensLeft() {
    let newBoard = copyMat(gBoard) //JSON.parse(JSON.stringify(gBoard))
    newBoard = clearBoardFromAliens(newBoard)
    var diff = GgoLeft ? -1 : +1
    
    for (let i = gBoard.length - 1; i >= 0; i--) {
        for (let j = gBoard[0].length - 1; j >= 0; j--) {
            
            if (gBoard[i][j].gameObject === ALIEN) {
                // if there is a candy in the same cell as the alien, remove it
                if (gBoard[i][j].gameObject === CANDY) newBoard[i][j].gameObject = CANDY;
                else if (newBoard[i][j + diff]) newBoard[i][j + diff].gameObject = ALIEN
                else {
                    GgoLeft = !GgoLeft
                    newBoard = moveAliensLeft()
                    newBoard = moveAliensDown()
                    return newBoard
                }
            }

        }
    }
    return newBoard
}

function moveAliensDown() {
    var newBoard = copyMat(gBoard) //JSON.parse(JSON.stringify(gBoard))
    newBoard = clearBoardFromAliens(newBoard)
    // Move all aliens one cell down\

    for (let i = gBoard.length - 1; i >= 0; i--) {
        // debugger

        for (let j = 0; j <= gBoard[0].length - 1; j++) {
            if (gBoard[i][j].gameObject === CANDY) newBoard[i][j].gameObject = CANDY
            else if (gBoard[i][j].gameObject === ALIEN) {
                newBoard[i + 1][j].gameObject = ALIEN
            }

        }
    }
    return newBoard
}


function clearBoardFromAliens(mat) {

    var newMat = []
    for (let i = 0; i < mat.length; i++) {
        newMat[i] = []
        for (let j = 0; j < mat[0].length; j++) {
            if (mat[i][j].gameObject === HERO || mat[i][j].gameObject === CANDY) newMat[i][j] = mat[i][j] // newMat[i][j] = createCell(HERO)

            else newMat[i][j] = createCell()
            // else newMat[i][j] = mat[i][j]
        };

    }
    return newMat
}

function findBottomRowIdx() {
    var bottomRowIdx
    // debugger
    for (let i = gBoard.length - 1; i >= 0; i--) {
        for (let j = gBoard[0].length - 1; j >= 0; j--) {
            if (gBoard[i][j].gameObject === ALIEN) {
                bottomRowIdx = i
                return bottomRowIdx
            }
        }
    }
}
function findTopRowIdx() {
    var topRowIdx
    for (let i = 0; i < gBoard.length; i++) {
        for (let j = 0; j < gBoard[0].length; j++) {
            if (gBoard[i][j].gameObject === ALIEN) {
                topRowIdx = i;
                return topRowIdx;
            }
        }
    }
}


function countAliens() {

    var count = 0

    for (let i = 0; i < gBoard.length; i++) {
        for (let j = 0; j < gBoard[0].length; j++) {
            if (gBoard[i][j].gameObject === ALIEN) count++


        }

    }
    if (count === 0) win()
    return count
}