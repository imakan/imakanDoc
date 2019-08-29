/**
 * 给定一个整数，找出其中和为特定值的那两个数。
 * 你可以假设每个输入都只有一种答案。同样的元素不能被重用。
 * 例如：
 * 给定 nums = [2,7,2,15],target = 9;
 * 因为nums[0] + nums[1] = 2+ 7 = 9 ;
 * 所以返回[0,1]
 **/


var addOfConst = function(arr,target){
  var _result = []
  for(var i = 0;i<arr.length;i++){
    for(var j = i;j<arr.length;j++){
      if(j == i) continue;
      if(arr[i] + arr[j] == target){
        var temp = [];
        temp.push(i,j)
        _result.push(temp)
      }
    }
  }
  console.log(_result)
  return _result;
}
var nums = [2,7,2,11,6,15,3]
addOfConst(nums,9)


var a = '345';
function tm(a){
  var arr = a.split('');
  if(!arr.length) return false;
  var tem = 0;
  var w = 1;
  for(var i = arr.length-1;i>=0;i--){
    tem += (arr[i]*w)
    w = w*10
  }
  return tem;
}


var arr = [];
var start = [];
var end = []
var str = 'dasd<span>111</span>dasdasda<img src="1232">sdasd'
var reg = /<.*(\/)?>/g
function splitFn(str,reg){
  var res = str.split(reg);
  for(var i = 0;i<res.length;i++){
		if(!res[i]){
			var _arr = res.slice(i+1,res.length);
			end = end.concat(_arr)
			break;
    }
    start.push(res[i])
  }
  start = start.join('').split('');
  end = end.join('').split('');
  console.log(start)
  console.log(end)
  matchFn(str,reg,start,end)
}
function matchFn(str,reg,start,end){
  var _arr = str.match(reg).join('').match(/<.*?>(\w+)?(<(\/)?\w+>)?|\w+/g)
  var result = start.concat(_arr,end)
  return result;
}
var _arr1 = splitFn(str,reg)
console.log(_arr1)