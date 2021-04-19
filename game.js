


const Gameboard = () => {
    let gameArray = ['✕', '✕', '◯', '✕', '✕', '◯', '◯', '◯', '✕'];
    return {gameArray};
};



const Logic = () => {
    const displayBoard = (list) => {
        for (let i = 0; i < 9; i++) {
            const gridToAdd = document.querySelector(`#sq-${i}`);
            gridToAdd.innerHTML = list[i];
        }
    }
    return {displayBoard};
};

const Player = (name) => {
    return {name};
};

const game = Gameboard();

console.log(game.gameArray);




const master = Logic();

master.displayBoard(game.gameArray);