/* eslint-disable import/extensions */
/* eslint-disable no-console */
import Tree from './tree.js';

// HELPER FUNCTIONS

const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node.rightNode !== null) {
    prettyPrint(node.rightNode, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.value}`);
  if (node.leftNode !== null) {
    prettyPrint(node.leftNode, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
};

const randomArray = (length, max) =>
  [...new Array(length)].map(() => Math.round(Math.random() * max));

//  DRIVERS

const tester = new Tree(randomArray(30, 1000));
prettyPrint(tester.root);

console.log(tester.isBalanced());
console.log(tester.preorder());
console.log(tester.inorder());
console.log(tester.postorder());

for (let i = 0; i <= 50; i++) {
  tester.insert(Math.ceil(Math.random() * 1000));
}

prettyPrint(tester.root);

console.log(tester.isBalanced());
tester.rebalanceTree();

console.log(tester.isBalanced());
console.log(tester.preorder());
console.log(tester.inorder());
console.log(tester.postorder());
