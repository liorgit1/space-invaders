const BOARD_SIZE = 14;
const ALIENS_ROW_LENGTH = 8
const ALIENS_ROW_COUNT = 3
const HERO = '♆';
const ALIEN = '👽';
const LASER = '⤊';
// Matrix of cell objects. e.g.: {type: SKY, gameObject: ALIEN}
var gBoard;
var gAliens = []
var gGame = {
    isOn: false,
    aliensCount: 0
}
// Called when game loads
function init() {
    createHero()
    gBoard = createBoard()
    renderBoard(gBoard)
}
// Create and returns the board with aliens on top, ground at bottom
// use the functions: createCell, createHero, createAliens
function createBoard() {
    const ROWS = BOARD_SIZE;
    const COLS = BOARD_SIZE;
    var board = [];

    // Create the rows and cells for the game board
    for (var i = 0; i < ROWS; i++) {
        board.push([]);
        for (var j = 0; j < COLS; j++) {

            if (i < ALIENS_ROW_COUNT && j >= (COLS - ALIENS_ROW_LENGTH) / 2 && j < (COLS + ALIENS_ROW_LENGTH) / 2) {
                var alien = createAlien(board, i, j)

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
