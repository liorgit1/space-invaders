const BOARD_SIZE = 14;
const ALIENS_ROW_LENGTH = 8
const ALIENS_ROW_COUNT = 3
const HERO = '🚀';
const ALIEN = '👽';
const CANDY = '🍭';
const ROCK = '⚽'
var isSuper = false
// Matrix of cell objects. e.g.: {type: SKY, gameObject: ALIEN}
var gBoard;
var gAliens = []
let gCandyInterval
let emptyPos
let nShot = false
// nShots
var gHero


var gGame = {
    isOn: false,
    aliensCount: 0,
    score: 0
}
// Called when game loads
function init(size, aliensRows) {
    gGame.isOn = false
    clearInterval(gCandyInterval)
    clearInterval(gAliensInterval)
    gHero = createHero()
    gBoard = createBoard(size, aliensRows)
    renderBoard(gBoard)
    gAliensInterval = setInterval(moveAliens, ALIEN_SPEED)
    gGame.aliensCount = countAliens()
    gAliensBottomRowIdx = findBottomRowIdx()
    gCandyInterval = setInterval(placeCandy, 10000)
    isSuper = false
    gGame.score = 0
    document.querySelector('.startBtn span').innerText = 'start'
    document.querySelector('.score span').innerText = gGame.score
    document.querySelector('.modal').hidden = true
}
// Create and returns the board with aliens on top, ground at bottom
// use the functions: createCell, createHero, createAliens
function createBoard(size = BOARD_SIZE, aliensRows = ALIENS_ROW_COUNT) {
    const ROWS = size;
    const COLS = size;
    var board = [];

    // Create the rows and cells for the game board
    for (var i = 0; i < ROWS; i++) {
        board.push([]);
        for (var j = 0; j < COLS; j++) {

            if (i < aliensRows && j >= (COLS - ALIENS_ROW_LENGTH) / 2 && j < (COLS + ALIENS_ROW_LENGTH) / 2) {
                board[i][j] = createCell(ALIEN);
            }
            else if (i === gHero.pos.i && j === gHero.pos.j) {
                board[i][j] = createCell(HERO);

            }
            else board[i][j] = createCell();
        }
    }
    console.log('board :>> ', board);
    return board;

}
// Render the board as a <table> to the page
function renderBoard(board) {
    var strHTML = '';
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>\n'
        for (var j = 0; j < board[0].length; j++) {

            var cellClass = 'cell';
            if (board[i][j].gameObject) {
                // cellClass += ` ${board[i][j].gameObject}`
                strHTML += `\t<td class="${cellClass}" data-i="${i}" data-j="${j}">${board[i][j].gameObject}</td>\n`;
            }
            else strHTML += `\t<td class="${cellClass}" data-i="${i}" data-j="${j}"></td>\n`;

        }
        strHTML += '</tr>\n'
    }
    var elBoard = document.querySelector('.board');
    elBoard.innerHTML = strHTML;

}



// Returns a new cell object. e.g.: {type: SKY, gameObject: ALIEN}
function createCell(gameObject = null) {
    return {
        type: 'sky',
        gameObject: gameObject
    }
}
// position such as: {i: 2, j: 7}
function updateCell(pos, gameObject = null) {
    gBoard[pos.i][pos.j].gameObject = gameObject;
    var elCell = getElCell(pos);
    elCell.innerHTML = gameObject || '';
}

function freeze() {
    gIsAlienFreeze = !gIsAlienFreeze
    document.querySelector('.freezeBtn span').innerText = gIsAlienFreeze ? 'unfreeze' : 'freeze'
}
function placeCandy() {

    if (gIsAlienFreeze || !gGame.isOn) return;
    let emptyPos = getEmptyPos(gBoard)
    if (!emptyPos) return
    gBoard[emptyPos.i][emptyPos.j].gameObject = CANDY
    // renderCell(emptyPos, CANDY)
    updateCell(emptyPos, CANDY)
    // clearInterval(gCandyInterval)

    setTimeout(() => {
        removeCandy(emptyPos)
    }, 5000)


}




function removeCandy(pos) {
    var i = pos.i
    var j = pos.j
    if (gBoard[i][j].gameObject === CANDY) {
        gBoard[i][j].gameObject = null
        renderCell(pos, '')
    }
}


function updateScore(diff) {
    // update model and dom
    gGame.score += diff
    document.querySelector('.score span').innerText = gGame.score

}



function starGame() {
    if (gGame.isOn) {
        init()
        document.querySelector('.startBtn span').innerText = 'start'
    }
    else {
        document.querySelector('.startBtn span').innerText = 'restart'
        gGame.isOn = true
        gIsAlienFreeze = false
    }

}
function gameOver() {
    document.querySelector('.modal ').hidden = false
    document.querySelector('.modal span').innerText = 'game over'
    clearInterval(gAliensInterval)
    gGame.isOn = false
}


function win() {
    document.querySelector('.modal ').hidden = false
    document.querySelector('.modal span').innerText = 'you win'

}