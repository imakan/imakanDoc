//分时加载函数 

var timeChunk = function(arr,fn,count){
  var t = '';
  var start = function(){
    for(var i = 0;i<Math.min(count || 1,arr.length);i++){
      var obj = arr.shift();
      fn(obj)
    }
  }
  return function(){
    t = setInterval(function(){
      if(arr.length == 0){
        clearInterval(t)
      }
      start()
    },200)
  }
}