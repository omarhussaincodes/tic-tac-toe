function checkWinner(boardToTest, size) {
    // returns x if 'x' winner, 0 if '0' winner or null if no winner
    // 8 ways to win the game - 3 horizontal, 3 vertical, 2 diagnol

    const winningPositions = getWinningPositions(size);

    for (let i = 0; i < winningPositions.length; i++) {
        const [a, b, c] = winningPositions[i];

        if (boardToTest[a].value && (boardToTest[a].value === boardToTest[b].value) && (boardToTest[b].value === boardToTest[c].value)) {
            return {
                winner: boardToTest[a].value,
                winningIndexes: winningPositions[i]
            }
        }
    };

    return null;

}

function getWinningPositions(boardSize) {

    const winningPositions = [];
    // const sample = [
    //     "a00", "a01", "a02",
    //     "a10", "a11", "a12",
    //     "a20", "a21", "a22"
    // ];

    for (let row = 0; row < boardSize; row++) {
        for (let col = 0; col < boardSize; col++) {

            // horizontal co-ordinates
            if (col === 0) {
                let combinations = [];
                for (let i = 0; i < boardSize; i++) {
                    combinations.push(coordinatesToIndex([row, i], boardSize));
                }
                winningPositions.push(combinations);
            }
            // vertical co-ordinates
            if (row === 0) {
                let combinations = [];
                for (let i = 0; i < boardSize; i++) {
                    combinations.push(coordinatesToIndex([i, col], boardSize));
                }
                winningPositions.push(combinations);
            }
            // diganols
            if (row === 0 && col === 0) {
                let combinations = [];
                for (let i = 0; i < boardSize; i++) {
                    combinations.push(coordinatesToIndex([i, i], boardSize));
                }
                winningPositions.push(combinations);
            }
            if (row === 0 && col === boardSize - 1) {
                let combinations = [];
                for (let i = 0; i < boardSize; i++) {
                    combinations.push(coordinatesToIndex([i, boardSize - 1 - i], boardSize));
                }
                winningPositions.push(combinations);
            }

        }

    }

    return winningPositions;

};

function coordinatesToIndex(coordinates, numCols) {
    const row = coordinates[0];
    const col = coordinates[1];

    return ((row * numCols) + col);
}

export default checkWinner;