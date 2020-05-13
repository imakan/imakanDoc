var tree = {
  value: 1,
  left: {
    value: 2,
    left: {
      value: 4
    }
  },
  right: {
    value: 3,
    left: {
      value: 5,
      left: {
        value: 7
      },
      right: {
        value: 8
      }
    },
    right: {
      value: 6
    }
  }
}
//非递归的方式
var levelOrderTraversal = function(node) {
  if(!node){
    console.log('不能为空')
    return false
  }
  var stack = [node];
  while(stack.length){
    var node = stack.shift();
    node.right && stack.push(node.right)
    node.left && stack.push(node.left)
    console.log(node.value)
  }
}
//递归的方式
var _levelOrderTraversal = function(node){
  if(node){
    _levelOrderTraversal(node.left)
    _levelOrderTraversal(node.right)
  }
}
levelOrderTraversal(tree)