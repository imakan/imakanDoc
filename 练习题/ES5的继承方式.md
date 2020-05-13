# 问ES5有几种继承方式？分别有哪些优缺点

+ 1、apply、call 在子类中调用 比如 
  ```javascript
  function SubType(name){
    SuperType.call(this,name)
  }
  ```

+ 2、直接赋值__proto__

+ 3、赋值原型链对象prototype

ES6中有extends