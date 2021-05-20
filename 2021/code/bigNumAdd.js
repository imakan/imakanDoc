// 实现一个加法运算，两个值的大小可能超过js的精度运算

/**
 * 思路：
 *  两个数字假设为a='12345' b='125'；
 *  求两个数字相加，所以要用字符串的形式相加,用数组的方式 对单个元素进行相加,
 *  将a 拆分为 ['1','2','3','4','5']  将b 拆分为 ['0','0','1','2','5']
 *  比较两个数字的长度 算出最长的数据假设为 maxLength 声明sumArr的数组长度为maxLength
 *  申明 carry代表进位
 */

const add = (a, b) => {
  const maxLength = a.length > b.length ? a.length : b.length;
  const Arr1 = a.padStart(maxLength, "0");
  const Arr2 = b.padStart(maxLength, "0");
  let sum = ""; //申明字符串 链接字符
  let t = 0;
  let carry = 0; // 进位
  // 从后往前循环
  for (let i = maxLength - 1; i >= 0; i--) {
    t = parseInt(Arr1[i]) + parseInt(Arr2[i]) + carry;
    carry = Math.floor(t / 10);
    sum = (t % 10) + sum;
  }
  if (carry >= 1) {
    sum = "1" + sum;
  }
  return sum;
};

console.log(add("9007199254740991", "1234567899999999999"));
