let str = "abcabcabcbbccccc";
str = str
  .split("")
  .sort()
  .join("");
let arr = [...new Set(str.split(""))];
let result = [];
for (let i = 0; i < arr.length; i++) {
  let index = str.indexOf(arr[i]);
  let lastIndex = str.lastIndexOf(arr[i]);
  let _str = str.substr(index, lastIndex - index + 1);
  if (_str.split("").length > result.length) {
    result = _str.split("");
  }
}
console.log("结果是：" + result[0] + "，长度是:" + result.length);
