// let a = 1;

// setTimeout(() => {
//   a = 3;
// }, 2000);

// exports.a = 2;
// // module.exports = { a };
// // 当module.exports 赋值给一个对象的时候，exports就失效了是这个原因

// let temp = [];
// let f = (arr) => {
//   return arr.reduce((pr, cr, index) => {
//    return  cr + arr[index] < 10? [].push([cr,arr[index]]):''
//   },[]);
// }

// arr.reduce((pr, cr, index) => {
//   if (pr + cr < 10) console.log("cr", cr);
//   console.log("index", index);
//   if (pr + arr[index + 1] < 10) {
//     let a = [cr, arr[index + 1]];
//     temp.push(a);
//   }
// });
let arr = [7, 5, 3, 4, 8, 4, 2, 9]
let temp = [];
// let a = [];
// let f = arr => {
//   if(!arr || arr.length <= 0) return false
//   return arr.reduce((pr, cr, index) => {
//     let se = arr[index];
//     let th = arr[index + 1];
//     let item = arr.shift();
//     console.log(se,item,th)
//     if (se + item + th === 10) {
//       a = [se, item, th];
//       console.log(a)
//     }else{
//       f(arr)
//     }
//   });
// };
// console.log(f(arr));
let arr = [7, 5, 3, 4, 8, 4, 2, 9]
let temp = [];
for (let i = 0; i < arr.length; i++) {
  for (let j = i + 1; j < arr.length; j++) {
    if (arr[i] + arr[j] < 10) {
      let a = [arr[i], arr[j]];
      temp.push(a);
    }
  }
}
// O(n^2)
let val = [];
a:for (let i = 0; i < arr.length; i++) {
  b:for (let j = 0; j < temp.length; j++) {
    if (
      arr[i] + temp[j][0] + temp[j][1] === 10 &&
      arr[i] != temp[j][0] &&
      arr[i] != temp[j][1]
    ) {
      val = [arr[i], temp[j][0], temp[j][1]];
      break a;
    }
  }
}
// O(n^2) + O(n^2) = O(n^2)
console.log(val);
