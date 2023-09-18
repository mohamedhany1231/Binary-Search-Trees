class Node {
  constructor(value, left = null, right = null) {
    this.value = value;
    this.left = left;
    this.right = right;
  }
}

class tree {
  constructor(arr) {
    this.root = buildTree(arr.sort((a, b) => a - b));
  }
  insert(newNode) {
    if (!(newNode instanceof Node)) newNode = new Node(newNode);
    let current = this.root;
    let previous = null;
    while (current != null) {
      previous = current;
      if (current.value > newNode.value) current = current.left;
      else current = current.right;
    }
    if (previous.value > newNode.value) previous.left = newNode;
    else if (previous.value < newNode.value) previous.right = newNode;
    return this.root;
  }
  find(value) {
    let current = this.root;
    while (current != null) {
      if (current.value == value) break;
      if (current.value > value) current = current.left;
      else current = current.right;
    }
    return current;
  }
  delete(value) {
    let current = this.root;
    let previous = null;
    while (current != null) {
      if (current.value == value) break;
      previous = current;

      if (current.value > value) current = current.left;
      else current = current.right;
    }

    if (current == null) return this.root;
    let delNode = current;
    // in case 2 children

    if (delNode.left != null && delNode.right != null) {
      //

      let nextBiggest = delNode.right;
      let nextBiggestPrevious = nextBiggest;
      while (nextBiggest.left != null) {
        nextBiggestPrevious = nextBiggest;
        nextBiggest = nextBiggest.left;
      }
      //   remove next  biggest from the tree
      nextBiggestPrevious.left = nextBiggest.right;

      //   insert next biggest in place of the deleted
      if (delNode == this.root) this.root = nextBiggest;
      else if (delNode == previous.left) previous.left = nextBiggest;
      else previous.right = nextBiggest;
      nextBiggest.left = delNode.left;
      nextBiggest.right = delNode.right;
    } else if (delNode.left != null || delNode.right != null) {
      //

      // in case 1 child
      let childNode = delNode.left != null ? delNode.left : delNode.right;

      if (delNode == this.root) this.root = childNode;
      else if (delNode == previous.left) previous.left = childNode;
      else previous.right = childNode;
    } else {
      if (delNode == this.root) this.root = null;
      else if (delNode == previous.left) previous.left = null;
      else previous.right = null;
      console.log(previous);
    }

    return this.root;
  }
  levelOrder(fun = (elm) => elm, queue = [this.root]) {
    if (queue.length === 0) return [];
    let current = queue[0];
    if (current.left !== null) queue.push(current.left);
    if (current.right !== null) queue.push(current.right);
    queue.shift();

    return [fun(current.value), ...this.levelOrder(fun, queue)];
  }
  levelOrderNoRec(fun = (elm) => elm, queue = [this.root]) {
    let current = queue[0];
    let output = [];
    while (queue.length > 0) {
      if (current.left !== null) queue.push(current.left);
      if (current.right !== null) queue.push(current.right);
      queue.shift();
      output.push(fun(current.value));
      current = queue[0];
    }

    return output;
  }
  inOrder(fun = (elm) => elm, node = this.root) {
    if (node == null) return [];
    return [
      ...this.inOrder(fun, node.left),
      fun(node.value),
      ...this.inOrder(fun, node.right),
    ];
  }
  preOrder(fun = (elm) => elm, node = this.root) {
    if (node == null) return [];
    return [
      fun(node.value),
      ...this.preOrder(fun, node.left),
      ...this.preOrder(fun, node.right),
    ];
  }
  postOrder(fun = (elm) => elm, node = this.root) {
    if (node == null) return [];
    return [
      ...this.postOrder(fun, node.left),
      ...this.postOrder(fun, node.right),
      fun(node.value),
    ];
  }
  height(node) {
    // incase inserted value
    if (!(node instanceof Node)) node = new Node(node);
    let myNode = this.find(node.value);

    let heightsArr = (function inOrder(h, node) {
      if (node == null) return [0];

      return [...inOrder(h + 1, node.left), h, ...inOrder(h + 1, node.right)];
    })(0, myNode);
    return Math.max(...heightsArr);
  }
  depth(node) {
    // incase inserted value
    if (!(node instanceof Node)) node = new Node(node);
    let current = this.root;
    let depth = 0;
    while (current != null) {
      if (current.value == node.value) break;
      depth++;
      if (current.value > node.value) current = current.left;
      else current = current.right;
    }
    return depth;
  }
  isBalanced() {
    return (
      Math.abs(this.height(this.root.left) - this.height(this.root.right)) <= 1
    );
  }
  rebalance() {
    let arr = this.inOrder();
    this.root = buildTree(arr);
    return this.root;
  }
}

function buildTree(arr) {
  // filter duplicates

  arr = arr.filter((elm, i) => arr.indexOf(elm) == i);

  // break condition

  if (arr.length == 0) return null;

  let middle = Math.floor(arr.length / 2);

  let root = new Node(arr[middle]);

  root.left = buildTree([...arr].slice(0, middle));
  root.right = buildTree([...arr].slice(middle + 1));

  return root;
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

// let arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
// // let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];

// let myTree = new tree(arr);
// // prettyPrint(myTree.insert(0.5));
// // prettyPrint(myTree.insert(6));
// prettyPrint(myTree.insert(6));
// // prettyPrint(myTree.delete(8));
// // console.log(myTree.find(67));
// // console.log(myTree.levelOrder((elm) => elm * 2));
// // console.log(myTree.levelOrderNoRec((elm) => elm * 3));
// // console.log(myTree.inOrder((elm) => elm * 2));
// // console.log(myTree.preOrder((elm) => elm * 2));
// // console.log(myTree.postOrder((elm) => elm * 2));
// console.log(myTree.height(8));
// console.log(myTree.depth(3));
// console.log(myTree.isBalanced());

// prettyPrint(myTree.insert(6.1));
// console.log(myTree.isBalanced());
// prettyPrint(myTree.rebalance());
// console.log(myTree.isBalanced());

function arrGenerator(n, min = 0, mult = 1) {
  let arr = [];
  for (let i = 0; i < n; i++) {
    arr.push(min + Math.floor(Math.random() * 100) * mult);
  }
  return arr;
}

let myArr = arrGenerator(11, 100, 2);
let myTree = new tree(myArr);
console.log(myArr);
console.log(myTree.isBalanced());
prettyPrint(myTree.root);

console.log(myTree.levelOrder());
console.log(myTree.preOrder());
console.log(myTree.postOrder());
console.log(myTree.inOrder());

myTree.insert(43);
myTree.insert(41);
myTree.insert(55);
console.log("####add numbers####");
console.log(myTree.isBalanced());

console.log("#### rebalance####");

myTree.rebalance();
console.log(myTree.isBalanced());

prettyPrint(myTree.root);
console.log(myTree.levelOrder());
console.log(myTree.preOrder());
console.log(myTree.postOrder());
console.log(myTree.inOrder());
