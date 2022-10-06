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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _modules_DOM_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/DOM.js */ \"./src/modules/DOM.js\");\n/* harmony import */ var _modules_Player_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/Player.js */ \"./src/modules/Player.js\");\n\n\n\n\nconst MODE = \"BOT\";\n\nlet board1 = document.querySelector('.board-1');\nlet board2 = document.querySelector('.board-2');\n\n(0,_modules_DOM_js__WEBPACK_IMPORTED_MODULE_0__.createBoard)(board1);\n(0,_modules_DOM_js__WEBPACK_IMPORTED_MODULE_0__.createBoard)(board2);\n\nlet gameEnd = false;\nlet player1;\nlet player2;\nlet playerTurn = 0;\n\nswitch (MODE) {\n    case 'PVP':\n        break;\n    default:\n        player1 = (0,_modules_Player_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(\"Chad\", 1);\n        player2 = (0,_modules_Player_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(\"BOT\", 2);\n}\n\nplayer1.playerBoard.placeShip([2, 2], 'y', 3);\nplayer1.playerBoard.placeShip([0,4], 'x', 3);\n\nplayer2.playerBoard.placeShip([2, 2], 'y', 3);\nplayer2.playerBoard.placeShip([0,4], 'x', 3);\n\n\n(0,_modules_DOM_js__WEBPACK_IMPORTED_MODULE_0__.drawBoard)(player1);\n(0,_modules_DOM_js__WEBPACK_IMPORTED_MODULE_0__.drawBoard)(player2);\n\n\nlet enemyBoard = document.querySelectorAll(\".board-2 .cell\")\nenemyBoard.forEach((elem) => {\n    elem.addEventListener('click', (e)=> {\n        if (playerTurn != 0 ) {\n            return\n        }\n\n        let id = elem.getAttribute('id');\n        let row = id.charAt(3);\n        let column = id.charAt(5);\n        console.log(row, column)\n        if (player1.playerTurn([+row, +column], player2.playerBoard)) {\n            playerTurn = 1;\n            (0,_modules_DOM_js__WEBPACK_IMPORTED_MODULE_0__.drawBoard)(player2);\n            if (player2.playerBoard.reportAllSunk()) {\n                console.log(\"NICE YOU WIN!!\")\n                playerTurn = 100;\n                return\n            }\n\n            if (MODE == 'BOT') {\n                player2.doRandomShot(player1);\n                playerTurn = 0;\n                (0,_modules_DOM_js__WEBPACK_IMPORTED_MODULE_0__.drawBoard)(player1);\n                if (player1.playerBoard.reportAllSunk()) {\n                    console.log(\"YOU LOSE!\")\n                    playerTurn = 100;\n                    return\n                }\n            }\n\n            \n\n        }\n    }\n    )\n})\n\nconsole.log(\"Wa \")\n\n\n\n\n//# sourceURL=webpack://battleship/./src/index.js?");

/***/ }),

/***/ "./src/modules/DOM.js":
/*!****************************!*\
  !*** ./src/modules/DOM.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"createBoard\": () => (/* binding */ createBoard),\n/* harmony export */   \"drawBoard\": () => (/* binding */ drawBoard)\n/* harmony export */ });\nfunction createBoard(board) {\n\n    const player = board.className.slice(-1)\n\n    for (let i = 0; i < 7; i++) {\n        for (let j = 0; j < 7; j++) {\n            const newElem = document.createElement(\"div\");\n            newElem.id = `p${player}-${i}-${j}`;\n            newElem.classList.add(\"cell\");\n            board.appendChild(newElem)\n        }\n    }\n}\n\nfunction drawBoard(player) {\n    let board = player.playerBoard.board;\n    let playerNum = player.playerNum;\n\n    \n    //Attempt to just loop through and place accordingly\n    for (let i = 0; i < 7; i++) {\n        for (let j = 0; j < 7; j++) {\n            if (board[i][j]['ship']) {\n                let shipPart = document.querySelector(`#p${playerNum}-${i}-${j}`);\n                shipPart.classList.add('ship');\n            }\n            if (board[i][j]['hit']) {\n                let cell = document.querySelector(`#p${playerNum}-${i}-${j}`);\n                cell.classList.add('hit');\n            }\n              \n            \n            \n        }\n    }\n\n    \n\n}\n\n\n\n\n//# sourceURL=webpack://battleship/./src/modules/DOM.js?");

/***/ }),

/***/ "./src/modules/GameBoard.js":
/*!**********************************!*\
  !*** ./src/modules/GameBoard.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _Ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Ship */ \"./src/modules/Ship.js\");\n\n\nconst GameBoard = () => {\n    /* Instead of keeping the shots in their own array, I have decided\n    to keep them on the board, this way you just need to give coords to hit a ship.\n    If a ship was missed, then the cell is still shot, and it will do proper DOM if it has to. */\n\n\n    function validCoords(coords) {\n        return (coords[0] >= 0 && coords[0] <= 6 && coords[1] >= 0 && coords[1] <= 6)\n    }\n\n    \n    const board = []\n    for (let i = 0; i < 7; i++) {\n        const row = []\n        for (let j = 0; j < 7; j++) {\n            row.push({hit: false, ship: null})\n    }\n    board.push(row)\n\n\n    }\n    const ships = []\n\n    function placeShip(coords, rotation='x', length=1) {\n        const addLength = rotation == 'x' ? [length - 1, 0] : [0, length - 1];\n\n        if (validCoords(coords) && validCoords([coords[0] + addLength[0], coords[1] + addLength[0]])) {\n            const ship = (0,_Ship__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(length);\n            this.ships.push(ship);\n            for (let i = 0; i < ship.length; i++) {\n                let x = addLength[0] ? i : 0;\n                let y = addLength[1] ? i : 0;\n                this.board[coords[0] + y][coords[1] + x][\"ship\"] = ship;\n\n            }\n            return true\n        }\n        return false  \n    }\n\n    function reportAllSunk() {\n        return this.ships.every((elem) => elem.isSunk());\n    }\n\n    function receiveAttack(coords) {\n\n        if (validCoords(coords)) {\n            const cell = this.board[coords[0]][coords[1]];\n            if (cell['hit'] == false) {\n                cell['hit'] = true;\n                const cellShip = cell['ship']\n                if (cellShip) {\n                    cellShip.hit();\n                }\n                return true\n            }\n            return false\n        }\n        return false\n    }\n\n\n\n    return {board, placeShip, receiveAttack, ships, reportAllSunk}\n}\n\n\n\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GameBoard);\n\n//# sourceURL=webpack://battleship/./src/modules/GameBoard.js?");

/***/ }),

/***/ "./src/modules/Player.js":
/*!*******************************!*\
  !*** ./src/modules/Player.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _GameBoard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./GameBoard */ \"./src/modules/GameBoard.js\");\n\n\nconst Player = (name, playerNum) => {\n    \n    let playerBoard = (0,_GameBoard__WEBPACK_IMPORTED_MODULE_0__[\"default\"])();\n    function doRandomShot(enemy) {\n        let shot = false;\n        while (!shot) {\n            let randomShotX = Math.floor(Math.random() * 7);\n            let randomShotY = Math.floor(Math.random() * 7);\n            let enemyBoard = enemy.playerBoard;\n            if (enemyBoard.receiveAttack([randomShotX, randomShotY])) {\n                shot = true;\n            }\n        }\n    }\n\n    function playerTurn(coords,enemyBoard) {\n        let shot = false;\n        return enemyBoard.receiveAttack(coords)\n        \n        \n    }\n\n    return {playerTurn, playerBoard, doRandomShot, name, playerNum}\n}   \n\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Player);\n\n//# sourceURL=webpack://battleship/./src/modules/Player.js?");

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