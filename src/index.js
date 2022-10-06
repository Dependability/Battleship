import {createBoard, drawBoard} from './modules/DOM.js'
import Player from './modules/Player.js'


const MODE = "BOT";

let board1 = document.querySelector('.board-1');
let board2 = document.querySelector('.board-2');

createBoard(board1);
createBoard(board2);

let gameEnd = false;
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

player1.playerBoard.placeShip([2, 2], 'y', 3);
player1.playerBoard.placeShip([0,4], 'x', 3);

player2.playerBoard.placeShip([2, 2], 'y', 3);
player2.playerBoard.placeShip([0,4], 'x', 3);


drawBoard(player1);
drawBoard(player2);


let enemyBoard = document.querySelectorAll(".board-2 .cell")
enemyBoard.forEach((elem) => {
    elem.addEventListener('click', (e)=> {
        if (playerTurn != 0 ) {
            return
        }

        let id = elem.getAttribute('id');
        let row = id.charAt(3);
        let column = id.charAt(5);
        console.log(row, column)
        if (player1.playerTurn([+row, +column], player2.playerBoard)) {
            playerTurn = 1;
            drawBoard(player2);
            if (player2.playerBoard.reportAllSunk()) {
                console.log("NICE YOU WIN!!")
                playerTurn = 100;
                return
            }

            if (MODE == 'BOT') {
                player2.doRandomShot(player1);
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

console.log("Wa ")


