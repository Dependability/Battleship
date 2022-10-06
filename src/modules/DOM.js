function createBoard(board) {

    const player = board.className.slice(-1)

    for (let i = 0; i < 7; i++) {
        for (let j = 0; j < 7; j++) {
            const newElem = document.createElement("div");
            newElem.id = `p${player}-${i}-${j}`;
            newElem.classList.add("cell");
            board.appendChild(newElem)
        }
    }
}

function drawBoard(player) {
    let board = player.playerBoard.board;
    let playerNum = player.playerNum;

    
    //Attempt to just loop through and place accordingly
    for (let i = 0; i < 7; i++) {
        for (let j = 0; j < 7; j++) {
            if (board[i][j]['ship']) {
                let shipPart = document.querySelector(`#p${playerNum}-${i}-${j}`);
                shipPart.classList.add('ship');
            }
            if (board[i][j]['hit']) {
                let cell = document.querySelector(`#p${playerNum}-${i}-${j}`);
                cell.classList.add('hit');
            }
              
            
            
        }
    }

    

}


export {createBoard, drawBoard}