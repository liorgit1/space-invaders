let LASER_SPEED = 80;

// creates the hero and place it on board
function createHero() {
    return {
        pos: { i: 9, j: 5 },
        isShoot: false
    };
}

// Handle game keys
function onKeyDown(event) {
    var i = gHero.pos.i
    var j = gHero.pos.j

    console.log('event.key :>> ', event.key);
    switch (event.key) {

        case 'ArrowLeft':
            if (j - 1 >= 0 && gGame.isOn) moveHero(i, j - 1)
            break
        case 'ArrowRight':
            if (j + 1 < gBoard[0].length && gGame.isOn) moveHero(i, j + 1)
            break
        case ' ':
            if (!gHero.isShoot && gGame.isOn) shoot()
            break
        case 'n':
            if (!gHero.isShoot && gGame.isOn) {
                nShot = true
                shoot()
            }
            break
        case 'x': if (gGame.isOn) {

            isSuper = true
            setTimeout(() => {
                isSuper = false
                LASER_SPEED = 80
            }, 3000);
        }
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

    gBoard[gHero.pos.i][gHero.pos.j].gameObject = null
    // Update dom
    renderCell(gHero.pos, '')

    // Moving to selected position
    // Update model
    gHero.pos.i = i
    gHero.pos.j = j
    gBoard[gHero.pos.i][gHero.pos.j].gameObject = HERO
    // Update dom
    renderCell(gHero.pos, HERO)

}

function shoot() {


    if (nShot) LASER = '💥'
    else if (isSuper) LASER = '^'
    else LASER = '⤊'
    LASER_SPEED = isSuper ? LASER_SPEED /= 1.5 : LASER_SPEED
    gHero.isShoot = true
    let shootIdxI = gHero.pos.i - 1;
    let shootIdxJ = gHero.pos.j;
    let shootIntervalId = setInterval(() => {

        if (shootIdxI < 0) {
            gHero.isShoot = false
            clearInterval(shootIntervalId);
            gGame.aliensCount = countAliens()
            nShot = false
            return;
        }
        if (gBoard[shootIdxI][shootIdxJ].gameObject === ALIEN && !nShot) {
            // handleAlienHit(shootIdxI, shootIdxJ)
            gHero.isShoot = false
            clearInterval(shootIntervalId)
            gBoard[shootIdxI][shootIdxJ].gameObject = null
            gGame.aliensCount = countAliens()
            updateCell({ i: shootIdxI, j: shootIdxJ })
            updateScore(10)


            if (gGame.aliensCount === 0) {
                clearInterval(gCandyInterval)
                gGame.isOn = false
                console.log('you win');


            }
            return
        } else if (gBoard[shootIdxI][shootIdxJ].gameObject === ALIEN && nShot) {

            // handleAliensNshot(shootIdxI, shootIdxJ)
            clearInterval(shootIntervalId)
            blowUpNeighbors({ i: shootIdxI, j: shootIdxJ })
            gHero.isShoot = false
            nShot = false
            gGame.aliensCount = countAliens()
            if (gGame.aliensCount === 0) {
                gGame.isOn = false
                clearInterval(gCandyInterval)
                console.log('you win');
            }
            return
        }

        else if (gBoard[shootIdxI][shootIdxJ].gameObject === CANDY) {
            gIsAlienFreeze = true
            updateScore(50)
            setTimeout(() => { gIsAlienFreeze = false }, 5000)



        }

        blinkLaser({ i: shootIdxI, j: shootIdxJ });
        shootIdxI--;
    }, LASER_SPEED);
}




function handleAlienHit(shootIdxI, shootIdxJ) {
    gHero.isShoot = false
    clearInterval(shootIntervalId)
    gBoard[shootIdxI][shootIdxJ].gameObject = null
    gGame.aliensCount = countAliens()
    updateCell({ i: shootIdxI, j: shootIdxJ })
    updateScore(10)


}

function handleAliensNshot(shootIdxI, shootIdxJ) {
    clearInterval(shootIntervalId)
    blowUpNeighbors({ i: shootIdxI, j: shootIdxJ })
    gHero.isShoot = false
    nShot = false
    gGame.aliensCount = countAliens()
}

function blinkLaser(pos) {
    var cell = getElCell(pos)
    cell.gameObject = LASER;
    updateCell(pos, LASER)
    setTimeout(() => {
        cell.gameObject = null;
        updateCell(pos)
    }, LASER_SPEED);
}

function blinkRock(pos) {
    var cell = getElCell(pos)
    cell.gameObject = ROCK;
    updateCell(pos, ROCK)
    setTimeout(() => {
        cell.gameObject = null;
        updateCell(pos)
    }, 80);
}





function blowUpNeighbors(laserPos) {
    var neighbors = getNeighbors(laserPos);
    console.log('neighbors :>> ', neighbors);
    for (let i = 0; i < neighbors.length; i++) {
        var neighborPos = neighbors[i];
        if (gBoard[neighborPos.i][neighborPos.j].gameObject === ALIEN) {
            updateCell(neighborPos, null)
            updateScore(10)
        }
    }
}

function getNeighbors(pos) {
    var neighbors = [];
    for (let i = pos.i - 1; i <= pos.i + 1; i++) {
        for (let j = pos.j - 1; j <= pos.j + 1; j++) {
            if (i < 0 || i >= gBoard.length || j < 0 || j >= gBoard[0].length) continue;

            neighbors.push({ i: i, j: j });
        }
    }
    return neighbors;
}

// function getNeighbors(pos) {
//     var neighbors = [];
//     for (let i = pos.i - 1; i <= pos.i + 1; i++) {
//         for (let j = pos.j - 1; j <= pos.j + 1; j++) {
//             if (i < 0 || i >= gBoard.length || j < 0 || j >= gBoard[0].length) continue;
//             if (i === pos.i && j === pos.j) continue; // added condition to check if current cell is not the same as the given cell
//             neighbors.push({ i: i, j: j });
//         }
//     }
//     return neighbors;
// }
