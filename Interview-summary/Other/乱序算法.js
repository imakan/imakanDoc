/**
描述：任意给你一个数组，请给出一个乱序算法，确保乱序后数组的概率平均。
样例：[1, 2, 3]这个数组，乱序情况有六种123,132,213,231,312,321，这六种情况的平均出现次数均为17%左右。
请实现这个乱序算法，并测试1w次后，每个乱序排列的概率相同。
提示：Fisher–Yates算法
 */

//Fisher–Yates 也称为高纳德随机算法，也就是生成一个有限集合的随机算法，Fisher-Yates是无偏的，每个排列概率都是相同。

/**
 * 算法流程：
 * 需要随机之乱的n个元素的数组A:
 * for i 从n-1到1
 * j<--随机证书（0 =< j <= i）
 */
var arr = [9,3,4,2,6,7,5,1]


/**
 * 随机从数组中抽出一个元素，然后与最后个元素交换，
 * 相当于把这个随机抽取的元素放到了数组最后面去，表示它已经是被随机过了，
 * 同时被换走的那个元素跑到前面去了，会在后续的重复操作中被随机掉。
 * 一轮操作过后，下一轮我们只在剩下的n-1个元素也就是数组的前n-1个元素中进行相同的操作，
 * 直到进行到第一个 array 
 */
function shuffle(arr) {
  var m = arr.length; //数组长度
  var t,i;
  //循环数组
  while(m){
    //随机选出来一个
    i = Math.floor(Math.random()*(m--))
    t = arr[m]
    arr[m] = arr[i];
    arr[i] = t 
  }
  return arr;
}

//用js的方法
//缺点就是随着数组变大，随机性会变小
function _shuffle(arr){
  return arr.sort(function(){
    return Math.random()-0.5
  })
}

var times = 100000;
var res = {};

for(var i = 0;i<100000;i++){
  var arr = shuffle([1,2,3]);
  var key = JSON.stringify(arr);
  res[key]?res[key]++:res[key]=1
}
for(var i in res){
   console.log(res[i])
   res[i] = res[i]/times*100+'%'
}

console.log(res)