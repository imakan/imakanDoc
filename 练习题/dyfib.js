/**
 * 使用动态规划计算斐波那契数列
 */
// 基本思想就是想大问题拆分为若干个小问题

//  用递归的方式的话

let fb = n => {
  if (n < 2) return n;
  return fb(n - 1) + fb(n - 2);
};
// 递归的方式，我们可以看出来这种当n变大的时候，拆解代码树 会非常大，递归也会非常慢
// console.log(fb(100))   // 卡死
// 用动态规划的方式

let dyfb = n => {
  if (n < 2) return n;
  // 利用数组去相加，比如arr[3] = arr[2] + arr[1]
  // 因为我们知道arr[0] = 1  arr[1] = 1 arr[2] = 2 arr[3] = 3
  // 所以我们新建数组,新建N个数组
  let arr = Array.of(n);
  arr[0] = 1;
  arr[1] = 1;
  arr[2] = 2;
  arr[3] = 3;
  //....
  for (let i = 2; i <= n; i++) {
    arr[i] = arr[i - 1] + arr[i - 2];
  }
  // console.log(arr)
  return arr[n - 1];
};
//  1 1 2 3 5

console.log(dyfb(1000));
