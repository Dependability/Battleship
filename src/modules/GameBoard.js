import Ship from "./Ship";

const GameBoard = () => {
    /* Instead of keeping the shots in their own array, I have decided
    to keep them on the board, this way you just need to give coords to hit a ship.
    If a ship was missed, then the cell is still shot, and it will do proper DOM if it has to. */


    function validCoords(coords) {
        return (coords[0] >= 0 && coords[0] <= 6 && coords[1] >= 0 && coords[1] <= 6)
    }

    
    const board = []
    for (let i = 0; i < 7; i++) {
        const row = []
        for (let j = 0; j < 7; j++) {
            row.push({hit: false, ship: null})
    }
    board.push(row)


    }
    const ships = []

    function placeShip(coords, rotation='x', length=1) {
        const addLength = rotation == 'x' ? [length - 1, 0] : [0, length - 1];

        if (validCoords(coords) && validCoords([coords[0] + addLength[0], coords[1] + addLength[0]])) {
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

        if (validCoords(coords)) {
            const cell = this.board[coords[0]][coords[1]];
            if (cell['hit'] == false) {
                cell['hit'] = true;
                const cellShip = cell['ship']
                if (cellShip) {
                    cellShip.hit();
                }
                return true
            }
            return false
        }
        return false
    }



    return {board, placeShip, receiveAttack, ships, reportAllSunk}
}





export default GameBoard