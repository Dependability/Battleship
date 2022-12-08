import Ship from "./Ship";

const GameBoard = () => {
    /* Instead of keeping the shots in their own array, I have decided
    to keep them on the board, this way you just need to give coords to hit a ship.
    If a ship was missed, then the cell is still shot, and it will do proper DOM if it has to. */
    
    const board = []
    for (let i = 0; i < 10; i++) {
        const row = []
        for (let j = 0; j < 10; j++) {
            row.push({hit: false, ship: null})
    }
    board.push(row)


    }
    const ships = []

    function validCoords(coords, length, rotation) {
        //check if not on top of a ship
        const row = +coords[0];
        const column = +coords[1];
        for (let i = 0; i < length; i++) {
            let rotationAdd = rotation == 'x' ? [0, +i] : [+i, 0];
            if (board[row + rotationAdd[0]] == undefined|| board[row + rotationAdd[0]][column + rotationAdd[1]] == undefined) {
                return false
            }
            for (let add = -1; add <= 1; add++) {
                if (board[row + rotationAdd[0]]&&board[row + rotationAdd[0]][column + rotationAdd[1] + add]) {
                    if (board[row + rotationAdd[0]][column + rotationAdd[1] + add].ship) {
                        return false;
                    }
                }
                if (board[+row+rotationAdd[0] + add]&&board[+row+rotationAdd[0] + add][+column + rotationAdd[1]]) {
                    if (board[+row+rotationAdd[0] + add][+column + rotationAdd[1]].ship) {
                        return false;
                    }
                }
                if (board[+row + rotationAdd[0] + add]&&board[+row + rotationAdd[0] + add][+column + rotationAdd[1] + add]) {
                    if (board[+row + rotationAdd[0] + add][+column + rotationAdd[1] + add].ship) {
                        
                        return false
                    }
                }

                if (board[+row + rotationAdd[0] - add] && board[+row + rotationAdd[0] - add][+column + rotationAdd[1] + add]) {
                    if (board[+row + rotationAdd[0] - add][+column + rotationAdd[1] + add].ship) {
                        
                        return false
                    }
                } 
            }

        
        }
        //check if not directly close to one WIP
        /* to increase performance, it would be best to use the same loop from above */
        //check if within board
        if (coords[0] < 0 || coords[0] > 9 || coords[1] < 0 || coords[1] > 9) {
            return false
        }
        return true
        
    }

    function inBoard(coords) {
        return !(coords[0] < 0 || coords[0] > 9 || coords[1] < 0 || coords[1] > 9);
    }

    function placeShip(coords, rotation='x', length=1) {
        const addLength = rotation == 'x' ? [length - 1, 0] : [0, length - 1];

        if (validCoords(coords, length, rotation)) {
            const ship = Ship(length);
            this.ships.push(ship);
            for (let i = 0; i < ship.length; i++) {
                let x = addLength[0] ? i : 0;
                let y = addLength[1] ? i : 0;
                this.board[coords[0] + y][coords[1] + x]["ship"] = ship;

            }
            return true
        }
        return false  
    }

    function reportAllSunk() {
        return this.ships.every((elem) => elem.isSunk());
    }

    function receiveAttack(coords) {

        if (inBoard(coords)) {
            const cell = this.board[coords[0]][coords[1]];
            if (cell['hit'] == false) {
                cell['hit'] = true;
                const cellShip = cell['ship']
                if (cellShip) {
                    cellShip.hit();
                    return 'hit'
                }
                return 'shot'
            }
            return false
        }
        return false
    }

    function createRandomBoard() {
        [5,3,3,4,2].forEach((val)=> {
            let placedShip = this.placeShip([Math.floor(Math.random() * 10), Math.floor(Math.random()* 10)], ['x','y'][Math.floor(Math.random() * 2)], val);
        
            while (!(placedShip)) {
                placedShip = this.placeShip([Math.floor(Math.random() * 10), Math.floor(Math.random()* 10)], ['x','y'][Math.floor(Math.random() * 2)], val);  
            }

        })
    }



    return {board, placeShip, receiveAttack, ships, reportAllSunk, validCoords, createRandomBoard}
}





export default GameBoard