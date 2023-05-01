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

  // top 3 moves are calculated as difference between the square to move to, and
  findAllMoves(currentPosition) {
    const moveArray = [];
    this.moves.forEach((move) => {
      const x = move[0] + currentPosition[0];
      const y = move[1] + currentPosition[1];
      if (x == this.startingSquare[0] && y == this.startingSquare[1]) return
      if (x < 0 || x > 7 || y < 0 || y > 7) return
      moveArray.push([x, y]);
    });
    return moveArray;
  }

  findBestMoves(moveArray) {
    const nextPositions = []
    
  }

  levelOrder(func) {
    let q = [this.root];
    let noFunc = [];
    while (q.length > 0) {
      const currentNode = q.shift();
      if (func && typeof func == 'function') {
        currentNode.data = func(currentNode.data);
      } else {
        noFunc.push(currentNode.data);
      }
      if (currentNode.left) {
        q.push(currentNode.left);
      }
      if (currentNode.right) {
        q.push(currentNode.right);
      }
    }
    if (noFunc.length > 0) return noFunc;
  }

  inOrder(func, currentNode = this.root, noFuncList = []) {
    if (!currentNode) return;
    this.inOrder(func, currentNode.left, noFuncList);
    if (func && typeof func == 'function') {
      currentNode.data = func(currentNode.data);
    } else {
      noFuncList.push(currentNode.data);
    }
    this.inOrder(func, currentNode.right, noFuncList);

    if (noFuncList.length > 0) return noFuncList;
  }
}

module.exports = Knight;
