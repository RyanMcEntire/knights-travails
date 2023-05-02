class Node {
  constructor(square, move1, move2, move3) {
    this.square = square;
    this.move1 = move1;
    this.move2 = move2;
    this.move3 = move3;
    this.parent = null;
  }
}

class Knight {
  constructor(currentPosition, destination) {
    const movesArray = this.getAllMoves(currentPosition);
    const bestMoves = this.sortMoveCoordinates(movesArray);

    this.startingSquare = currentPosition;
    this.destination = destination;
    this.root = null;
    this.moves = [
      [1, 2],
      [2, 1],
      [2, -1],
      [1, -2],
      [-1, -2],
      [-2, -1],
      [-2, 1],
      [-1, 2],
    ];
    this.path = [];
  }

  // moves are calculated as difference between the square to move to, and destination.
  getAllMoves(currentPosition) {
    const moveArray = [];
    this.moves.forEach((move) => {
      const x = move[0] + currentPosition[0];
      const y = move[1] + currentPosition[1];
      if (x == this.startingSquare[0] && y == this.startingSquare[1]) return;
      if (x < 0 || x > 7 || y < 0 || y > 7) return;
      moveArray.push([x, y]);
    });
    return moveArray;
  }

  // sorts moves based on distance from destination and keeps top 3
  sortMoveCoordinates(moves, destination) {
    // overkill formula for checking distance on a 2D grid
    const distance = (x, y) => Math.sqrt(x * x + y * y);
    // finds the difference between a move and the destination
    const compare = (a, b) => {
      const diffA = [a[0] - destination[0], a[1] - destination[1]];
      const diffB = [b[0] - destination[0], b[1] - destination[1]];

      const distanceA = distance(diffA[0], diffA[1]);
      const distanceB = distance(diffB[0], diffB[1]);

      return distanceA - distanceB;
    };
    // sorts moves from lowest to highest distance from destination
    moves.sort(compare);
    let nextMoves = moves.splice(0, 3);
    return nextMoves;
  }

  buildKnightTree(currentPosition, moves) {
    
  }
}

module.exports = Knight;
