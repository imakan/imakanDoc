# 封装

封装的目的就是将信息隐藏起来。在其他语言（除JavaScript以外），封装都是由语法解析来实现的，比如private、public、protect等关键字，JavaScript中只能**依赖变量的作用域来**实现封装，而且只能模拟出public和private这两种特性。

## 封装数据

除了ES6中提供了let之外，一般我们通过函数来创建作用域
```
var myName = (function(){
  var __name = 'seven';
  return {
    getName:function (){
      return __name
    }
  }
})();
console.log(myName.__name) //undefined;
console.log(myName.getName());//seven
```
**  ES6 提供了Symbol创建私有属性

## 封装实现

封装实现细节来讲，封装应该被视为“任何形式的封装”，封装不仅仅是隐藏数据，还包括隐藏实现细节，设计细节，以及隐藏对象的类型

比如封装一个自己的 ` each` 方法

```
let each = function(arr,callback){
  for(var i=0,l=arr.length;i<l;i++){
    //把下标和元素党组参数给callback 
    callback(arr[i],i.arr[i])
  }
}
each([1,2,3],function(i,n){
  console.log(i,n)
})
```