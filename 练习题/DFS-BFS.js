const node = {
  name: "a",
  children: [
    { name: "b", children: [{ name: "e" }] },
    { name: "c", children: [{ name: "f" }] },
    { name: "d", children: [{ name: "g" }] }
  ]
};

let DFS = node => {
  if (node) {
    let stack = [node];
    let arr = [];
    while (stack.length) {
      let item = stack.pop();
      arr.push(item.name);
      if (item.children) {
        item.children.forEach(v => {
          stack.push(v);
        });
      }
    }
    return arr;
  }
};
console.log(DFS(node));
let BFS = node => {
  if (node) {
    let stack = [node];
    let arr = [];
    while (stack.length) {
      let item = stack.shift();
      arr.push(item.name);
      if (item.children) {
        item.children.forEach(v => {
          stack.push(v);
        });
      }
    }
    return arr;
  }
};
console.log(BFS(node));
