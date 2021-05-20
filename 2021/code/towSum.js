// 给定数据[1,2,3,4,5] 和为9 求出下标
let sum = (nums, target) => {
  let hashMap = new Map();
  let result = [];
  let hashSet = new Set();

  nums.forEach((item, index) => {
    // 存入结果
    let temp = target - item;
    hashMap.set(temp, index);
  });
  nums.forEach((item, index) => {
    if (hashMap.get(item) && hashMap.get(item) !== index) {
      result = [hashMap.get(item), index];
    }
  });
  return result;
};

let obj = {
  8: 0,
  7: 1,
  6: 2,
  5: 3,
  4: 4,
};

console.log(sum([1, 2, 3, 4, 5], 9));
