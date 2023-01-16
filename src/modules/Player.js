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
        ends: 0

    }
    let opponentShipsAvailable = [5,4,3,3,2]

    function resetBotReport() {
        botHitReport.lastHit = false;
        botHitReport.triedDirections = 0; 
        botHitReport.oneStreak = 0;
        botHitReport.totalStreak = 0;
        botHitReport.direction = false;
        botHitReport.ends = 0;

    }

    function validHitCoords(board) {
        const returnArr = [];
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                if (board[i][j].hit) {
                    continue;
                }
                //Check if the square has a ship around it.

                if (board[i][j + 1] && board[i][j+1].ship) {
                    continue;
                }
                if (board[i][j - 1] && board[i][j-1].ship) {
                    continue
                }
                if (board[i - 1]) {
                    if (board[i -1][j] && board[i-1][j].ship) {
                        continue
                    }
                    if (board[i-1][j-1] && board[i-1][j-1].ship) {
                        continue
                    }
                    if (board[i-1][j+1] && board[i-1][j+1].ship) {
                        continue
                    }
                }
                if (board[i + 1]) {
                    if (board[i +1][j] && board[i+1][j].ship) {
                        continue
                    }
                    if (board[i+1][j-1] && board[i+1][j-1].ship) {
                        continue
                    }
                    if (board[i+1][j+1] && board[i+1][j+1].ship) {
                        continue
                    }
                }
                let minimum = Math.min(...opponentShipsAvailable)
                let breakEach = false;
                let firstx;
                let firsty;
                let secondx;
                let secondy;
                for (let add = 1; add <= 10 ; add++ ) {
                    if (!firsty) {
                        if (board[i + add]) {
                            if (board[i + add][j] && board[i + add][j].hit) {
                                firsty = i + add;
                            }
                        } else {
                            firsty = 10;
                        }
                    }
                    if (!secondy) {
                        if (board[i - add]) {
                            if (board[i - add][j] && board[i - add][j].hit) {
                                secondy = i - add;
                            }
                        } else {
                            secondy = 0;
                        }
                    }
                    if (!firstx) {
                     if (board[i][j + add]) {
                        if (board[i][j + add] && board[i][j + add].hit) {
                            firstx = j + add
                        }
                     } else {
                        firstx = 10;
                     }
                    }
                    if (!secondx) {
                     if (board[i][j - add]) {
                        if (board[i][j - add] && board[i][j - add].hit) {
                            secondx = j - add;
                        }
                     } else {
                        secondx = 0;
                     }
                    }
                }
                
            
                if (((firstx - secondx - 1) < minimum) && ((firsty - secondy - 1) < minimum)) {

                    continue
                }

                returnArr.push([i, j]);
            }
        }
        return returnArr;
    }
    function doRandomShot(board) {
        let maximumLength = Math.max(...opponentShipsAvailable)
        console.log(botHitReport)
        console.log(opponentShipsAvailable)
        if (botHitReport.lastHit) {
            
            if (botHitReport.totalStreak < maximumLength) {
                if (botHitReport.direction) {
                    let boardRow = botHitReport.lastHit[0] + (botHitReport.direction[0] * botHitReport.oneStreak);
                    let boardColumn = botHitReport.lastHit[1] + (botHitReport.direction[1] * botHitReport.oneStreak);
                    if (shotBoard.board[boardRow] && shotBoard.board[boardRow][boardColumn] && !shotBoard.board[boardRow][boardColumn].hit) {
                        const boardAttack = board.receiveAttack([boardRow, boardColumn]);
                        if (boardAttack) {
                            if (boardAttack  == 'hit') {
                                shotBoard.board[boardRow][boardColumn]['ship'] = true;
                                shotBoard.board[boardRow][boardColumn]['hit'] = true;
                                botHitReport.totalStreak += 1;
                                botHitReport.oneStreak += 1;
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
                        if (!shotBoard.board[boardRow] || !shotBoard.board[boardRow][boardColumn] || shotBoard.board[boardRow][boardColumn].hit) {
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
                    if (shotBoard.board[boardRow] && shotBoard.board[boardRow][boardColumn] && !shotBoard.board[boardRow][boardColumn].hit) {
                        const boardAttack = board.receiveAttack([boardRow, boardColumn]);
                        if (boardAttack) {
                            if (boardAttack == 'hit') {
                                shotBoard.board[boardRow][boardColumn]['ship'] = true;
                                shotBoard.board[boardRow][boardColumn]['hit'] = true;
                                botHitReport.direction = [...directionTry];
                                botHitReport.oneStreak = 2;
                                botHitReport.totalStreak = 2;
                                return
                            } else {
                                
                                shotBoard.board[boardRow][boardColumn]['hit'] = true;
                                botHitReport.triedDirections += 1;
                                return
                            }
                        } else {
                            console.log('Invalid hit.')
                        }

                    } else if (!shotBoard.board[boardRow] || !shotBoard.board[boardRow][boardColumn] || shotBoard.board[boardRow][boardColumn].hit) {
                        
                        botHitReport.triedDirections += 1;
                        console.log('yup cant go that way, go again!')
                        doRandomShot(board);
                        
                        return;
                    }


                }
            } else {
                opponentShipsAvailable.splice(opponentShipsAvailable.indexOf(botHitReport.totalStreak),1);
            }
        }
        const availableHits = validHitCoords(shotBoard.board);
        
        const randomNum = Math.floor(Math.random() * (availableHits.length))
        const coords = availableHits[randomNum];
        console.log('Shot random at :', coords)
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