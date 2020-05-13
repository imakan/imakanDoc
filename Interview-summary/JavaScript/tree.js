var tree = {
  name : '中国',
  children : [
    {
      name : '北京',
      children : [
        {
          name : '朝阳群众'
        },
        {
          name : '海淀区'
        },
                {
          name : '昌平区'
        }
      ]
    },
    {
      name : '浙江省',
      children : [
        {
          name : '杭州市',
          code : 0571,
        },
        {
          name : '嘉兴市'
        },
        {
          name : '绍兴市'
        },
        {
          name : '宁波市'
        }
      ]
    }
  ]
};
// 实现一个深度优先搜索算法（非递归） 
let bfs = (tree,name) => {
  //定义一个数组，存放tree，以便于后续的循环，找到我们需要的变量
  var stack = [tree];
  while(stack.length > 0){ //循环当前的stack
    var current = stack[stack.length -1]; //取出数组的最后一个值
    stack.pop()  //删除数组最后一个值
    if(current.name == name){
      if(current.code){
        current.code = 0 + (current.code).toString(8)
      }
      return current;
    }else{
      current.children && current.children.forEach(node => {
        stack.push(node)
      });
    }

  }
}

var result;
//实现一个深度优化搜索算法  递归
let _bfs = (tree,name) => {
  if(tree.name == name){
    if(tree.code){
      tree.code = 0 + (tree.code).toString(8)
    }
    result = tree;
  }else{
    tree.children && tree.children.forEach(node => {
       _bfs(node,name)
    })
  }
  return result;
}
var node = _bfs(tree,'杭州市');
console.log(node)
