//反转二叉树，就是左边的值赋给右边
//反正二叉树,非递归
var turnTree = function(tree){
  var stack = [tree];
  while(stack.length){
    var node = stack.shift();
    if(node.left){
      stack.push(node.left)
    }
    if(node.right){
      stack.push(node.right)
    }
    var temp = node.left;
    node.left = node.right
    node.right = temp
  }
  return tree
}
//递归的方法
var _turnTree = function(node){
  if(node){
    var temp = node.left;
    node.left = node.right
    node.right = temp;
    _turnTree(node.left)
    _turnTree(node.right)
  }
  return tree
}


console.log(_turnTree(tree))