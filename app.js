const board = document.getElementById("board");
const cells = document.getElementsByClassName("cell");
const msg = document.getElementById("msg");
const players = ["X", "O"];
let current = players[0];
let gameState = Array(9).fill(null);

// Add event listeners to each cell
for (let i = 0; i < cells.length; i++) {
    cells[i].addEventListener("click", function() { handleCellClick(i); });
}

function handleCellClick(index) {
    if (gameState[index] === null) {
        gameState[index] = current;
        cells[index].innerText = current;
        if (checkWin(current)) {
            msg.innerText = `${current} wins!`;
            disableBoard();
        } else if (checkTie()) {
            msg.innerText = "It's a tie!";
        } else {
            current = current === players[0] ? players[1] : players[0];
            msg.innerText = `${current}'s turn!`;
        }
    }
}

function checkWin(current) {
    const winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    return winConditions.some(condition => 
        condition.every(index => gameState[index] === current)
    );
}

function checkTie() {
    return gameState.every(cell => cell !== null);
}

function disableBoard() {
    for (let cell of cells) {
        cell.style.pointerEvents = "none";
    }
}

function restart() {
    gameState.fill(null);
    for (let cell of cells) {
        cell.innerText = "";
        cell.style.pointerEvents = "auto";
    }
    current = players[0];
    msg.innerText = `${current}'s turn!`;
}
