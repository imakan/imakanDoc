// 先排序，然后再return arr[k-1]呀
// 这道题考察的是排序算法

var twoSum = function (nums, target) {
  const comp = {};
  for (let i = 0; i < nums.length; i++) {
    if (comp[target - nums[i]] >= 0) {
      return [comp[target - nums[i]], i];
    }
    comp[nums[i]] = i;
  }
};
