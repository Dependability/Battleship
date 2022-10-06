import GameBoard from "./GameBoard";

const Player = (name, playerNum) => {
    
    let playerBoard = GameBoard();
    function doRandomShot(enemy) {
        let shot = false;
        while (!shot) {
            let randomShotX = Math.floor(Math.random() * 7);
            let randomShotY = Math.floor(Math.random() * 7);
            let enemyBoard = enemy.playerBoard;
            if (enemyBoard.receiveAttack([randomShotX, randomShotY])) {
                shot = true;
            }
        }
    }

    function playerTurn(coords,enemyBoard) {
        let shot = false;
        return enemyBoard.receiveAttack(coords)
        
        
    }

    return {playerTurn, playerBoard, doRandomShot, name, playerNum}
}   



export default Player