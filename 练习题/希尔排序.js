/**
 * 希尔排序:分组排序，将一个很大的集合，分成几个小数组。进行逻辑分组，然后挨个插入排序
 */

let arr = [1, 2, 4, 3, 5, 7, 8, 6];

let shellSort = arr => {
  // 获取数组的长度
  var len = arr.length,
    temp,
    gap = 1;
  while (gap < len / 3) {
    gap = gap * 3 + 1;
  }
  for (gap; gap > 0; gap = Math.floor(gap / 3)) {
    for (var i = gap; i < len; i++) {
      temp = arr[i];
      for (var j = i - gap; j >= 0 && arr[j] > temp; j -= gap) {
        arr[j + gap] = arr[j];
      }
      arr[j + gap] = temp;
    }
  }
  // 对数组进行分组；先将gap设置为数组长度的一半
  // for (let gap = len / 2; gap > 0; gap /= 2) {
  //   for (let i = 0; i < gap; i++) {
  //     // 第一个arr[i] arr[i+gap] 下面是插入逻辑
  //     /**
  //      * 将arr[i] 插入到所在分组的正确位置上，组内元素间隔是i+gap
  //      * arr[i] 所在分组是
  //      */
  //     let inserted = arr[i];
  //     let j;
  //     for (j = i - gap; j >= 0 && inserted < arr[j]; j -= gap) {
  //       arr[j + gap] = arr[i];
  //     }
  //     arr[j + gap] = inserted;
  //     console.log(arr);
  //   }
  // }
  return arr
};
console.log(shellSort(arr))
