const list = [7, 2, 11, 2, 0, 1, 2, 4, 5, 10, 13, 14, 15];
// step1: [0, 1, 2, 4, 5, 7, 10, 11, 13, 14, 15]
// step2: [0,1,2] [4,5] [7] [10,11] [13,14,15]
// step3: ["0->2", "4->5", "7", "10->11", "13->15"]

function summaryRanges(list) {
  // 补全代码
}

const result = summaryRanges(list);
console.log(result); // ["0->2", "4->5", "7", "10->11", "13->15"]

var list = [0, 1, 2, 4, 5, 7, 10, 11, 13, 14, 15];
var summaryRanges = function (nums) {
  let rst = [],
    tem = nums[0];
  nums.map((num, i) => {
    if (nums[i + 1] - num !== 1) {
      num === tem ? rst.push(`${num}`) : rst.push(`${tem}->${num}`);
      tem = nums[i + 1];
    }
  });
  return rst;
};

const result = summaryRanges(list);
console.log(result);
