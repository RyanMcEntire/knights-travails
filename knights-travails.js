const Knight = require('./knight');

function createBoard() {
  const grid = 8;
  const board = [];
  for (i = 0; i < grid; i++) {
    for (j = 0; j < grid; j++) {
      board.push([i, j]);
    }
  }
  return board;
}

const chessBoard = createBoard();

console.log(chessBoard);


function knightMoves(start, end, count) {
  if (!start) return
   
}

// axis will be [x, y]
// cant move off board

const moves = [
  [1, 2],
  [2, 1],
  [2, -1],
  [1, -2],
  [-1, -2],
  [-2, -1],
  [-2, 1],
  [-1, 2],
];
