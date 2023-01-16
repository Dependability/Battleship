/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _modules_DOM_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/DOM.js */ \"./src/modules/DOM.js\");\n/* harmony import */ var _modules_Player_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/Player.js */ \"./src/modules/Player.js\");\n\n\n\n\n\nconst shipSize = {carrier: 5, battleship: 4, submarine: 3, 'patrol-boat': 2, destroyer: 3, none: 0};\nlet MODE = 'BOT';\n\nlet board1 = document.querySelector('.board-1');\nlet board2 = document.querySelector('.board-2');\n\n\nlet gameEvent = 'start';\nlet player1;\nlet player2;\nlet playerTurn = 0;\n\n\n// player1.playerBoard.placeShip([2, 2], 'y', 3);\n// player1.playerBoard.placeShip([0,4], 'x', 3);\n\n// player2.playerBoard.placeShip([2, 2], 'y', 3);\n// player2.playerBoard.placeShip([0,4], 'x', 3);\n// player1.doRandomShot(player2);\n\n// drawBoard(player1);\n// drawBoard(player2);\n\n//CPU GAME.\n/* Order of events:\n    1. Start Button\n    2. Select Positions.\n    3. Start game.\n    4. Play game.\n    5. Restart Button\n*/\nlet gameStartScrn = document.querySelector('.game-start-screen');\nlet gameStartBtn = document.querySelector('.game-start-button');\nlet selectMenu = document.querySelector('.select-position');\nlet selectShipsLi = document.querySelectorAll('.select-ship');\nconst selectBoard = selectMenu.querySelector('.select-board');\nconst rotateButton = document.querySelector('.rotate-ship');\nconst mainGameContainer = document.querySelector('.board-container');\nconst formName = document.querySelector('.player-name-screen form') ;\nconst playerNameScreen = document.querySelector('.player-name-screen');\nconst restartGameScreen = document.querySelector('.restart-screen');\nconst restartGame = restartGameScreen.querySelector('button')\nlet selectedShip = 'none';\nlet rotation = 'x';\nlet selectedShipsLeft = 5;\nlet selectDoneBtn = document.querySelector('.select-done-button')\nconst selectPlayer = (0,_modules_Player_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])('Select', 'd');\nlet shotLength = 0;\nlet result = {shotHit: false, triedDirection: [0,0,0,0], endsReached: 0, direction: [0,0] }\nlet firstResult;\nlet resultOutput = restartGameScreen.querySelector('.result');\n\nrestartGame.addEventListener('click', ()=> {\n    restartGameScreen.classList.add('hidden');\n    gameEvent = 'start';\n    mainGameContainer.classList.add('hidden');\n    gameStartScrn.classList.remove('hidden');\n    selectPlayer.playerBoard.clearBoard();\n    selectBoard.innerHTML = '';\n    board1.innerHTML = '';\n    board2.innerHTML = '';\n    playerTurn = 0;\n    selectedShipsLeft = 5;\n    selectShipsLi.forEach((val) => {\n        val.classList.remove('hidden');\n    })\n    selectDoneBtn.classList.add('hidden')\n    shotLength = 0;\n    firstResult = null;\n    result = {shotHit: false, triedDirection: [0,0,0,0], endsReached: 0, direction: [0,0] };\n    \n})\n\nfunction enemyClick(e, elem) {\n    if (playerTurn != 0 ) {\n        return\n    }\n    let id = elem.getAttribute('id');\n    let row = id.charAt(3);\n    let column = id.charAt(5);\n    if (player1.playerTurn([+row, +column], player2.playerBoard)) {\n        playerTurn = 1;\n        (0,_modules_DOM_js__WEBPACK_IMPORTED_MODULE_0__.drawBoard)(player2, true);\n        if (player2.playerBoard.reportAllSunk()) {\n            resultOutput.textContent = 'You win!';\n            restartGameScreen.classList.remove('hidden')\n            playerTurn = 100;\n            return\n        }\n\n        if (MODE == 'BOT') {\n            player2.doRandomShot(player1.playerBoard);\n            playerTurn = 0;\n            (0,_modules_DOM_js__WEBPACK_IMPORTED_MODULE_0__.drawBoard)(player1);\n            if (player1.playerBoard.reportAllSunk()) {\n                resultOutput.textContent = 'You Lose.';\n                restartGameScreen.classList.remove('hidden')\n                //Remove enemy board\n                ;(0,_modules_DOM_js__WEBPACK_IMPORTED_MODULE_0__.drawBoard)(player2)\n                playerTurn = 100;\n                return\n            }\n        }\n\n        \n\n    }\n}\n\nfunction selectGameMode(e) {\n    const screen = document.querySelector('.mode-select-screen');\n    //Hide previous screen\n    gameStartScrn.classList.add('hidden');\n    (0,_modules_DOM_js__WEBPACK_IMPORTED_MODULE_0__.createBoard)(board1);\n    (0,_modules_DOM_js__WEBPACK_IMPORTED_MODULE_0__.createBoard)(board2);\n    \n    let enemyBoard = document.querySelectorAll(\".board-2 .cell\");\n    enemyBoard.forEach((elem) => {\n        elem.addEventListener('click', () => {enemyClick(e, elem)})\n    })\n\n    //Show Screen\n    screen.classList.remove('hidden');\n    //Button pressed is mode\n    const optionButtons = screen.querySelectorAll('.options .BOT');\n    optionButtons.forEach((val) => {\n        const modeSelectFunction = (e)=> {\n            MODE = e.currentTarget.classList[0];\n            console.log(MODE)\n            screen.classList.add('hidden');\n            optionButtons.forEach((val) => {\n                val.removeEventListener('click',modeSelectFunction);\n            })\n            //Show player name screen\n            switch (MODE) {\n                case 'PVP':\n                    return;\n                default:\n                    playerNameScreen.classList.remove('hidden');\n\n\n            }\n        }\n        val.addEventListener('click', modeSelectFunction);\n    })\n}\n\nfunction playerNameSelect(e) {\n    //Use switch or if statement for PVP\n    e.preventDefault();\n    if (e.target.checkValidity()) {\n        console.log(e.currentTarget.player1.value)\n        player1 = (0,_modules_Player_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(e.currentTarget.player1.value, 1);\n        player2 = (0,_modules_Player_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])('BOT', 2)\n        playerNameScreen.classList.add('hidden');\n        selectMenu.classList.remove('hidden');\n        selectShipsFunct()\n    }\n    \n\n}\n\nformName.addEventListener('submit', playerNameSelect);\n\nconst rotate = (e) => {\n    rotation = rotation == 'x' ? 'y' : 'x';\n    let selectBoardCells = selectBoard.querySelectorAll('.cell')\n    selectBoardCells.forEach((val) => {\n        val.classList.remove('valid')\n        val.classList.remove('invalid')\n    })\n}\n\nconst selectShipsFunct = (e)=> {\n    gameEvent = 'selectPos';\n    //Show Select\n    \n    (0,_modules_DOM_js__WEBPACK_IMPORTED_MODULE_0__.createBoard)(selectBoard);\n    let selectBoardCells = selectBoard.querySelectorAll('.cell')\n    selectBoardCells.forEach((val)=> {\n        const row = val.id.charAt(3);\n            const column = val.id.charAt(5);\n        val.addEventListener('mouseover', ()=> {\n            \n            \n            for (let i = 0; i < shipSize[selectedShip]; i++) {\n                const rotationAdd = rotation == 'x' ? [0, i] : [i, 0];\n                const otherCell = document.querySelector(`#pd-${+row + rotationAdd[0]}-${+column+ rotationAdd[1]}`)\n                if (selectPlayer.playerBoard.validCoords([+row, +column], shipSize[selectedShip], rotation)) {\n                    otherCell ? otherCell.classList.add('valid') :'none';\n                } else {\n                \n                otherCell ? otherCell.classList.add('invalid') : 'none';\n            }\n\n            }\n        })\n        val.addEventListener('mouseleave', ()=> {\n            for (let i = 0; i < shipSize[selectedShip]; i++) {\n                const rotationAdd = rotation == 'x' ? [0, i] : [i, 0]\n                const otherCell = document.querySelector(`#pd-${+row + rotationAdd[0]}-${+column+ rotationAdd[1]}`)\n                if (otherCell) {\n                    otherCell.classList.remove('invalid')\n                    otherCell.classList.remove('valid')\n                }\n            }\n        })\n    });\n    selectMenu.classList.remove('hidden');\n\n     \n}\ngameStartBtn.addEventListener('click', selectGameMode);\n//Select Position\n\n\nselectShipsLi.forEach((val) => {\n    val.addEventListener('click', (e)=> {\n        if  (gameEvent == 'selectPos' && selectedShip == 'none') {\n            selectedShip = val.classList[0];\n            val.classList.add('hidden')\n        }   \n    })\n});\n\n\nselectBoard.addEventListener('click', (e) => {\n    //using bubbling.\n    const row = e.target.id.charAt(3);\n    const column = e.target.id.charAt(5);\n    if (gameEvent == 'selectPos') {\n        switch (selectedShip) {\n            case 'none': \n                return;\n            default:\n                if (player1.playerBoard.placeShip([+row, +column], rotation, shipSize[selectedShip])) {\n                    selectPlayer.playerBoard.placeShip([+row, +column], rotation, shipSize[selectedShip]);\n                    selectedShip = 'none';\n                    rotation = 'x'; \n                    (0,_modules_DOM_js__WEBPACK_IMPORTED_MODULE_0__.drawBoard)(selectPlayer);\n                    selectedShipsLeft--;\n                    if (selectedShipsLeft == 0) {\n                        selectDoneBtn.classList.remove('hidden')\n                    }\n                }\n                \n        }\n    }\n})\n\n\ndocument.addEventListener('keypress', (e)=> {\n    if (e.key === 'r') {\n        rotate();\n    }\n})\nrotateButton.addEventListener('click', rotate)\n\nconst rotateSvg = rotateButton.querySelector('svg');\nrotateButton.addEventListener('mouseover', ()=> {\n    rotateSvg.classList.add('hovered');\n})\nrotateButton.addEventListener('mouseleave', ()=> {\n    rotateSvg.classList.remove('hovered');\n})\n\nselectDoneBtn.addEventListener('click', ()=> {\n    gameEvent = 'playing';\n    selectMenu.classList.add('hidden');\n    (0,_modules_DOM_js__WEBPACK_IMPORTED_MODULE_0__.drawBoard)(player1);\n    player2.playerBoard.createRandomBoard();\n    const board1Name =  document.querySelector('.board-1-wrap .name')\n    const board2Name =  document.querySelector('.board-2-wrap .name')\n    board1Name.textContent = player1.name.slice(-1).toLowerCase() == 's' ? player1.name + \"' Board\" : player1.name + \"'s Board\";\n    board2Name.textContent = player2.name.slice(-1).toLowerCase() == 's' ? player2.name + \"' Board\" : player2.name + \"'s Board\";\n    mainGameContainer.classList.remove('hidden');\n})\n\n\n\n\n\n\n\n\n\n\n//# sourceURL=webpack://battleship/./src/index.js?");

/***/ }),

/***/ "./src/modules/DOM.js":
/*!****************************!*\
  !*** ./src/modules/DOM.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"createBoard\": () => (/* binding */ createBoard),\n/* harmony export */   \"drawBoard\": () => (/* binding */ drawBoard)\n/* harmony export */ });\n/*One worry one might see is that the coordinates are not in traditional \nx and y, it is instead row and column. Keep that in mind */\nfunction createBoard(board) {\n\n    const player = board.className.slice(-1)\n\n    for (let i = 0; i < 10; i++) {\n        for (let j = 0; j < 10; j++) {\n            const newElem = document.createElement(\"div\");\n            newElem.id = `p${player}-${i}-${j}`;\n            newElem.classList.add(\"cell\");\n            board.appendChild(newElem)\n        }\n    }\n}\n\nfunction drawBoard(player, hidden=false) {\n    let board = player.playerBoard.board;\n    let playerNum = player.playerNum;\n\n    \n    //Attempt to just loop through and place accordingly\n    for (let i = 0; i < 10; i++) {\n        for (let j = 0; j < 10; j++) {\n            if (board[i][j]['ship'] && !(hidden)) {\n                let shipPart = document.querySelector(`#p${playerNum}-${i}-${j}`);\n                shipPart.classList.add('ship');\n            }\n            if (board[i][j]['hit']) {\n                let cell = document.querySelector(`#p${playerNum}-${i}-${j}`);\n                cell.classList.add('hit');\n                if (board[i][j]['ship'] && (hidden)) {\n                    cell.classList.add('ship');\n                }\n            }\n              \n            \n            \n        }\n    }\n\n    \n\n}\n\n\n\n\n//# sourceURL=webpack://battleship/./src/modules/DOM.js?");

/***/ }),

/***/ "./src/modules/GameBoard.js":
/*!**********************************!*\
  !*** ./src/modules/GameBoard.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _Ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Ship */ \"./src/modules/Ship.js\");\n\n\nconst GameBoard = () => {\n    /* Instead of keeping the shots in their own array, I have decided\n    to keep them on the board, this way you just need to give coords to hit a ship.\n    If a ship was missed, then the cell is still shot, and it will do proper DOM if it has to. */\n    \n    const board = []\n    for (let i = 0; i < 10; i++) {\n        const row = []\n        for (let j = 0; j < 10; j++) {\n            row.push({hit: false, ship: null})\n    }\n    board.push(row)\n\n\n    }\n    const ships = []\n\n    \n\n    function validCoords(coords, length, rotation) {\n        //check if not on top of a ship\n        const row = +coords[0];\n        const column = +coords[1];\n        for (let i = 0; i < length; i++) {\n            let rotationAdd = rotation == 'x' ? [0, +i] : [+i, 0];\n            if (board[row + rotationAdd[0]] == undefined|| board[row + rotationAdd[0]][column + rotationAdd[1]] == undefined) {\n                return false\n            }\n            for (let add = -1; add <= 1; add++) {\n                if (board[row + rotationAdd[0]]&&board[row + rotationAdd[0]][column + rotationAdd[1] + add]) {\n                    if (board[row + rotationAdd[0]][column + rotationAdd[1] + add].ship) {\n                        return false;\n                    }\n                }\n                if (board[+row+rotationAdd[0] + add]&&board[+row+rotationAdd[0] + add][+column + rotationAdd[1]]) {\n                    if (board[+row+rotationAdd[0] + add][+column + rotationAdd[1]].ship) {\n                        return false;\n                    }\n                }\n                if (board[+row + rotationAdd[0] + add]&&board[+row + rotationAdd[0] + add][+column + rotationAdd[1] + add]) {\n                    if (board[+row + rotationAdd[0] + add][+column + rotationAdd[1] + add].ship) {\n                        \n                        return false\n                    }\n                }\n\n                if (board[+row + rotationAdd[0] - add] && board[+row + rotationAdd[0] - add][+column + rotationAdd[1] + add]) {\n                    if (board[+row + rotationAdd[0] - add][+column + rotationAdd[1] + add].ship) {\n                        \n                        return false\n                    }\n                } \n            }\n\n        \n        }\n        //check if not directly close to one WIP\n        /* to increase performance, it would be best to use the same loop from above */\n        //check if within board\n        if (coords[0] < 0 || coords[0] > 9 || coords[1] < 0 || coords[1] > 9) {\n            return false\n        }\n        return true\n        \n    }\n\n    function inBoard(coords) {\n        return !(coords[0] < 0 || coords[0] > 9 || coords[1] < 0 || coords[1] > 9);\n    }\n\n    function placeShip(coords, rotation='x', length=1) {\n        const addLength = rotation == 'x' ? [length - 1, 0] : [0, length - 1];\n\n        if (validCoords(coords, length, rotation)) {\n            const ship = (0,_Ship__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(length);\n            this.ships.push(ship);\n            for (let i = 0; i < ship.length; i++) {\n                let x = addLength[0] ? i : 0;\n                let y = addLength[1] ? i : 0;\n                this.board[coords[0] + y][coords[1] + x][\"ship\"] = ship;\n\n            }\n            return true\n        }\n        return false  \n    }\n\n    function reportAllSunk() {\n        return this.ships.every((elem) => elem.isSunk());\n    }\n\n    function receiveAttack(coords) {\n        if (inBoard(coords)) {\n            const cell = this.board[coords[0]][coords[1]];\n            if (cell['hit'] == false) {\n                cell['hit'] = true;\n                const cellShip = cell['ship']\n                if (cellShip) {\n                    cellShip.hit();\n                    return 'hit'\n                }\n                return 'shot'\n            }\n            return false\n        }\n        return false\n    }\n\n    function createRandomBoard() {\n        [5,3,3,4,2].forEach((val)=> {\n            let placedShip = this.placeShip([Math.floor(Math.random() * 10), Math.floor(Math.random()* 10)], ['x','y'][Math.floor(Math.random() * 2)], val);\n        \n            while (!(placedShip)) {\n                placedShip = this.placeShip([Math.floor(Math.random() * 10), Math.floor(Math.random()* 10)], ['x','y'][Math.floor(Math.random() * 2)], val);  \n            }\n\n        })\n    }\n\n    function clearBoard() {\n        board.forEach((val, row) => {\n            val.forEach((node, column) => {\n                board[row][column] = {hit: false, ship: null}\n            })\n        })\n    }\n\n\n\n    return {board, placeShip, receiveAttack, ships, reportAllSunk, validCoords, createRandomBoard, clearBoard}\n}\n\n\n\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GameBoard);\n\n//# sourceURL=webpack://battleship/./src/modules/GameBoard.js?");

/***/ }),

/***/ "./src/modules/Player.js":
/*!*******************************!*\
  !*** ./src/modules/Player.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _GameBoard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./GameBoard */ \"./src/modules/GameBoard.js\");\n\nconst Player = (name, playerNum) => {\n    \n    let playerBoard = (0,_GameBoard__WEBPACK_IMPORTED_MODULE_0__[\"default\"])();\n    let shotBoard = (0,_GameBoard__WEBPACK_IMPORTED_MODULE_0__[\"default\"])();\n    let botHitReport = {\n        lastHit: false,\n        triedDirections: 0, //NESW\n        oneStreak: 0,\n        totalStreak: 0,\n        direction: false,\n        ends: 0\n\n    }\n    let opponentShipsAvailable = [5,4,3,3,2]\n\n    function resetBotReport() {\n        botHitReport.lastHit = false;\n        botHitReport.triedDirections = 0; \n        botHitReport.oneStreak = 0;\n        botHitReport.totalStreak = 0;\n        botHitReport.direction = false;\n        botHitReport.ends = 0;\n\n    }\n\n    function validHitCoords(board) {\n        const returnArr = [];\n        for (let i = 0; i < 10; i++) {\n            for (let j = 0; j < 10; j++) {\n                if (board[i][j].hit) {\n                    continue;\n                }\n                //Check if the square has a ship around it.\n\n                if (board[i][j + 1] && board[i][j+1].ship) {\n                    continue;\n                }\n                if (board[i][j - 1] && board[i][j-1].ship) {\n                    continue\n                }\n                if (board[i - 1]) {\n                    if (board[i -1][j] && board[i-1][j].ship) {\n                        continue\n                    }\n                    if (board[i-1][j-1] && board[i-1][j-1].ship) {\n                        continue\n                    }\n                    if (board[i-1][j+1] && board[i-1][j+1].ship) {\n                        continue\n                    }\n                }\n                if (board[i + 1]) {\n                    if (board[i +1][j] && board[i+1][j].ship) {\n                        continue\n                    }\n                    if (board[i+1][j-1] && board[i+1][j-1].ship) {\n                        continue\n                    }\n                    if (board[i+1][j+1] && board[i+1][j+1].ship) {\n                        continue\n                    }\n                }\n                let minimum = Math.min(...opponentShipsAvailable)\n                let breakEach = false;\n                let firstx;\n                let firsty;\n                let secondx;\n                let secondy;\n                for (let add = 1; add <= 10 ; add++ ) {\n                    if (!firsty) {\n                        if (board[i + add]) {\n                            if (board[i + add][j] && board[i + add][j].hit) {\n                                firsty = i + add;\n                            }\n                        } else {\n                            firsty = 10;\n                        }\n                    }\n                    if (!secondy) {\n                        if (board[i - add]) {\n                            if (board[i - add][j] && board[i - add][j].hit) {\n                                secondy = i - add;\n                            }\n                        } else {\n                            secondy = 0;\n                        }\n                    }\n                    if (!firstx) {\n                     if (board[i][j + add]) {\n                        if (board[i][j + add] && board[i][j + add].hit) {\n                            firstx = j + add\n                        }\n                     } else {\n                        firstx = 10;\n                     }\n                    }\n                    if (!secondx) {\n                     if (board[i][j - add]) {\n                        if (board[i][j - add] && board[i][j - add].hit) {\n                            secondx = j - add;\n                        }\n                     } else {\n                        secondx = 0;\n                     }\n                    }\n                }\n                \n            \n                if (((firstx - secondx - 1) < minimum) && ((firsty - secondy - 1) < minimum)) {\n\n                    continue\n                }\n\n                returnArr.push([i, j]);\n            }\n        }\n        return returnArr;\n    }\n    function doRandomShot(board) {\n        let maximumLength = Math.max(...opponentShipsAvailable)\n        console.log(botHitReport)\n        console.log(opponentShipsAvailable)\n        if (botHitReport.lastHit) {\n            \n            if (botHitReport.totalStreak < maximumLength) {\n                if (botHitReport.direction) {\n                    let boardRow = botHitReport.lastHit[0] + (botHitReport.direction[0] * botHitReport.oneStreak);\n                    let boardColumn = botHitReport.lastHit[1] + (botHitReport.direction[1] * botHitReport.oneStreak);\n                    if (shotBoard.board[boardRow] && shotBoard.board[boardRow][boardColumn] && !shotBoard.board[boardRow][boardColumn].hit) {\n                        const boardAttack = board.receiveAttack([boardRow, boardColumn]);\n                        if (boardAttack) {\n                            if (boardAttack  == 'hit') {\n                                shotBoard.board[boardRow][boardColumn]['ship'] = true;\n                                shotBoard.board[boardRow][boardColumn]['hit'] = true;\n                                botHitReport.totalStreak += 1;\n                                botHitReport.oneStreak += 1;\n                                return\n                            } else {\n                                shotBoard.board[boardRow][boardColumn]['hit'] = true;\n                                botHitReport.ends += 1;\n                                if (botHitReport.ends == 2) {\n                                    opponentShipsAvailable.splice(opponentShipsAvailable.indexOf(botHitReport.totalStreak),1);\n                                    resetBotReport();\n\n                                } else {\n                                    botHitReport.direction = [botHitReport.direction[0] * -1, botHitReport.direction[1] * -1];\n                                    botHitReport.oneStreak = 1;\n                                }\n                                return;\n                            }\n                        }  \n                        \n                        return\n                    }  else {\n                        if (!shotBoard.board[boardRow] || !shotBoard.board[boardRow][boardColumn] || shotBoard.board[boardRow][boardColumn].hit) {\n                            botHitReport.ends += 1;\n                            if (botHitReport.ends == 2) {\n                                opponentShipsAvailable.splice(opponentShipsAvailable.indexOf(botHitReport.totalStreak),1);\n                                resetBotReport();\n                                \n                            }\n                            botHitReport.direction = [botHitReport.direction[0] * -1, botHitReport.direction[1] * -1];\n                            botHitReport.oneStreak = 1;\n                            doRandomShot(board);\n                            return\n                        }\n                    }\n                } else {\n                    let directionTry;\n                    switch (botHitReport.triedDirections) {\n                        case 0:\n                            directionTry = [1,0];\n                            break;\n                        case 1:\n                            directionTry = [0,1];\n                            break;\n                        case 2:\n                            directionTry = [-1, 0];\n                            break;\n                        case 3:\n                            directionTry = [0, -1];\n                            break;\n                        default:\n                            break;\n                    }\n                    let boardRow = botHitReport.lastHit[0] + directionTry[0];\n                    let boardColumn = botHitReport.lastHit[1] + directionTry[1];\n                    if (shotBoard.board[boardRow] && shotBoard.board[boardRow][boardColumn] && !shotBoard.board[boardRow][boardColumn].hit) {\n                        const boardAttack = board.receiveAttack([boardRow, boardColumn]);\n                        if (boardAttack) {\n                            if (boardAttack == 'hit') {\n                                shotBoard.board[boardRow][boardColumn]['ship'] = true;\n                                shotBoard.board[boardRow][boardColumn]['hit'] = true;\n                                botHitReport.direction = [...directionTry];\n                                botHitReport.oneStreak = 2;\n                                botHitReport.totalStreak = 2;\n                                return\n                            } else {\n                                \n                                shotBoard.board[boardRow][boardColumn]['hit'] = true;\n                                botHitReport.triedDirections += 1;\n                                return\n                            }\n                        } else {\n                            console.log('Invalid hit.')\n                        }\n\n                    } else if (!shotBoard.board[boardRow] || !shotBoard.board[boardRow][boardColumn] || shotBoard.board[boardRow][boardColumn].hit) {\n                        \n                        botHitReport.triedDirections += 1;\n                        console.log('yup cant go that way, go again!')\n                        doRandomShot(board);\n                        \n                        return;\n                    }\n\n\n                }\n            } else {\n                opponentShipsAvailable.splice(opponentShipsAvailable.indexOf(botHitReport.totalStreak),1);\n            }\n        }\n        const availableHits = validHitCoords(shotBoard.board);\n        \n        const randomNum = Math.floor(Math.random() * (availableHits.length))\n        const coords = availableHits[randomNum];\n        console.log('Shot random at :', coords)\n        const resultShot = board.receiveAttack(coords)\n        switch (resultShot) {\n            case 'hit':\n                console.log('Hit')\n                shotBoard.board[coords[0]][coords[1]]['ship'] = true;\n                shotBoard.board[coords[0]][coords[1]]['hit'] = true;\n                resetBotReport();\n                botHitReport.lastHit = [...coords];\n                botHitReport.totalStreak += 1;\n                botHitReport.oneStreak += 1;\n                break;  \n            case 'shot':\n                shotBoard.board[coords[0]][coords[1]]['hit'] = true;\n                resetBotReport();   \n                break;\n            default: \n                console.log('uhhhh')\n                \n        }\n        return resultShot;\n        \n    }\n    function doSmartShot(board) {\n        doRandomShot(board)\n    }\n\n    function playerTurn(coords,enemyBoard) {\n        let shot = false;\n        return enemyBoard.receiveAttack(coords)\n        \n        \n    }\n\n    return {playerTurn, playerBoard, doRandomShot, name, playerNum, doSmartShot}\n}   \n\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Player);\n\n//# sourceURL=webpack://battleship/./src/modules/Player.js?");

/***/ }),

/***/ "./src/modules/Ship.js":
/*!*****************************!*\
  !*** ./src/modules/Ship.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst Ship = (length) => {\n    let hitAmount = 0;\n    let sunk = false;\n    \n    function hit() {\n        this.hitAmount++;\n        if (this.hitAmount >= length) {\n            this.sunk = true;\n        }\n    }\n\n    function isSunk() {\n        return this.sunk\n    }\n    \n    \n    return {length, hit, isSunk, hitAmount, sunk};\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Ship);\n\n//# sourceURL=webpack://battleship/./src/modules/Ship.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;