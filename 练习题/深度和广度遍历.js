// DFS
const node = {
  name: "a",
  children: [
    { name: "b", children: [{ name: "e" }] },
    { name: "c", children: [{ name: "f" }] },
    { name: "d", children: [{ name: "g" }] }
  ]
};

// DFS 使用递归

let DepthFirstSearchDG = (node, nodelist) => {
  if (node) {
    nodelist.push(node.name);
    let children = node.children;
    if(node.children){
      for (let i = 0; i < children.length; i++) {
        DepthFirstSearchDG(children[i], nodelist);
      }
    }
  }
  return nodelist
};
console.log(DepthFirstSearchDG(node, []));

// BFS  广度遍历 即先遍历第一层  然后在遍历第二层
let BroadFirstSearch = (node) => {
  let nodeList = [];
  let stack = [].concat(node);
  if (!node) return "";
  while (stack.length) {
    // 删除元素的最后一个元素
    let item = stack.shift();
    // 存入数组
    nodeList.push(item.name);
    let children = item.children;
    if(item.children){
      for (let i = 0; i < children.length; i++) {
        stack.push(children[i]);
      }
    }
  }
  return nodeList;
}

console.log(BroadFirstSearch(node));