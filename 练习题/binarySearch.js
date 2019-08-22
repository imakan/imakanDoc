/**
 * 二分查找法
 * 首先明确一点就是二分查找法是一个有序数组
 * 为什么要是一个有序数组呢？因为我们在实现的时候需要判断中间值，和目标朱的大小，大于的话，查找初始点需要往后移动。
 * 基本思想：
 * 初始化一个数组的长度-1，定义为max 因为arr[max + min ] 需要-1
 * 初始化一个0,定义为min
 * 获取这个最大值和min之间的中间长度
 * 目标值大于数组中间值，说明目标值在数组中间值右边，此时我们再取中间值，应该是原来的数组长度的中间数+1 到数组长度
 * 目标值小于数组中间值。说明目标值在数组中间值的左边，此时我们再取中间值，应该是原来的数组长度的中间值到0
 *
 */
let arr = [1, 2, 3, 4, 5, 6, 7]; //
let binarySearch = (arr, dest) => {
  let max = arr.length-1; // 获取数组长度
  let min = 0; // 定义 m 到 length的长度区间
  while (min <= max) {
    let mid = Math.floor((min + max) / 2);
    if (dest > arr[mid]) {
      min = mid + 1;
    } else if (dest < arr[mid]) {
      max = mid - 1;
    } else {
      return mid;
    }
  }
  return -1;
};

console.log(binarySearch(arr, 8));
