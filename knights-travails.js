class Node {
  constructor(square) {
    this.square = square;
    this.children = [];
    this.parent = null;
  }
}

class Knight {
  constructor(currentPosition, destination) {
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
    this.startingSquare = currentPosition;
    this.destination = destination;
    this.root = null;
    this.visited = new Set();
  }

  // adds the moves to the current position
  getAllMoves(currentPosition) {
    const moveArray = [];
    this.moves.forEach((move) => {
      const x = move[0] + currentPosition[0];
      const y = move[1] + currentPosition[1];
      if (x < 0 || x > 7 || y < 0 || y > 7) return;
      moveArray.push([x, y]);
    });
    return moveArray;
  }

  // uses BFS to find the
  findShortestPath() {
    const queue = [{ node: new Node(this.startingSquare) }];

    while (queue.length > 0) {
      const { node: currentNode } = queue.shift();

      if (
        currentNode.square[0] === this.destination[0] &&
        currentNode.square[1] === this.destination[1]
      ) {
        const path = [];
        let tempNode = currentNode;
        while (tempNode) {
          path.unshift(tempNode.square);
          tempNode = tempNode.parent;
        }
        return path;
      }

      const moves = this.getAllMoves(currentNode.square);
      moves.forEach((move) => {
        // JSON.stringify() to make comparisons simpler
        const moveStr = JSON.stringify(move);
        if (!this.visited.has(moveStr)) {
          this.visited.add(moveStr);
          const childNode = new Node(move);
          childNode.parent = currentNode;
          currentNode.children.push(childNode);
          queue.push({ node: childNode });
        }
      });
    }
    // safety net
    return [];
  }
}

// creates a knight, gets the shortest path, logs to console
function knightMoves(startingSquare, destinationSquare) {
  const ourKnight = new Knight(startingSquare, destinationSquare);
  const shortestPath = ourKnight.findShortestPath();
  const x = ourKnight.startingSquare[0];
  const y = ourKnight.startingSquare[1];
  console.log(`> knightMoves([${startingSquare}], [${destinationSquare}])`);
  if (x < 0 || x > 7 || y < 0 || y > 7) {
    return console.log(
      `You entered [${ourKnight.startingSquare}] for the starting position. Starting position coordinates must be between [0, 0] & [7, 7]`
    );
  } else if (shortestPath.length < 1) {
    console.log(
      `You entered [${ourKnight.destination}] as the destination. Destination coordinates must be between [0, 0] & [7, 7]`
    );
  } else {
    console.log(
      `=> You made it in ${shortestPath.length - 1} moves! Here's your path:`
    );
  }
  shortestPath.forEach((coordinate) => {
    console.log(coordinate);
  });
}

knightMoves([6, 7], [1, 2]);
// > knightMoves([6,7], [1,2])
// => You made it in 4 moves! Here's your path:
// [ 6, 7 ]
// [ 7, 5 ]
// [ 5, 4 ]
// [ 3, 3 ]
// [ 1, 2 ]

knightMoves([6, 7], [1, -1]);
// > knightMoves([6,7], [1,-1])
// You entered [1,-1] as the destination. Destination coordinates must be between [0, 0] & [7, 7]

knightMoves([6, -1], [1, 2]);
// > knightMoves([6,-1], [1,2])
// You entered [6,-1] for the starting position. Starting position coordinates must be between [0, 0] & [7, 7]
