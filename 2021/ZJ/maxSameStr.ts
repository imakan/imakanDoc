/**
 * 问题：有两个字符串str和str2，求出两个字符串中最长公共子串长度。
    比如：str=acbcbcef，str2=abcbced，则str和str2的最长公共子串为bcbce，最长公共子串长度为5。
 * 思路：
 * 1、找出两个字符串的最小长度和最大长度
 * 然后循环最小长度的字符串，在大的字符串长度去匹配
 */

const getSameStr = (str1: string, str2: string) => {
  const max = str1.length > str1.length ? str1 : str2;
  const min = max === str1 ? str2 : str1;
  for (let i = 0; i < min.length; i++) {
    for (let j = 0, k = min.length - i; k != min.length + 1; j++, k++) {
      let temp = min.substring(j, k);
      if (max.indexOf(temp) > -1) {
        return temp;
      }
    }
  }
};

console.log(getSameStr("acbcbcef", "abcbced"));
