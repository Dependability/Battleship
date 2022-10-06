import GameBoard from '../modules/GameBoard.js'
const newGameBoard = GameBoard()
newGameBoard.placeShip([0,0], 'x')
test('Game Board Place Ship', ()=> {
    
    return expect(newGameBoard.board[0][0]["ship"]).toBeTruthy()
})


test('Game Board Recieve Attack', ()=> {
    newGameBoard.receiveAttack([0,0])
    return expect(newGameBoard.board[0][0]['hit']).toBe(true)
})

test('Game Board All Ships sunk', ()=> {
    return expect(newGameBoard.reportAllSunk()).toBe(true)
})

test('', ()=> {
    
})
