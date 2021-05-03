# 解释with关键字

with关键字可以可以改变作用域，提供逐级对象的快捷式访问，比如
```javascript
let obj = {
  a:1,
  b:2,
  c:3
}
with(obj){
  a = 2
  b = 3
}
```
可以快捷式访问到对象的属性

# with的弊端

+ 性能降低
这个主要是因为编译器没办法对with的对象 进行静态词法分析
  
+ 数据泄露 
  
比如：
```javascript
let fo = (obj) {
  with(obj){
    a=2
  }
}
let o1 = {a : 1}
let o2 = {b:1}
fo(o1)
fo(o2)
```
我们执行的时候，发现a成为了全局对象