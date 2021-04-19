


const Gameboard = () => {
    let gameArray = ['✕', '✕', '◯', '✕', '✕', '◯', '◯', '◯', '✕'];

    const addToArray = (xo, sq) => {
        gameArray[sq] = xo;
    }
    return {gameArray, addToArray};
};

const Logic = () => {
    const playerList = []
    const addPlayer = (player) => {
        if (playerList.length < 2) {
            addPlayer.push(player);
        } else console.log("max players reached");
    }
    
    const updateBoard = (list) => {
        for (let i = 0; i < 9; i++) {
            const gridToAdd = document.querySelector(`#sq-${i}`);
            gridToAdd.innerHTML = list[i];
        }
    }
    return {updateBoard};
};

const Player = (name) => {
    return {name};
};

const game = Gameboard();
const master = Logic();
const grids = document.querySelectorAll('.game-grid');


master.updateBoard(game.gameArray);

grids.forEach(grid => {
    grid.addEventListener("click", (e) => {
        console.log('yes');
        indexToAdd = e.target.getAttribute("data-no");
        game.addToArray("GA", indexToAdd);
        master.updateBoard(game.gameArray);
    })
})