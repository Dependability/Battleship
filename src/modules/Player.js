import GameBoard from "./GameBoard";

const Player = (name, playerNum) => {
    
    let playerBoard = GameBoard();
    function doRandomShot(enemy) {
        let shot = false;
        while (!shot) {
            let randomShotX = Math.floor(Math.random() * 10);
            let randomShotY = Math.floor(Math.random() * 10);
            let enemyBoard = enemy.playerBoard;
            const randomShot = enemyBoard.receiveAttack([randomShotX, randomShotY]);
            if (randomShot) {
                shot = true;
                if (randomShot == 'hit') {
                    return {shotHit: true, shot: [randomShotX, randomShotY]}
                }
                return {shotHit: false, shot: null};
            }
        }
    }

    function doSmartShot(enemy, lastHit, triedDirections, direction, length, endsReached) {
        //direction will be [ne, sw]
        console.log('Last hit: ', lastHit);
        console.log('Tried Directions: ', triedDirections)
        console.log('Direction: ', direction)
        console.log('Ends Reached', endsReached)
        console.log('Length', length)
        if (endsReached >= 2 || length >= 5 ) return 'done';
        let enemyBoard = enemy.playerBoard;
        let shot = false;
        if (direction != null && !(direction[0] === 0 && direction[1] === 0)) {
            if (direction[0] != 0) {
                let sentAttack = enemyBoard.receiveAttack([lastHit[0] + direction[0], lastHit[1]]);
                if (sentAttack) {
                    shot = true;
                    if (sentAttack == 'hit') {
                        return {shotHit: true, hit: [lastHit[0] + direction[0], lastHit[1]], direction, endsReached}
                    }
                    if (endsReached == 1) {
                        
                        return 'done';
                    }
                    return {hit: [lastHit[0] + (direction[0] * -(length - 1)), lastHit[1]], direction :[direction[0] * -1, 0], endsReached: +endsReached + 1}
                }
                if (!shot) {
                    console.log('yup..')
                    if (+endsReached == 1) {
                        return 'redo';
                    }
                    if (length < 5) {
                        console.log(lastHit)
                        sentAttack = enemyBoard.receiveAttack([lastHit[0] - (direction[0] * (length)), lastHit[1]]);
                        if (sentAttack) {
                            shot = true;
                            if (sentAttack == 'hit') {
                                return {shotHit: true, hit: [lastHit[0] - (direction[0] * (length )), lastHit[1]], direction: [direction[0] * -1, 0], endsReached: +endsReached + 1}
                            }
                            
                            console.log('survived.')
                        }
                        if (!shot) {
                            console.log('issues')
                            return 'redo'
                        }

                    }else {
                        return 'done';
                    }
                } 

            } else {
                console.log('here')
                console.log(lastHit)
                let sentAttack = enemyBoard.receiveAttack([lastHit[0], lastHit[1]  + direction[1]]);
                if (sentAttack) {
                    shot = true;
                    if (sentAttack =='hit') {
                        return {shotHit: true, hit: [lastHit[0], lastHit[1]  + direction[1]], direction, endsReached: endsReached}
                    }
                    if (endsReached == 1) {
                        return 'done';
                    }
                    return {hit: [lastHit[0], lastHit[1] + (direction[1] * -(length - 1))], direction :[0,direction[1] * -1], endsReached: +endsReached + 1}
                }
                if (!shot) {
                    console.log('yup..')
                    if (+endsReached == 1) {
                        return 'redo';
                    }
                    if (length < 5) {
                        sentAttack = enemyBoard.receiveAttack([lastHit[0] , lastHit[1] - (direction[1] * (length))]);
                        if (sentAttack) {
                            shot = true;
                            if (sentAttack == 'hit') {
                                return {shotHit: true,hit: [lastHit[0] , lastHit[1]- (direction[1] * (length))], direction: [0,direction[1] * -1], endsReached: +endsReached + 1}
                            }

                        }
                        if (!shot) {
                            console.log('issues..')
                            return 'redo'
                        }

                    } else {
                        return 'done';
                    }
                }
            }
            
            
        }

        if (triedDirections[0] == 0) {

            let sentAttack = enemyBoard.receiveAttack([lastHit[0] + 1, lastHit[1]]);
            let triedDirection = [...triedDirections]
            triedDirection[0] = 1;
                console.log('we in?')
            if (sentAttack) {
                shot = true;
                if (sentAttack == 'hit') {
                    
                    return {shotHit: true, hit: [lastHit[0] + 1, lastHit[1]], direction: [1,0], endsReached: triedDirections[2] == 1 ? endsReached + 1 : endsReached}
                }
                console.log('returned')
                return {hit: lastHit, triedDirection, endsReached}
            }
            console.log(triedDirection);
            return this.doSmartShot(enemy, lastHit, triedDirection, null, length, endsReached)
        } else if (triedDirections[2] == 0) {
            let sentAttack = enemyBoard.receiveAttack([lastHit[0] - 1, lastHit[1]]);
            let triedDirection = [...triedDirections]
            triedDirection[2] = 1;
            if (sentAttack) {
                shot = true;
                if (sentAttack == 'hit') {
                    return {shotHit: true, hit: [lastHit[0] - 1, lastHit[1]], direction: [-1,0], endsReached: triedDirections[0] == 1 ? endsReached + 1 : endsReached}
                }
                
                return {hit: lastHit, triedDirection, endsReached}
            }
            console.log(triedDirection);
            return this.doSmartShot(enemy, lastHit, triedDirection, null, length, endsReached)
        }
        else if (triedDirections[1] == 0) {
            let sentAttack = enemyBoard.receiveAttack([lastHit[0], lastHit[1] + 1]);
            let triedDirection = [...triedDirections]
                triedDirection[1] = 1;
            if (sentAttack) {
                shot = true;
                if (sentAttack == 'hit') {
                    return {shotHit: true, hit: [lastHit[0], lastHit[1] + 1], direction: [0,1], endsReached: triedDirections[3] == 1 ? endsReached + 1 : endsReached}
                }
                return {hit: lastHit, triedDirection, endsReached}
            }
            console.log(triedDirection);
            return this.doSmartShot(enemy, lastHit, triedDirection, null, length, endsReached)
        }
        else if (triedDirections[3] == 0) {
            let sentAttack = enemyBoard.receiveAttack([lastHit[0], lastHit[1] - 1]);
            let triedDirection = [...triedDirections]
            triedDirection[3] = 1;
            if (sentAttack) {
                shot = true;
                if (sentAttack == 'hit') {
                    return {shotHit: true, hit: [lastHit[0], lastHit[1] -1], direction: [0,-1], endsReached: triedDirections[1] == 1 ? endsReached + 1 : endsReached}
                }
                
                return {hit: lastHit, triedDirection, endsReached}
            }
            console.log(triedDirection);
            return this.doSmartShot(enemy, lastHit, triedDirection, null, length, endsReached)

        }
        return 'done';

    }

    function playerTurn(coords,enemyBoard) {
        let shot = false;
        return enemyBoard.receiveAttack(coords)
        
        
    }

    return {playerTurn, playerBoard, doRandomShot, name, playerNum, doSmartShot}
}   



export default Player