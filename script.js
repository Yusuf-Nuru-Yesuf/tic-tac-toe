const GameBoard = (function() {
    let board = [];
    const ROWS = 3;
    const COLUMNS = 3;

    function createBoard() {
        for (let i = 0; i < ROWS; i++) {
            board[i] = [];
            for (let j = 0; j < COLUMNS; j++) {
                board[i][j] = "";
            }
        }
    }

    function getBoard() {
        if (board.length === 0 ) {
            createBoard();
        }
        return board;
    }

    function updateBoard(row, column, symbol) {
        if (row < 0 || row >= ROWS || column < 0 || column >= COLUMNS || board[row][column] !== "" ) {
            return false;
        }
        board[row][column] = symbol;
        return true;
    }

    function resetBoard() {
        createBoard();
    }

    return { getBoard, updateBoard, resetBoard };
})();

const Player = (name, symbol) => {
    const getName = () => name;
    const getSymbol = () => symbol;
    return {getName, getSymbol};
}

const Game = (function() {
    let currentPlayer;
    let players = {};
    let isGameOver = false;
    let finalMessage = "";

    function startGame(player1Name, player2Name) {
        players = {
            player1 : Player(player1Name, "X"),
            player2 : Player(player2Name, "0"),
        }
        currentPlayer = players.player1;
        GameBoard.resetBoard();
        isGameOver = false;
    }

    function switchTurn() {
        currentPlayer = currentPlayer === players.player1 ? players.player2 : players.player1;
    }

    function makeMove(row, column) {
        if(isGameOver || !GameBoard.updateBoard(row, column, currentPlayer.getSymbol())) {
            return false;
        }

        if (draw()) {
            finalMessage = "It's a tie!"
            isGameOver = true;
        }
        else if (win()) {
            finalMessage = `${currentPlayer.getName()} wins!`
            isGameOver = true;
        }
        else {
            switchTurn();
        }

        return true;
    }

    function win() {
        const board = GameBoard.getBoard();
        const size = board.length;

        for (let i = 0; i < size; i++) {
            if (checkLine(board[i]) || checkLine(board.map(row => row[i]))) {
                return true;
            }
        }

        if (checkLine(board.map((row, i) => row[i])) ||
            checkLine(board.map((row, i) => row[size - 1 - i]))) {
            return true;
        }

        return false;
    }

    function checkLine(line) {
        return line.every(cell => cell !== "" & cell === line[0]);
    }

    function draw() {
        return GameBoard.getBoard().every((row) => row.every((cell) => cell !== ""));
    }

    function isOver() {
        return isGameOver;
    }

    function getCurrentPlayer() {
        return currentPlayer;
    }

    function getFinalMessage() {
        return finalMessage;
    }

    return {startGame, makeMove, isOver, getCurrentPlayer, getFinalMessage};
}) ();

const DisplayController = (function() {
    const boardElement = document.querySelector("#board");
    const messageElement = document.querySelector("#message");
    const resetButton = document.querySelector("#resetButton");
    const startButton = document.querySelector("#startForm");
    const gameContainer = document.querySelector("#gameContainer");
    const player1Input = document.querySelector("#player1Name");
    const player2Input = document.querySelector("#player2Name");

    function displayBoard() {
        const board = GameBoard.getBoard();
        boardElement.innerHTML = "";
        board.forEach((row, rowIndex) => {
            row.forEach((cell, columIndex) => {
                const cellElement = document.createElement("button");
                cellElement.classList.add("cell");
                cellElement.textContent = cell;
                cellElement.addEventListener("click", () => Game.makeMove(rowIndex, columIndex));
                boardElement.appendChild(cellElement);
            })
        })
    }

    function showMessage(message) {
        messageElement.textContent = message;
    }

    function update() {
        displayBoard();
        const currentPlayer = Game.getCurrentPlayer();
        showMessage(Game.isOver() ? Game.getFinalMessage() : `${currentPlayer.getName()}'s Turn`);
    }

    function showStartForm() {
        startButton.style.display = "block";
        gameContainer.style.display = "none";
        player1Input.value = "";
        player2Input.value = "";
    }

    function hideStartForm() {
        startButton.style.display = "none";
        gameContainer.style.display = "block";
    }

    
    
}) ();


