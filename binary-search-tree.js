class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(array) {
    const sortedArray = this.mergeSortUnique([...new Set(array)]);
    console.log('sorted array -->', sortedArray);
    // i am aware that for performance reasons, i'd want to
    // split up these functions and only use the one which was
    // better suited for the specific solution.
    // The inclusion of both is for learning purposes and simplicity.
    this.rootIterative = this.buildTreeIterative(sortedArray);
    this.root = this.buildTreeRecursive(sortedArray);
  }

  buildTreeIterative(array) {
    if (array.length === 0) return null;

    const mid = Math.floor(array.length / 2);
    const nodeRoot = new Node(array[mid]);

    const q = [
      [nodeRoot, [0, mid - 1]],
      [nodeRoot, [mid + 1, array.length - 1]],
    ];

    while (q.length > 0) {
      const [parent, [left, right]] = q.shift();

      if (left <= right && parent != null) {
        const mid = Math.floor((left + right) / 2);
        const child = new Node(array[mid]);

        if (array[mid] < parent.data) {
          parent.left = child;
        } else {
          parent.right = child;
        }

        q.push([child, [left, mid - 1]]);
        q.push([child, [mid + 1, right]]);
      }
    }

    return nodeRoot;
  }

  buildTreeRecursive(array) {
    if (array.length === 0) return null;

    const mid = Math.floor(array.length / 2);
    const node = new Node(array[mid]);

    node.left = this.buildTreeRecursive(array.slice(0, mid));

    node.right = this.buildTreeRecursive(array.slice(mid + 1));

    return node;
  }

  setRoot(node) {
    this.root = node;
  }

  mergeSortUnique(arr) {
    const array = Array.from(new Set(arr));
    if (array.length === 1) return array;
    const mid = Math.floor(array.length / 2);
    const left = this.mergeSortUnique(array.slice(0, mid));
    const right = this.mergeSortUnique(array.slice(mid));

    const newArray = [];
    let i = 0;
    let j = 0;

    while (i < left.length && j < right.length) {
      if (left[i] < right[j]) {
        newArray.push(left[i++]);
      } else {
        newArray.push(right[j++]);
      }
    }
    while (i < left.length) {
      newArray.push(left[i++]);
    }
    while (j < right.length) {
      newArray.push(right[j++]);
    }
    return newArray;
  }

  insert(value, currentNode = this.root) {
    if (currentNode === null) {
      currentNode = new Node(value);
      return currentNode;
    }

    if (currentNode.data === value) return;

    if (value < currentNode.data) {
      currentNode.left = this.insert(value, currentNode.left);
    } else currentNode.right = this.insert(value, currentNode.right);

    return currentNode;
  }

  delete(value, currentNode = this.root) {
    if (currentNode === null) return currentNode;
    if (value < currentNode.data) {
      currentNode.left = this.delete(value, currentNode.left);
    } else if (value > currentNode.data) {
      currentNode.right = this.delete(value, currentNode.right);
    } else {
      if (currentNode.left === null) {
        return currentNode.right;
      } else if (this.root.right === null) {
        return this.root.left;
      }

      currentNode.data = this.minValue(currentNode.right);
      currentNode.data = this.delete(value, currentNode.right);
    }
    return currentNode;
  }

  minValue(root) {
    let minV = root.data;
    while (!root.left) {
      minV = root.left.data;
    }
  }

  find(value, currentNode = this.root) {
    if (!currentNode || currentNode.data === value) return currentNode;
    if (currentNode.data > value) {
      return this.find(value, currentNode.left);
    } else {
      return this.find(value, currentNode.right);
    }
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

  preOrder(func, currentNode = this.root, noFuncList = []) {
    if (!currentNode) return;
    if (func && typeof func == 'function') {
      currentNode.data = func(currentNode.data);
    } else {
      noFuncList.push(currentNode.data);
    }
    this.preOrder(func, currentNode.left, noFuncList);
    this.preOrder(func, currentNode.right, noFuncList);

    if (noFuncList.length > 0) return noFuncList;
  }

  postOrder(func, currentNode = this.root, noFuncList = []) {
    if (!currentNode) return;

    this.preOrder(func, currentNode.left, noFuncList);
    this.preOrder(func, currentNode.right, noFuncList);
    if (func && typeof func == 'function') {
      currentNode.data = func(currentNode.data);
    } else {
      noFuncList.push(currentNode.data);
    }
    if (noFuncList.length > 0) return noFuncList;
  }

  height(node) {
    if (!node) return -1;
    let left = this.height(node.left) + 1;
    let right = this.height(node.right) + 1;

    return Math.max(left, right);
  }

  depth(node) {
    if (!node || node === this.root) return 0;
    let count = 0;
    let currentNode = this.root;
    while (currentNode !== node) {
      count++;

      if (currentNode.data > node.data) {
        currentNode = currentNode.left;
      } else {
        currentNode = currentNode.right;
      }
    }
    return count;
  }

  isBalanced() {
    if (!this.root) return;

    const q = [this.root];
    while (q.length > 0) {
      const currentNode = q.shift();
      if (
        Math.abs(
          this.height(currentNode.left) - this.height(currentNode.right)
        ) > 1
      ) {
        return false;
      }
      if (currentNode.left) q.push(currentNode.left);
      if (currentNode.right) q.push(currentNode.right);
    }
    return true;
  }

  rebalance() {
    if (this.isBalanced()) return;
    const nodes = this.inOrder(this.root);
    this.root = this.buildTreeRecursive(nodes);
  }
}

module.exports = Tree;
