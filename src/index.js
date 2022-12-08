import {createBoard, drawBoard} from './modules/DOM.js'
import Player from './modules/Player.js'



const shipSize = {carrier: 5, battleship: 4, submarine: 3, 'patrol-boat': 2, destroyer: 3, none: 0};
const MODE = "BOT";

let board1 = document.querySelector('.board-1');
let board2 = document.querySelector('.board-2');

createBoard(board1);
createBoard(board2);

let gameEvent = 'start';
let player1;
let player2;
let playerTurn = 0;

switch (MODE) {
    case 'PVP':
        break;
    default:
        player1 = Player("Chad", 1);
        player2 = Player("BOT", 2);
}

// player1.playerBoard.placeShip([2, 2], 'y', 3);
// player1.playerBoard.placeShip([0,4], 'x', 3);

// player2.playerBoard.placeShip([2, 2], 'y', 3);
// player2.playerBoard.placeShip([0,4], 'x', 3);
// player1.doRandomShot(player2);

// drawBoard(player1);
// drawBoard(player2);

//CPU GAME.
/* Order of events:
    1. Start Button
    2. Select Positions.
    3. Start game.
    4. Play game.
    5. Restart Button
*/
let gameStartBtn = document.querySelector('.game-start-button');
let selectMenu = document.querySelector('.select-position');
let selectShipsLi = document.querySelectorAll('.select-ship');
const selectBoard = selectMenu.querySelector('.select-board');
const rotateButton = document.querySelector('.rotate-ship');
const mainGameContainer = document.querySelector('.board-container')
let selectBoardCells = [];
let selectedShip = 'none';
let rotation = 'x';
let selectedShipsLeft = 5;
let selectDoneBtn = document.querySelector('.select-done-button')
const selectPlayer = Player('Select', 'd');
//Start Button
gameStartBtn.addEventListener('click', ()=> {
    gameStartBtn.classList.add('hidden');
    gameEvent = 'selectPos';
    //Show Select
    
    createBoard(selectBoard);
    let selectBoardCells = selectBoard.querySelectorAll('.cell')
    selectBoardCells.forEach((val)=> {
        const row = val.id.charAt(3);
            const column = val.id.charAt(5);
        val.addEventListener('mouseover', ()=> {
            
            
            for (let i = 0; i < shipSize[selectedShip]; i++) {
                const rotationAdd = rotation == 'x' ? [0, i] : [i, 0];
                const otherCell = document.querySelector(`#pd-${+row + rotationAdd[0]}-${+column+ rotationAdd[1]}`)
                if (selectPlayer.playerBoard.validCoords([+row, +column], shipSize[selectedShip], rotation)) {
                    otherCell ? otherCell.classList.add('valid') :'none';
                } else {
                
                otherCell ? otherCell.classList.add('invalid') : 'none';
            }

            }
        })
        val.addEventListener('mouseleave', ()=> {
            for (let i = 0; i < shipSize[selectedShip]; i++) {
                const rotationAdd = rotation == 'x' ? [0, i] : [i, 0]
                const otherCell = document.querySelector(`#pd-${+row + rotationAdd[0]}-${+column+ rotationAdd[1]}`)
                if (otherCell) {
                    otherCell.classList.remove('invalid')
                    otherCell.classList.remove('valid')
                }
            }
        })
    });
    selectMenu.classList.remove('hidden');

     
});
//Select Position


selectShipsLi.forEach((val) => {
    val.addEventListener('click', (e)=> {
        if  (gameEvent == 'selectPos' && selectedShip == 'none') {
            selectedShip = val.classList[0];
            val.classList.add('hidden')
        }   
    })
});


selectBoard.addEventListener('click', (e) => {
    //using bubbling.
    const row = e.target.id.charAt(3);
    const column = e.target.id.charAt(5);
    if (gameEvent == 'selectPos') {
        switch (selectedShip) {
            case 'none': 
                return;
            default:
                if (player1.playerBoard.placeShip([+row, +column], rotation, shipSize[selectedShip])) {
                    selectPlayer.playerBoard.placeShip([+row, +column], rotation, shipSize[selectedShip]);
                    selectedShip = 'none';
                    rotation = 'x'; 
                    drawBoard(selectPlayer);
                    selectedShipsLeft--;
                    if (selectedShipsLeft == 0) {
                        selectDoneBtn.classList.remove('hidden')
                    }
                }
                
        }
    }
})




rotateButton.addEventListener('click', ()=> {
    rotation = rotation == 'x' ? 'y' : 'x';
})

selectDoneBtn.addEventListener('click', ()=> {
    gameEvent = 'playing';
    selectMenu.classList.add('hidden');
    drawBoard(player1);
    player2.playerBoard.createRandomBoard();
    mainGameContainer.classList.remove('hidden')
})


let shotLength = 0;
let result = {shotHit: false, triedDirection: [0,0,0,0], endsReached: 0, direction: [0,0] }
let firstResult;
let enemyBoard = document.querySelectorAll(".board-2 .cell")
enemyBoard.forEach((elem) => {
    elem.addEventListener('click', (e)=> {
        if (playerTurn != 0 ) {
            return
        }

        let id = elem.getAttribute('id');
        let row = id.charAt(3);
        let column = id.charAt(5);
        if (player1.playerTurn([+row, +column], player2.playerBoard)) {
            playerTurn = 1;
            drawBoard(player2, true);
            if (player2.playerBoard.reportAllSunk()) {
                console.log("NICE YOU WIN!!")
                playerTurn = 100;
                return
            }

            if (MODE == 'BOT') {
                if (shotLength > 0 && shotLength < 5) {
                    if (result == 'done') {
                        shotLength = 0;
                        result = {shotHit: false, triedDirection: [0,0,0,0], endsReached: 0, direction: [0,0] };

                    } else {
                        console.log(shotLength)
                        console.log('Shot Length above me.')
                        result = player2.doSmartShot(player1, result.hit, result.triedDirection, result.direction, shotLength, result.endsReached);
                        console.log('result: ', result)
                        if (result == 'redo') {
                            shotLength = 0;
                            result = {shotHit: false, triedDirection: [0,0,0,0], endsReached: 0, direction: [0,0] };
                            firstResult = player2.doRandomShot(player1);
                        }
                    }
                    

                    
                } 

                else if (shotLength == 0 || shotLength >= 5 ) {
                    shotLength = 0;
                    firstResult = player2.doRandomShot(player1);
                }
                
                if (result.shotHit || firstResult.shotHit) {
                    shotLength += 1;
                    console.log('we got a hit!')
                    if (firstResult.shotHit) {
                        result.hit = [...firstResult.shot];
                        console.log(result.hit)
                        console.log(shotLength)
                    }
                    firstResult.shotHit = false;

                }
                playerTurn = 0;
                drawBoard(player1);
                if (player1.playerBoard.reportAllSunk()) {
                    console.log("YOU LOSE!")
                    playerTurn = 100;
                    return
                }
            }

            

        }
    }
    )
})



