var currying = function(fn){
  var args = [];
  return function(){
    if(arguments.length == 0){
      return fn.apply(this,args);
    }else{
      [].push.apply(args,arguments);
      return arguments.callee;
    }
  }
}
var sum = function(arr){
  return arr.reduce((pre,cur) => {
    return pre+cur
  },0)
}
var s = currying(sum);
s(1)(2)(3)
