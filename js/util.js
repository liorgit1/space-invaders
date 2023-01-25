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