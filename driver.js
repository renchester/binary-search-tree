import Tree from './tree';

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
one.insert(3.75);
one.insert(3.8);
one.insert(3.9);

one.rebalanceTree();
prettyPrint(one.root);

// one.delete(2);
// prettyPrint(one.root);

// const two = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
// prettyPrint(two.root);

// const four = new Tree([0, 1, 2, 3, 4, 5, 6, 7]);
// prettyPrint(four.root);

// const three = new Tree([0, 0, 0, 1, 2, 3, 4, 4, 4, 5, 6, 7, 8, 8, 9]);
// prettyPrint(three.root);
