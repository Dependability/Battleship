import {createBoard, drawBoard} from './modules/DOM.js'
import Player from './modules/Player.js'



const shipSize = {carrier: 5, battleship: 4, submarine: 3, 'patrol-boat': 2, destroyer: 3, none: 0};
let MODE = 'BOT';

let board1 = document.querySelector('.board-1');
let board2 = document.querySelector('.board-2');


let gameEvent = 'start';
let player1;
let player2;
let playerTurn = 0;


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
let gameStartScrn = document.querySelector('.game-start-screen');
let gameStartBtn = document.querySelector('.game-start-button');
let selectMenu = document.querySelector('.select-position');
let selectShipsLi = document.querySelectorAll('.select-ship');
const selectBoard = selectMenu.querySelector('.select-board');
const rotateButton = document.querySelector('.rotate-ship');
const mainGameContainer = document.querySelector('.board-container');
const formName = document.querySelector('.player-name-screen form') ;
const playerNameScreen = document.querySelector('.player-name-screen');
const restartGameScreen = document.querySelector('.restart-screen');
const restartGame = restartGameScreen.querySelector('button')
let selectedShip = 'none';
let rotation = 'x';
let selectedShipsLeft = 5;
let selectDoneBtn = document.querySelector('.select-done-button')
const selectPlayer = Player('Select', 'd');
let shotLength = 0;
let result = {shotHit: false, triedDirection: [0,0,0,0], endsReached: 0, direction: [0,0] }
let firstResult;
let resultOutput = restartGameScreen.querySelector('.result');

restartGame.addEventListener('click', ()=> {
    restartGameScreen.classList.add('hidden');
    gameEvent = 'start';
    mainGameContainer.classList.add('hidden');
    gameStartScrn.classList.remove('hidden');
    selectPlayer.playerBoard.clearBoard();
    selectBoard.innerHTML = '';
    board1.innerHTML = '';
    board2.innerHTML = '';
    playerTurn = 0;
    selectedShipsLeft = 5;
    selectShipsLi.forEach((val) => {
        val.classList.remove('hidden');
    })
    selectDoneBtn.classList.add('hidden')
    shotLength = 0;
    firstResult = null;
    result = {shotHit: false, triedDirection: [0,0,0,0], endsReached: 0, direction: [0,0] };
    
})

function enemyClick(e, elem) {
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
            resultOutput.textContent = 'You win!';
            restartGameScreen.classList.remove('hidden')
            playerTurn = 100;
            return
        }

        if (MODE == 'BOT') {
            player2.doRandomShot(player1.playerBoard);
            playerTurn = 0;
            drawBoard(player1);
            if (player1.playerBoard.reportAllSunk()) {
                resultOutput.textContent = 'You Lose.';
                restartGameScreen.classList.remove('hidden')
                //Remove enemy board
                drawBoard(player2)
                playerTurn = 100;
                return
            }
        }

        

    }
}

function selectGameMode(e) {
    const screen = document.querySelector('.mode-select-screen');
    //Hide previous screen
    gameStartScrn.classList.add('hidden');
    createBoard(board1);
    createBoard(board2);
    
    let enemyBoard = document.querySelectorAll(".board-2 .cell");
    enemyBoard.forEach((elem) => {
        elem.addEventListener('click', () => {enemyClick(e, elem)})
    })

    //Show Screen
    screen.classList.remove('hidden');
    //Button pressed is mode
    const optionButtons = screen.querySelectorAll('.options .BOT');
    optionButtons.forEach((val) => {
        const modeSelectFunction = (e)=> {
            MODE = e.currentTarget.classList[0];
            console.log(MODE)
            screen.classList.add('hidden');
            optionButtons.forEach((val) => {
                val.removeEventListener('click',modeSelectFunction);
            })
            //Show player name screen
            switch (MODE) {
                case 'PVP':
                    return;
                default:
                    playerNameScreen.classList.remove('hidden');


            }
        }
        val.addEventListener('click', modeSelectFunction);
    })
}

function playerNameSelect(e) {
    //Use switch or if statement for PVP
    e.preventDefault();
    if (e.target.checkValidity()) {
        console.log(e.currentTarget.player1.value)
        player1 = Player(e.currentTarget.player1.value, 1);
        player2 = Player('BOT', 2)
        playerNameScreen.classList.add('hidden');
        selectMenu.classList.remove('hidden');
        selectShipsFunct()
    }
    

}

formName.addEventListener('submit', playerNameSelect);

const rotate = (e) => {
    rotation = rotation == 'x' ? 'y' : 'x';
    let selectBoardCells = selectBoard.querySelectorAll('.cell')
    selectBoardCells.forEach((val) => {
        val.classList.remove('valid')
        val.classList.remove('invalid')
    })
}

const selectShipsFunct = (e)=> {
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

     
}
gameStartBtn.addEventListener('click', selectGameMode);
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


document.addEventListener('keypress', (e)=> {
    if (e.key === 'r') {
        rotate();
    }
})
rotateButton.addEventListener('click', rotate)

const rotateSvg = rotateButton.querySelector('svg');
rotateButton.addEventListener('mouseover', ()=> {
    rotateSvg.classList.add('hovered');
})
rotateButton.addEventListener('mouseleave', ()=> {
    rotateSvg.classList.remove('hovered');
})

selectDoneBtn.addEventListener('click', ()=> {
    gameEvent = 'playing';
    selectMenu.classList.add('hidden');
    drawBoard(player1);
    player2.playerBoard.createRandomBoard();
    const board1Name =  document.querySelector('.board-1-wrap .name')
    const board2Name =  document.querySelector('.board-2-wrap .name')
    board1Name.textContent = player1.name.slice(-1).toLowerCase() == 's' ? player1.name + "' Board" : player1.name + "'s Board";
    board2Name.textContent = player2.name.slice(-1).toLowerCase() == 's' ? player2.name + "' Board" : player2.name + "'s Board";
    mainGameContainer.classList.remove('hidden');
})








