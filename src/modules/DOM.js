/*One worry one might see is that the coordinates are not in traditional 
x and y, it is instead row and column. Keep that in mind */
function createBoard(board) {

    const player = board.className.slice(-1)

    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            const newElem = document.createElement("div");
            newElem.id = `p${player}-${i}-${j}`;
            newElem.classList.add("cell");
            board.appendChild(newElem)
        }
    }
}

function drawBoard(player, hidden=false) {
    let board = player.playerBoard.board;
    let playerNum = player.playerNum;

    
    //Attempt to just loop through and place accordingly
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            if (board[i][j]['ship'] && !(hidden)) {
                let shipPart = document.querySelector(`#p${playerNum}-${i}-${j}`);
                shipPart.classList.add('ship');
            }
            if (board[i][j]['hit']) {
                let cell = document.querySelector(`#p${playerNum}-${i}-${j}`);
                cell.classList.add('hit');
                if (board[i][j]['ship'] && (hidden)) {
                    cell.classList.add('ship');
                }
            }
              
            
            
        }
    }

    

}


export {createBoard, drawBoard}