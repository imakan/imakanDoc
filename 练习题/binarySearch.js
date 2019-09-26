/**
 * 二分查找法
 * 先明确一点：二分查找法所查找的数组必须是个有序数组
 * 为什么要是有序数组，因为我们在查找目标元素的时候，需要判断目标值和中间值的大小，如果大于这个中间值，那么我们往后面查找，如果不是有序的，就不能判断了
 * 基本原理：
 * 目标值和我们定义的中间值对比，如果大于中间值，则中间值往后移动，如果小于中间值，则中间值往前移动
 */
let arr = [1, 2, 3, 4, 5, 6, 7];
let inserSort = (arr, dest) => {
  let max = arr.length - 1;
  let min = 0;
  while (min <= max) {
    let mid = Math.floor((max + min) / 2);
    if (arr[mid] === dest) return mid;
    if (dest > arr[mid]) {
      min = mid + 1;
    } else {
      max = mid - 1;
    }
  }
  return -1;
};

console.log(inserSort(arr, 1));
