# 多态

>> 主人家里养了两只动物，分别是一只鸭和一只鸡，当主任向它们发出“叫”的命令时，鸭会“嘎嘎嘎”地叫，而鸡会”咯咯咯“地叫。这两只动物都会以自己的方式来发出叫声。它们同样都是动物，并且可以发出叫声，但是根据主人的指令，它们会各自发出不同的叫声。

多态：同一个操作作用在不同的对象上面，产生不同的结果和不同的解释。换句话说就是，给不同的对象发送同一个消息的时候，这些对象会根据这个消息分别给出不同的反馈。

多态的根本思想就是：把 **做什么** 和 **谁去做** 分离开来，要实现这一点归根结底先要消除类型之间的耦合关系

```
var makeSound = function(animal){
  animal.sound();
}
var Duck = function(){};
Duck.prototype.sound = function(){
  console.log('嘎嘎嘎')
}
var Chicken = function(){};
Chicken.prototype.sound = function(){
  console.log('咯咯咯')
}
makeSound(new Duck());
makeSound(new Chicken());
```