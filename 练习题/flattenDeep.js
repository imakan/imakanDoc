let arr = [1, [2, [3, [4]], 5,6,[21,33]]];

let flattenDeep = (arr) => {
  return arr.reduce((pr,cr) => {
    return pr.concat(cr instanceof Array ? flattenDeep(cr) : [cr])
  },[])
}
// console.log(flattenDeep(arr));

let fb = (n) => {
  if(n == 1 || n == 0) return n
  return fb(n-1) + fb(n-2)
}
console.log(fb(10))