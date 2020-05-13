# 继承

## 一、原型链

```
function Super(){}

function Sub(){}

//继承
Sub.prototype = new Super();
//生成实例
var sub = new Sub();
```


* 所有的类型默认原型为Object
* 确认原型和实例的关系

## 二、构造函数

```
function Super(){
  this.name = '张三'
}
function sub(){
  Super.call(this)
}
var sub = new sub();
sub.name
```

* 子类型构造函数可以向超类型构造函数传递参数

```
 function Super(name){
   this.name = name
 }
 function sub(){
   Super.call(this,'王五')
 }
```
## 三、混合继承
即将原型链和构造函数组合在一起
通过原型链对原型属性和方法的继承，通过构造函数对实例属性的继承

```
function Super(){}
function Sub(name){
  //构造函数的继承
  Super.call(this,name)
}

//原型链继承
Sub.prototype = new Super();
//增强对象
Sub.prototype.constructor = Sub;
//生成实例
var sub = new Sub();

```

***   最常用的继承方法   ***

>>   注意： 
>> *  会调用两次超类型的构造函数，一次是在创建子类型原型，一次是在子类型构造函数内部

## 四、原型式继承

记住原型可以基于已有对象创建新对象，同时还不必因创建自定义类型

```
function _object(o){
  //临时构造函数
  function F(){};
  F.prototype = o;
  return new F();
}
var Super = {};
var sub = _object(Super);

```
es5中的Object.create 与 _object实现类似，都是用来创建对象，即副本的

>> *  可以理解为浅拷贝，引用类型依旧回指向同一个地址，与原型链继承一样存在共享值的问题

## 五、 寄生式继承

创建一个仅用于封装继承过程的函数，该函数内部以某种方式增强对象，最后像做完所有工作会后返回对象。

```
function _create(o){
  var clone = _object(0)
  return clone;
}

寄生本质上就是进行浅拷贝后生成了新的对象，然后在新的对象上去添加方法，最后返回该对象。从而实现不对元对象进行修改，并获得了原对象所有方法。
```
## 六、寄生组合式继承

组合式继承会有两次调用超类型构造函数的问题。
```
unction Super() {};

function Sub(name) {
  // 构造函数继承
  Super.call(this, name);  // 第二次调用�Super
};

// 原型链继承
Sub.prototype = new Super();  // 第一次调用Super
// 增强对象
Sub.prototype.constructor = Sub;

// 生成实例
var sub = new Sub();
```
第二次在Sub构造函数内部调用Super时，生成了新的属性，从而屏蔽了原型中（超类型）的同名属性。

寄生组合式继承，**即通过构造函数来继承属性，通过原型链的混成形式来继承方法。**
基本思路是**不必为了指定子类型的原型而调用超类型的构造函数**

```
// 寄生
function inherit(sub, super) {
    var prototype = Object(super.prototype);         // 创建对象，创建超类型原型副本
    prototype.constructor = sub;                     // 增强对象，弥补因重写原型而失去的默认constructor
    sub.prototype = prototype;                       // 指定对象
}
```

修改后的寄生组合模式为
```
function Super() {};

function Sub() {
    // 使用构造函数来继承属性
    Super.call(this);
};

// 使用寄生来混入原型链
_inherit(Sub, Super);

// 生成实例
var sub = new Sub();
```


## object.create 

```
// Super - 父类（superclass）
function Super(){
  this.x = 0;
  this.y = 0;
}

//父类的方法
Super.prototype.move = function(x,y){
  this.x += x;
  this.y += y;
  console.log('Super moved.')
} 

//Sub - 子类（Subclass）
function Sub(){
  Super.call(this)
}

// 子类续承父类
Sub.prototype = Object.create(Super.prototype);
Sub.prototype.constructor = Sub;

// 因为使用“.prototype =...”后,constructor会改变为“=...”的那个
// constructor，所以要重新指定.constructor 为自身。


```

# ES6 class extend

es6的class其实就是个语法糖，babel转出来的依旧是寄生组合式模式