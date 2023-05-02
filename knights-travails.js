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
  if (!start) return;
}

const ourKnight = new Knight([4, 4], [5, 4]);

const knightsMoves = ourKnight.getAllMoves(ourKnight.startingSquare);
const bestMoves = ourKnight.sortMoveCoordinates(
  knightsMoves,
  ourKnight.destination
);
console.log(ourKnight, bestMoves);
