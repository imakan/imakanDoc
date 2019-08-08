// 二分法查找也要先排序
let arr = [1, 2, 3, 4, 5, 6, 7];
let binarySearch = (arr, dest) => {
  let len = arr.length;
  let temp = 0;
  while (temp <= len) {
    let half = Math.floor((temp + len) / 2);
    if (dest == arr[half]) return half;
    if (dest < arr[half]) {
      temp = half - 1;
    } else {
      temp = half + 1;
    }
  }
  return temp;
};

console.log(binarySearch(arr, 6));
