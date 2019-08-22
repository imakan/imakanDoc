let arr = [3, 23, 34, 12, 1, 6, 89, 4];
/**
 * 1、快排
 * 基本思想：
 * 定义两个数组，left数组，right数组，然后从原数组中取出一个值，循环这个数字，如果这个arr[i]大于取出来的数组，
 * 就放入left中，否则放入right中，就这样递归循环，我们传入的数组（参数数组）长度为小于1
 */
// 理想结果：[1, 3, 4, 6, 12, 23, 34, 89]
let quickSort = arr => {
  if (arr.length < 2) return arr;
  let left = [];
  let right = [];
  let mid = arr.splice(Math.floor(arr.length / 2), 1);
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > mid) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  return quickSort(right).concat(mid, quickSort(left));
};
//  快排的时间复杂度是O(nlog2^n)
//  console.log(quickSort(arr))

/**
 * 2、冒泡排序
 * 基本思想:
 *  冒泡的基本思想，两个for循环，第一层循环一次，第二层循环所有元素，然后取出第二层的一个元素，和后面的元素对比
 *  依次循环到数组的最后一个元素，然后在外层的元素继续下一次循环，直到完成所有的交换
 */
// 理想结果：[1, 3, 4, 6, 12, 23, 34, 89]
let bubbleSort = arr => {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        var temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  return arr;
};
// 时间复杂度：O(n^2),两个for循环嵌套
// console.log(bubbleSort(arr));

/**
 * 3、插入排序
 * 基本思想：
 * 我们将数组分为两个，一个有序数组，一个无序数组
 * 先取出来无序数组中的第一个元素，作为有序数组的元素
 * 循环整个无序数组，取出一个元素，作为有序数组，然后和无序数组做对比，放到合适的位置，每次循环无序数组就减少一个，
 * 有序数组就增加一个，知道无序数组的长度为0
 */
// let arr = [23, 3, 34, 12, 1, 6, 89, 4];
// [ 1, 3, 4, 6, 12, 23, 34, 89 ]
let insertSort = arr => {
  let temp = []; // 定义有序数组
  let j = 0; // 定义无序数组的下角标
  for (let i = 1; i < arr.length; i++) {
    j = i - 1;
    temp = arr[i];
    while (j >= 0 && temp < arr[j]) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = temp;
  }
  return arr;
};
// 时间复杂对是 O(n^2)
// console.log(insertSort(arr));
