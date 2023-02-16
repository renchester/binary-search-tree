import TreeNode from './node.js';

export default class Tree {
  constructor(array) {
    const sortedArray = this.mergeSort(array);
    const cleanedArray = this.cleanArray(sortedArray);

    this.root = this.buildTree(cleanedArray, 0, cleanedArray.length - 1);
  }

  buildTree(array) {
    if (array.length < 1) return null;

    const halfPoint = Math.floor(array.length / 2);
    const root = new TreeNode(array[halfPoint]);

    root.leftNode = this.buildTree(array.slice(0, halfPoint));
    root.rightNode = this.buildTree(array.slice(halfPoint + 1));

    return root;
  }

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

  delete(key) {
    this.root = this.deleteRecursive(key);
  }

  deleteRecursive(key, tempRoot = this.root) {
    if (tempRoot === null) {
      return tempRoot;
    }

    if (key < tempRoot.value) {
      tempRoot.leftNode = this.deleteRecursive(key, tempRoot.leftNode);
    } else if (key > tempRoot.value) {
      tempRoot.rightNode = this.deleteRecursive(key, tempRoot.rightNode);
    } else {
      // if key is same as the node, this node is to be deleted

      // if node has one or no child
      if (tempRoot.leftNode === null) {
        return tempRoot.rightNode;
      } else if (tempRoot.rightNode === null) {
        return tempRoot.leftNode;
      }

      // if node has two or more children: get inorder successor which is smallest in right subtree
      tempRoot.value = this.minValue(tempRoot.rightNode);

      // Delete the inorder successor
      tempRoot.rightNode = this.deleteRecursive(
        tempRoot.value,
        tempRoot.rightNode,
      );
    }

    return tempRoot;
  }

  minValue(tempRoot) {
    let minVal = tempRoot.value;

    while (tempRoot.leftNode !== null) {
      minVal = tempRoot.leftNode.value;
      tempRoot = temp.rightNodeRoot.leftNode;
    }

    return minVal;
  }

  cleanArray(array) {
    // Removes duplicates in array
    return [...new Set(array)];
  }

  mergeSort(arr) {
    // Guard clauses
    if (arr.length === 0)
      return 'Invalid input: Please provide a non-empty array';
    if (arr.length < 2) return arr;

    const halfPoint = Math.floor(arr.length / 2);

    //  Separate array into left and right
    const arr1 = this.mergeSort(arr.slice(0, halfPoint));
    const arr2 = this.mergeSort(arr.slice(halfPoint));

    return this.merge(arr1, arr2);
  }

  merge(arr1, arr2) {
    let i = 0;
    let j = 0;
    let k = 0;

    let arr3 = [];

    while (i < arr1.length && j < arr2.length) {
      if (arr1[i] <= arr2[j]) {
        arr3[k++] = arr1[i++];
      }
      if (arr2[j] < arr1[i]) {
        arr3[k++] = arr2[j++];
      }
    }

    for (; i < arr1.length; i++) arr3[k++] = arr1[i];
    for (; j < arr2.length; j++) arr3[k++] = arr2[j];

    return arr3;
  }
}

const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node.rightNode !== null) {
    prettyPrint(node.rightNode, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.value}`);
  if (node.leftNode !== null) {
    prettyPrint(node.leftNode, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
};

const one = new Tree([0, 1, 2, 3, 4, 5, 6, 7, 8]);
one.insert(3.5);
one.insert(1);
prettyPrint(one.root);

one.delete(2);
prettyPrint(one.root);

// const two = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
// prettyPrint(two.root);

// const four = new Tree([0, 1, 2, 3, 4, 5, 6, 7]);
// prettyPrint(four.root);

// const three = new Tree([0, 0, 0, 1, 2, 3, 4, 4, 4, 5, 6, 7, 8, 8, 9]);
// prettyPrint(three.root);

//   buildTree(array, start, end) {
//     if (start > end) return null;

//     const halfPoint = Math.floor((+start + +end) / 2);
//     const root = new TreeNode(array[halfPoint]);

//     root.leftNode = this.buildTree(array, start, halfPoint - 1);
//     root.rightNode = this.buildTree(array, halfPoint + 1, end);

//     return root;
//   }
