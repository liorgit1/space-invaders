const LASER_SPEED = 80;
var gHero = { pos: { i: 12, j: 5 }, isShoot: false };
// creates the hero and place it on board
function createHero() {
    return {
        pos: { i: 12, j: 5 },
        isShoot: false
    };
}

// Handle game keys
function onKeyDown(event) {
    var i = gHero.pos.i
    var j = gHero.pos.j

    switch (event.key) {
        case 'ArrowLeft':
            if (j - 1 >= 0) moveHero(i, j - 1)
            break
        case 'ArrowRight':
            if (j + 1 < gBoard[0].length) moveHero(i, j + 1)
            break
        case 'ArrowUp':
            shoot()
            break

    }
    // console.log('event :>> ', event);

}
onKeyDown()
// Move the hero right (1) or left (-1)
function moveHero(i, j) {
    // Move the gamer
    // Moving from current position
    // Update model
    gBoard[gHero.pos.i][gHero.pos.j].gameElement = null
    // Update dom
    renderCell(gHero.pos, '')

    // Moving to selected position
    // Update model
    gHero.pos.i = i
    gHero.pos.j = j
    gBoard[gHero.pos.i][gHero.pos.j].gameElement = HERO
    // Update dom
    renderCell(gHero.pos, HERO)



}
// Sets an interval for shutting (blinking) the laser up towards aliens
// function shoot() {
//     var shootIdxI = gHero.pos.i - 1
//     var shootIdxJ = gHero.pos.j


//     // var intervalId = setInterval(() => {
//     //     // check if laser reached top or hit an alien
//     //     if (shootIdxI < 0 || gBoard[shootIdxI][shootIdxJ].gameObject === ALIEN) {
//     //         clearInterval(intervalId);
//     //         return;
//     //     }
//     //     blinkLaser({ i: shootIdxI, j: shootIdxJ });
//     //     // move laser up
//     //     shootIdxI--;
//     // }, 1000);







//     for (let i = shootIdxI; i >= 0; i--) {
//         const currcell = gBoard[i][shootIdxJ];
//         blinkLaser()




//         if (currcell.gameObject === ALIEN) {
//             updateCell({ i: i, j: shootIdxJ })


//             break;
//         }
//     }
// }
function shoot() {
    var shootIdxI = gHero.pos.i - 1;
    var shootIdxJ = gHero.pos.j;
    var intervalId = setInterval(() => {
        if (shootIdxI < 0 || gBoard[shootIdxI][shootIdxJ].gameObject === ALIEN) {
            clearInterval(intervalId);
            return;
        }
        blinkLaser({i:shootIdxI,j:shootIdxJ});
        shootIdxI--;
    }, 1000);

}

function handleAlienHit(pos) {
    var cell = gBoard[pos.i][pos.j];


}
// renders a LASER at specific cell for short time and removes it
// function blinkLaser(pos) {
//     var cell = getElCell(pos)
//     renderCell(pos, LASER)
//     setTimeout(() => {
//         renderCell(pos)
//     }, LASER_SPEED)

// }

function blinkLaser(pos) {
    var cell = getElCell(pos)
    cell.gameObject = LASER;
    updateCell(pos,LASER)
    setTimeout(() => {
        cell.gameObject = null;
        updateCell(pos)
    }, 1000);
}