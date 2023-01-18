import GameBoard from "./GameBoard";
const Player = (name, playerNum) => {
    
    let playerBoard = GameBoard();
    let shotBoard = GameBoard();
    let botHitReport = {
        lastHit: false,
        triedDirections: 0, //NESW
        oneStreak: 0,
        totalStreak: 0,
        direction: false,
        ends: 0,
        shipSquares: []

    }
    let opponentShipsAvailable = [5,4,3,3,2]

    function resetBotReport() {
        botHitReport.lastHit = false;
        botHitReport.triedDirections = 0; 
        botHitReport.oneStreak = 0;
        botHitReport.totalStreak = 0;
        botHitReport.direction = false;
        botHitReport.ends = 0;
        botHitReport.shipSquares.splice(0);

    }

    function validSpace(coords, board, direction=false) {
        let i = coords[0];
        let j = coords[1];
        let minimum = Math.min(...opponentShipsAvailable)
        let firstx;
        let firsty;
        let secondx;
        let secondy;
        for (let add = 1; add <= 10 ; add++ ) {
            if (!firsty) {
                if (board[i + add]) {
                    if (board[i + add][j] && (board[i + add][j].hit || !validSquare([i+add, j], board))) {
                        firsty = i + add;
                    }
                } else {
                    firsty = 10;
                }
            }
            if (!secondy) {
                if (board[i - add]) {
                    if (board[i - add][j] && (board[i - add][j].hit || !validSquare([i-add, j], board))) {
                        secondy = i - add + 1;
                    }
                } else {
                    secondy = 0;
                }
            }
            if (!firstx) {
                if (board[i][j + add]) {
                if (board[i][j + add] && (board[i][j + add].hit || !validSquare([i, j+add], board))) {
                    firstx = j + add;
                }
                } else {
                firstx = 10;
                }
            }
            if (!secondx) {
                if (board[i][j - add]) {
                if (board[i][j - add] && (board[i][j - add].hit || !validSquare([i, j - add], board))) {
                    secondx = j - add + 1;
                }
                } else {
                secondx = 0;
                }
            }
        }
        if (direction) {
            if (direction[0] !== 0) {
                if (firsty - secondy < minimum) {
                    return false
                }
            } else if (direction[1] !== 0) {
                if (firstx - secondx < minimum) {
                    return false
                }
            }
        } else {
            
            if (((firstx - secondx) < minimum) && ((firsty - secondy) < minimum)) {
                return false;
            }

        }

        return true
    } 
        
        
    

    function validSquare(coords, board, direction=false) {
        let row = coords[0];
        let column = coords[1];
        let valid = true;
        let allDirections = [[0,1],[0,-1], [1, 0], [-1, 0],[-1, -1],[-1, 1],[1, 1],[1, -1]];
        if (board[row] && board[row][column] && board[row][column].hit) {
            return false
        }

        allDirections.forEach((val) => {
            if (direction) {
                let returnVal = false;
                botHitReport.shipSquares.forEach(square => {
                    if (square[0] == row + val[0] && square[1] == column + val[1]) {
                        returnVal = true;
                    }
                    return
                })
                if (returnVal) {
                    return;
                }
            }
            if (board[row + val[0]] && board[row + val[0]][column + val[1]] && board[row + val[0]][column + val[1]].ship) {
                valid = false;
            }
         });
        return valid; 
    }

    function validHitCoords(board) {
        const returnArr = [];
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                if (!validSquare([i,j], board)) {
                    continue;
                }
                let minimum = Math.min(...opponentShipsAvailable)
                let firstx;
                let firsty;
                let secondx;
                let secondy;
                for (let add = 1; add <= 10 ; add++ ) {
                    if (!firsty) {
                        if (board[i + add]) {
                            if (board[i + add][j] && (board[i + add][j].hit || !validSquare([i+add, j], board))) {
                                firsty = i + add;
                            }
                        } else {
                            firsty = 10;
                        }
                    }
                    if (!secondy) {
                        if (board[i - add]) {
                            if (board[i - add][j] && (board[i - add][j].hit || !validSquare([i-add, j], board))) {
                                secondy = i - add + 1;
                            }
                        } else {
                            secondy = 0;
                        }
                    }
                    if (!firstx) {
                     if (board[i][j + add]) {
                        if (board[i][j + add] && (board[i][j + add].hit || !validSquare([i, j+add], board))) {
                            firstx = j + add;
                        }
                     } else {
                        firstx = 10;
                     }
                    }
                    if (!secondx) {
                     if (board[i][j - add]) {
                        if (board[i][j - add] && (board[i][j - add].hit || !validSquare([i, j - add], board))) {
                            secondx = j - add + 1;
                        }
                     } else {
                        secondx = 0;
                     }
                    }
                }
                
                
                if (((firstx - secondx) < minimum) && ((firsty - secondy) < minimum)) {
                    continue
                }
                
                returnArr.push([i, j]);
            }
        }
        return returnArr;
    }
    function doRandomShot(board) {
        let maximumLength = Math.max(...opponentShipsAvailable)
        if (botHitReport.lastHit) {
            
            if (botHitReport.totalStreak < maximumLength) {
                if (botHitReport.direction) {
                    let boardRow = botHitReport.lastHit[0] + (botHitReport.direction[0] * botHitReport.oneStreak);
                    let boardColumn = botHitReport.lastHit[1] + (botHitReport.direction[1] * botHitReport.oneStreak);
                    if (shotBoard.board[boardRow] && shotBoard.board[boardRow][boardColumn] && !shotBoard.board[boardRow][boardColumn].hit && validSquare([boardRow, boardColumn], shotBoard.board, botHitReport.direction)) {
                        const boardAttack = board.receiveAttack([boardRow, boardColumn]);
                        if (boardAttack) {
                            if (boardAttack  == 'hit') {
                                shotBoard.board[boardRow][boardColumn]['ship'] = true;
                                shotBoard.board[boardRow][boardColumn]['hit'] = true;
                                botHitReport.totalStreak += 1;
                                botHitReport.oneStreak += 1;
                                botHitReport.shipSquares.push([boardRow, boardColumn])
                                return
                            } else {
                                shotBoard.board[boardRow][boardColumn]['hit'] = true;
                                botHitReport.ends += 1;
                                if (botHitReport.ends == 2) {
                                    opponentShipsAvailable.splice(opponentShipsAvailable.indexOf(botHitReport.totalStreak),1);
                                    resetBotReport();

                                } else {
                                    botHitReport.direction = [botHitReport.direction[0] * -1, botHitReport.direction[1] * -1];
                                    botHitReport.oneStreak = 1;
                                }
                                return;
                            }
                        }  
                        
                        return
                    }  else {
                        if (!shotBoard.board[boardRow] || !shotBoard.board[boardRow][boardColumn] || shotBoard.board[boardRow][boardColumn].hit || !validSquare([boardRow, boardColumn], shotBoard.board, botHitReport.direction)) {
                            botHitReport.ends += 1;
                            if (botHitReport.ends == 2) {
                                opponentShipsAvailable.splice(opponentShipsAvailable.indexOf(botHitReport.totalStreak),1);
                                resetBotReport();
                                
                            }
                            botHitReport.direction = [botHitReport.direction[0] * -1, botHitReport.direction[1] * -1];
                            botHitReport.oneStreak = 1;
                            doRandomShot(board);
                            return
                        }
                    }
                } else {
                    let directionTry;
                    switch (botHitReport.triedDirections) {
                        case 0:
                            directionTry = [1,0];
                            break;
                        case 1:
                            directionTry = [0,1];
                            break;
                        case 2:
                            directionTry = [-1, 0];
                            break;
                        case 3:
                            directionTry = [0, -1];
                            break;
                        default:
                            break;
                    }
                    let boardRow = botHitReport.lastHit[0] + directionTry[0];
                    let boardColumn = botHitReport.lastHit[1] + directionTry[1];
                    if (shotBoard.board[boardRow] && shotBoard.board[boardRow][boardColumn] && !shotBoard.board[boardRow][boardColumn].hit && validSquare([boardRow, boardColumn], shotBoard.board, directionTry)) {
                        const boardAttack = board.receiveAttack([boardRow, boardColumn]);
                        if (boardAttack) {
                            if (boardAttack == 'hit') {
                                shotBoard.board[boardRow][boardColumn]['ship'] = true;
                                shotBoard.board[boardRow][boardColumn]['hit'] = true;
                                botHitReport.direction = [...directionTry];
                                botHitReport.oneStreak = 2;
                                botHitReport.totalStreak = 2;
                                botHitReport.shipSquares.push([boardRow, boardColumn]);
                                return
                            } else {
                                
                                shotBoard.board[boardRow][boardColumn]['hit'] = true;
                                botHitReport.triedDirections += 1;
                                return
                            }
                        } else {
                            console.log('Invalid hit.')
                        }

                    } else if (!shotBoard.board[boardRow] || !shotBoard.board[boardRow][boardColumn] || shotBoard.board[boardRow][boardColumn].hit || !validSquare([boardRow, boardColumn], shotBoard.board, directionTry)) {
                        
                        botHitReport.triedDirections += 1;
                        doRandomShot(board);
                        
                        return;
                    }


                }
            } else {
                opponentShipsAvailable.splice(opponentShipsAvailable.indexOf(botHitReport.totalStreak),1);
            }
        }
        resetBotReport();
        const availableHits = validHitCoords(shotBoard.board);
        
        const randomNum = Math.floor(Math.random() * (availableHits.length))
        const coords = availableHits[randomNum];
        const resultShot = board.receiveAttack(coords)
        switch (resultShot) {
            case 'hit':
                console.log('Hit')
                shotBoard.board[coords[0]][coords[1]]['ship'] = true;
                shotBoard.board[coords[0]][coords[1]]['hit'] = true;
                resetBotReport();
                botHitReport.lastHit = [...coords];
                botHitReport.totalStreak += 1;
                botHitReport.oneStreak += 1;
                botHitReport.shipSquares.push([coords[0], coords[1]]);
                break;  
            case 'shot':
                shotBoard.board[coords[0]][coords[1]]['hit'] = true;
                resetBotReport();   
                break;
            default: 
                console.log('uhhhh')
                
        }
        return resultShot;
        
    }
    function doSmartShot(board) {
        doRandomShot(board)
    }

    function playerTurn(coords,enemyBoard) {
        let shot = false;
        return enemyBoard.receiveAttack(coords)
        
        
    }

    return {playerTurn, playerBoard, doRandomShot, name, playerNum, doSmartShot}
}   



export default Player