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

  // adds all 8 moves to currentPosition
  getAllMoves(currentPosition) {
    const moveArray = [];
    this.moves.forEach((move) => {
      const x = move[0] + currentPosition[0];
      const y = move[1] + currentPosition[1];
      // if (x == this.startingSquare[0] && y == this.startingSquare[1]) return;
      if (x < 0 || x > 7 || y < 0 || y > 7) return;
      moveArray.push([x, y]);
    });
    return moveArray;
  }

  findShortestPath() {
    const queue = [{ node: new Node(this.startingSquare), depth: 0 }];

    while (queue.length > 0) {
      const { node: currentNode, depth } = queue.shift();

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
        const moveStr = JSON.stringify(move);
        if (!this.visited.has(moveStr)) {
          this.visited.add(moveStr);
          const childNode = new Node(move);
          childNode.parent = currentNode;
          currentNode.children.push(childNode);
          queue.push({ node: childNode, depth: depth + 1 });
        }
      });
    }
    // safety net lol
    return [];
  }
}

function knightMoves(startingSquare, destinationSquare) {
  const ourKnight = new Knight(startingSquare, destinationSquare);
  const shortestPath = ourKnight.findShortestPath();
  return console.log('shortest path', shortestPath);
}

knightMoves([4, 4], [7, 6]);
