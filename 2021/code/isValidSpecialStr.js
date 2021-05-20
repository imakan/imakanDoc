// 检测有效的括号

const isValidateStr = (str) => {
  const strObj = { "{": "}", "(": ")", "[": "]" };
  const tempArr = [];
  for (let item in strObj) {
    tempArr.push(strObj[item]);
  }
  console.log(tempArr);
  const stack = [];
  for (let s of str) {
    if (s in strObj) {
      stack.push(s);
    } else if (tempArr.includes(s)) {
      let temp = stack.shift();
      if (strObj[temp] !== s) {
        return false;
      }
    }
  }
  if (stack.length !== 0) {
    return false;
  }
  return true;
};

console.log(isValidateStr("我是{ss,(1212),[ww1]"));
