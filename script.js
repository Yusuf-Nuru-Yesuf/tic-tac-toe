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


