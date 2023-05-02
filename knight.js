class Node {
  constructor(square) {
    this.square = square;
    this.move1 = null;
    this.move2 = null;
    this.move3 = null;
    this.parent = null;
  }
}

class Knight {
  constructor(currentPosition, destination) {
    this.startingSquare = currentPosition;
    this.destination = destination;
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

  // sorts moves based on distance from destination
  sortMoveCoordinates(moves, destination) {
    const distance = (x, y) => Math.sqrt(x * x + y * y);
    // finds the difference between a move and the destination
    const compare = (a, b) => {
      const diffA = [a[0] - destination[0], a[1] - destination[1]];
      const diffA = [b[0] - destination[0], b[1] - destination[1]];
      // calls distance() to compare how close each is
      const distanceA = distance(diffA[0], diffA[1])
      const distanceB = distance(diffB[0], diffB[1])

      return distanceA - distanceB;
    }
    // sorts moves from lowest to highest distance from destination
    moves.sort(compare)
  }
}

module.exports = Knight;
