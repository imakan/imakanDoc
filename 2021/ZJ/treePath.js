// 输出一个二叉树的所有路径
// 二叉树数据结构

// interface BinTreeNode {
//   value: string;
//   left: BinTreeNode | null;
//   right: BinTreeNode | null;
// }

// 实现函数
function printAllPath(treeNode) {}

/**
 * 如：二叉树为
 *           A
 *          /\
 *         B  D
 *        /\
 *       C E
 *
 *
 *  对应输入：
 */

const treeData = {
  value: "A",
  left: {
    value: "B",
    left: {
      value: "C",
    },
    right: {
      value: "E",
    },
  },
  right: {
    value: "D",
  },
};

// const output = ["A-->B-->C", "A-->B-->E", "A-->D"];

var binaryTreePathsCall = function (root) {
  let path = "";
  let res = [];
  let helper = (root, paths) => {
    if (!root) return;
    path += root.value;
    if (root.left && root.right) {
      res.push(path);
    } else {
      path += "->";
      helper(root.left, path);
      helper(root.right, path);
    }
  };
  helper(root, "");
  return res;
};

let binaryTreePaths = (root) => {
  // 纪录当前节点
  let node;
  // 纪录当前路径
  let path;
  // 路径数组
  let paths = [];
  if (!root) return path;
  // 纪录当前node 数组
  let node_stack = [];
  // 纪录当前路径数组
  let path_stack = [];

  node_stack.push(root);
  path_stack.push(root.value);

  while (!!node_stack.length) {
    node = node_stack.pop();
    path = path_stack.pop();
    if (!node.right && !node.left) {
      paths.push(path);
    }
    if (node.left) {
      node_stack.push(node.left);
      path_stack.push(path + "->" + node.left.value);
    }
  }
};

console.log(binaryTreePathsCall(treeData));
