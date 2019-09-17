// // let a = {
// //   [Symbol.toPrimitive]:(function(){})()
// // };
// // console.log(a == 1 && a == 2 && a== 3)

// let obj = {
//   a: {
//     b: {
//       c: {},
//       g: {}
//     },
//     e: {
//       f: {},
//       n: {}
//     }
//   },
//   h: {}
// };

// // 实现效果   [[a,h],[b,e],[c,g],[f,n]]

// let BFS = node => {
//   let arr = [];
//   let stack = [node];
//   while (stack.length) {
//     let temp = [];
//     let obj = stack.shift();
//     for (let key in obj) {
//       temp.push(key);
//       // console.log(obj[key])
//       console.log(obj[key].toString());
//       if (obj[key].toString() == "[object Object]") {
//         stack.push(obj[key]);
//       }
//     }
//     if (temp.length) {
//       arr.push(temp);
//     }
//   }
//   return arr;
// };
// // console.log(BFS(obj));
// const node = {
//   name: "a",
//   children: [
//     { name: "b", children: [{ name: "e" }] },
//     { name: "c", children: [{ name: "f" }] },
//     { name: "d", children: [{ name: "g" }] }
//   ]
// };
// let DFS = (node,arr) => {
//   arr.push(node.name);
//   let children = node.children;
//   if (children) {
//     for (let i = 0; i < children.length; i++) {
//       DFS(children[i],arr);
//     }
//   }
//   return arr;
// };
// console.log(DFS(node,[]));
