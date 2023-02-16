import TreeNode from './node.js';

export default class Tree {
  constructor(array) {
    const cleanArray = [...new Set(array.sort((a, b) => a - b))];

    this.root = this.buildTree(cleanArray, 0, cleanArray.length - 1);
  }

  /**
   *
   * @param {Object} tempRoot
   * @returns the minimum value of the node branch
   */
  static #minValue(tempRoot) {
    let minVal = tempRoot.value;

    while (tempRoot.leftNode !== null) {
      minVal = tempRoot.leftNode.value;
      tempRoot = tempRoot.leftNode;
    }

    return minVal;
  }

  /**
   *
   * @param {Array} Takes an array of data and turns it into a balanced binary tree
   * full of sorted Node objects, with duplicates removed.
   *
   * @returns the level-0 root node of the binary tree
   */

  buildTree(array) {
    if (array.length < 1) return null;

    const halfPoint = Math.floor(array.length / 2);
    const root = new TreeNode(array[halfPoint]);

    root.leftNode = this.buildTree(array.slice(0, halfPoint));
    root.rightNode = this.buildTree(array.slice(halfPoint + 1));

    return root;
  }

  /**
   *
   * Inserts a value dynamically into the binary tree--the placement of which is
   * determined on the value of the key
   *
   * @param {*} key
   * @param {Object} tempRoot
   * @returns the tempRoot node
   */

  insert(key, tempRoot = this.root) {
    if (tempRoot === null) {
      tempRoot = new TreeNode(key);
      return tempRoot;
    }

    if (key < tempRoot.value) {
      tempRoot.leftNode = this.insert(key, tempRoot.leftNode);
    } else if (key > tempRoot.value) {
      tempRoot.rightNode = this.insert(key, tempRoot.rightNode);
    }

    return tempRoot;
  }

  /**
   *
   * Deletes a node in the binary tree. If the target node has a singular child,
   * the child takes the place of the node. If the target has two children, then the
   * inorder successor(smallest value in the right subtree) takes the place of the node.
   *
   * @param {*} key
   * @param {Object} tempRoot
   * @returns the tempRoot node
   */

  delete(key, tempRoot = this.root) {
    if (tempRoot === null) {
      return tempRoot;
    }

    if (key < tempRoot.value) {
      tempRoot.leftNode = this.delete(key, tempRoot.leftNode);
    } else if (key > tempRoot.value) {
      tempRoot.rightNode = this.delete(key, tempRoot.rightNode);
    } else {
      // if key is same as the node, this node is to be deleted

      // if node has one or no child
      if (tempRoot.leftNode === null) return tempRoot.rightNode;
      if (tempRoot.rightNode === null) return tempRoot.leftNode;

      // if node has two or more children: get inorder successor which is smallest in right subtree
      tempRoot.value = this.#minValue(tempRoot.rightNode);

      // Delete the inorder successor
      tempRoot.rightNode = this.delete(tempRoot.value, tempRoot.rightNode);
    }

    return tempRoot;
  }

  /**
   *
   * @param {*} key
   * @param {Object} tempRoot
   * @returns the node matching the value of the given key
   */

  find(key, tempRoot = this.root) {
    if (tempRoot === null) return tempRoot;

    if (key === tempRoot.value) return tempRoot;
    if (key < tempRoot.value) return this.find(key, tempRoot.leftNode);
    if (key > tempRoot.value) return this.find(key, tempRoot.rightNode);
  }

  /**
   *
   * Traverses the tree in breadth-first level order and provide each node as the
   * argument to the provided callback function. Implemented using a queue structure
   *
   * @param {function} callback. To be executed in the iteration
   * @param {object} tempRoot
   * @returns an array of values iterated if callback is not given
   */

  levelOrder(callback, tempRoot = this.root) {
    const tempQueue = [];
    const queue = [];

    queue.push(tempRoot);

    while (queue.length) {
      // Get first item and dequeue that item
      const temp = queue.shift();

      // Execute callback
      callback ? callback(temp) : tempQueue.push(temp.value);

      // Enqueue left child
      if (temp.leftNode != null) {
        queue.push(temp.leftNode);
      }

      // Enqueue right child
      if (temp.rightNode != null) {
        queue.push(temp.rightNode);
      }
    }

    if (!callback) return tempQueue;
  }

  /**
   *
   * Accepts a node and returns its height. Height is defined as the number
   * of edges in longest path from a given node to a leaf node.
   *
   * @param {object} tempRoot
   * @returns the height value of the binary tree
   */

  height(tempRoot = this.root) {
    if (tempRoot === null) {
      return 0;
    }
    let leftHeight = this.height(tempRoot.leftNode);
    let rightHeight = this.height(tempRoot.rightNode);

    return leftHeight > rightHeight ? ++leftHeight : ++rightHeight;
  }

  /**
   *
   * Accepts a node and returns its depth. Depth is defined as the number
   * of edges in path from a given node to the tree’s root node.
   *
   * @param {*} key
   * @param {object} tempRoot
   * @param {number} depth
   * @returns the depth value of the node given
   */

  depth(key, tempRoot = this.root, depth = 0) {
    let depthVal = depth;

    if (tempRoot.value === key || tempRoot === null) return depthVal;
    if (key < tempRoot.value)
      return this.depth(key, tempRoot.leftNode, ++depthVal);
    if (key > tempRoot.value)
      return this.depth(key, tempRoot.rightNode, ++depthVal);
  }

  // Recursive traversal methods

  /**
   *
   * These traversal methods accept a function parameter with each of these
   * functions traversing the tree in their respective depth-first order and
   * yield each node to the provided function given as an argument.
   *
   * @param {function} callback
   * @param {object} tempRoot
   * @param {*} arr. Placeholder for an array to be returned if callback is not given
   * @returns an array of iterated values if callback is not given
   */

  // left -> root -> right
  inorder(callback, tempRoot = this.root, arr = []) {
    const array = arr;

    if (tempRoot !== null) {
      this.inorder(callback, tempRoot.leftNode, array);
      callback ? callback(tempRoot.value) : array.push(tempRoot.value);
      this.inorder(callback, tempRoot.rightNode, array);
    }

    if (!callback) return array;
  }

  // root -> left -> right
  preorder(callback, tempRoot = this.root, arr = []) {
    const array = arr;

    if (tempRoot !== null) {
      callback ? callback(tempRoot.value) : array.push(tempRoot.value);

      this.preorder(callback, tempRoot.leftNode, array);
      this.preorder(callback, tempRoot.rightNode, array);
    }

    if (!callback) return array;
  }

  //  left -> right -> root
  postorder(callback, tempRoot = this.root, arr = []) {
    const array = arr;

    if (tempRoot !== null) {
      this.postorder(callback, tempRoot.leftNode, array);
      this.postorder(callback, tempRoot.rightNode, array);

      callback ? callback(tempRoot.value) : array.push(tempRoot.value);
    }

    if (!callback) return array;
  }

  /**
   *
   * Checks if the tree is balanced. A balanced tree is one where the
   * difference between heights of left subtree and right subtree of
   * every node is not more than 1.
   *
   * @param {object} tempRoot
   * @returns a Boolean that describes if the tree is balanced
   */

  isBalanced(tempRoot = this.root) {
    if (tempRoot === null) return true;

    const leftHeight = this.height(this.root.leftNode);
    const rightHeight = this.height(this.root.rightNode);

    if (
      Math.abs(leftHeight - rightHeight) <= 1 &&
      this.isBalanced(this.root.leftNode) &&
      this.isBalanced(this.root.rightNode)
    )
      return true;

    return false;
  }

  /**
   * Rebalances an unbalanced tree.
   */

  rebalanceTree() {
    this.root = new Tree(this.inorder()).root;
  }
}
