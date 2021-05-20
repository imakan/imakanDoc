// 编程题：实现一个有权重的抽奖函数

/**
 * 请实现抽奖函数rand，保证随机性
 * 输入为表示对象数组，对象有属性n表示人名，w表示权重
 * 随机返回一个中奖人名，中奖概率和w成正比
 */
/**
 * 思路：
 *  随机返回一个中奖人名，中奖概率和w成正比
 *  1、求出每个人名的中奖权重 小数
 *  1、随机打乱数组
 *  2、循环数组 Math.random*arr.length < item.w
 *
 */

const shuffle = (arr) => {
  let random = 0;
  let result = [];
  while (arr.length) {
    random = Math.floor(Math.random() * arr.length);
    result.push(arr[random]);
    arr.splice(random, 1);
  }
};

let people = [
  { n: "p1", w: 100 },
  { n: "p2", w: 200 },
];

let rand = (arr) => {
  let total = 0;
  let random = 0;
  let result = "";
  arr.forEach((item) => {
    total += item.w;
    item.rate = 0;
  });

  arr.forEach((item) => {
    item.rate = item.w / total;
  });

  let randomArr = [];
  while (arr.length) {
    random = Math.floor(Math.random() * arr.length);
    randomArr.push(arr[random]);
    arr.splice(random, 1);
  }

  const getResult = () => {
    randomArr.forEach((item, index) => {
      if (item.rate > Math.random() * randomArr.length) {
        result = item.n;
        return false;
      } else if (index === randomArr.length - 1) {
        getResult();
      }
    });
  };
  getResult();

  return result;
};

console.log(rand(people));
