


const Gameboard = () => {
    let gameOn = false;
    let gameArray = [[' ', ' ', ' '], [' ', ' ', ' '], [' ', ' ', ' ']];

    const addToArray = (xo, xIndex, yIndex) => {
        gameArray[xIndex][yIndex] = xo;
    }
    const allowMove = (xIndex, yIndex) => {
        if (gameArray[xIndex][yIndex] == ' ') return true;
        return false;
    }
    const getArray = () => {
        return gameArray;
    }
    const getGameOn = () => {
        return gameOn;
    }
    const setGameOn = () => {
        gameOn = !gameOn;
    }
    const resetGame = () => {
        gameArray = [[' ', ' ', ' '], [' ', ' ', ' '], [' ', ' ', ' ']]
    }
    return {getArray, addToArray, allowMove, resetGame, getGameOn, setGameOn};
};

const Logic = () => {
    const playerList = [];
    let playerTurn = false;           // false for first player, true for second
    let thisGame;

    const setGame = (game) => {
        thisGame = game;
        playerTurn = false;
        thisGame.resetGame();
        thisGame.setGameOn();
        updateBoard();
        messageDiv.innerHTML = '';
        turnDiv.innerHTML = `${useXO()}'s turn!`
    }

    const addPlayer = (player) => {
        if (playerList.length < 2) {
            addPlayer.push(player);
        } else console.log("max players reached");
    }
    const playerMove = (xIndex, yIndex) => {
        thisGame.addToArray(useXO(), xIndex, yIndex);
    }
    const updateBoard = () => {
        list = thisGame.getArray()
        for (let x = 0; x < 3; x++) {
            for (let y = 0; y < 3; y++) {
                const gridToAdd = document.querySelector(`#sq-${x}-${y}`);
                gridToAdd.innerHTML = list[x][y];
            }
        }
    }
    const updateMoveDisplay = () => {
        turnDiv.innerHTML = `${useXO()}'s turn!`
    }
    const clearMoveDisplay = () => {
        turnDiv.innerHTML = '';
    }
    const checkWin = () => {
        const arr =thisGame.getArray();
        if (checkRows(arr) || checkCols(arr) || checkDiag(arr) ) {
            messageDiv.innerHTML = `${useXO()} wins the game!`
            clearMoveDisplay()
            return true;
        }
        playerTurn = !playerTurn;
        updateMoveDisplay();
        
    }
    const checkTie = () => {
        const arr = thisGame.getArray();
        for (let i = 0; i < 3; i++) {          
            const row = arr[i];
            if (row.some(val => val == " ")) {
                return false;
            }
        }
        messageDiv.innerHTML = `It was a tie!`
        clearMoveDisplay()
        return true;
    }

    const checkRows = (array) => {
        for (let i = 0; i < 3; i++) {          
            const row = array[i];
            if (row.every(val => val == useXO())) {
                return true
            }
        }
    }
    const checkCols = (array) => {
        for (let i = 0; i < 3; i++) {             
            let column = [];
            for (let j = 0; j < 3; j++) {           
                 column.push(array[j][i]);
            }
            if (column.every(val => val == useXO())) {
                return true
            }
        }
    }
    const checkDiag = (array) => {
        let diag1 = [];
        let diag2 = [array[0][2], array[1][1], array[2][0]];
        for (let i = 0; i < 3; i++) {             
            for (let j = 0; j < 3; j++) {   
                if (i == j) diag1.push(array[j][i]);
            }
        }
        console.log(diag1);
        if (diag1.every(val => val == useXO()) || diag2.every(val => val == useXO())) {
            return true
        }
    }
    const useXO = () => {
        return (!playerTurn) ? '✕':'◯'
    }
    return {setGame, updateBoard, playerMove, checkWin, checkTie};
};

const Player = (name) => {
    return {name};
};

const game = Gameboard();
const master = Logic();
const grids = document.querySelectorAll('.game-grid');
const messageDiv = document.querySelector('#message-div');
const resetButton = document.querySelector('#btn-reset');
const turnDiv = document.querySelector('#turn-div');

master.setGame(game);

grids.forEach(grid => {
    grid.addEventListener("click", (e) => {
        
        let xIndex, yIndex;
        [xIndex, yIndex] = e.target.getAttribute("data-no").split('-');
        if (game.allowMove(xIndex, yIndex) && game.getGameOn()) {
            master.playerMove(xIndex, yIndex);
            master.updateBoard();
            if (master.checkWin() || master.checkTie()){
                game.setGameOn();
            }
        }
    })
})

resetButton.addEventListener("click", () => {
    master.setGame(game);
})
