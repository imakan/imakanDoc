问题： new的实现原理是什么

比如我们new A() 

1、创建一个空对象，构造函数中的this指向这个空对象
2、将A的原型链连接到这个空对象上，
3、执行constructor方法，然后将上面的属性和方法指向this引用的这个对象
4、constructor如果没有返回，则this指向这个空对象，如果constructor返回了对象，那么this指向的就是这个返回的对象