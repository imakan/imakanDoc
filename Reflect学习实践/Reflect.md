ES6新增了Reflect方法，这个方法目前是和Object一样，我们能在Object上面获取的东西，在Reflect上面也可以获取，但是由于Object上面有一个语言内部的方法，比如是Object.definedProperty等，想把这种单独拿出来，挂载到Reflect上面，所以新增了Reflect这个，但是现阶段Reflect就是Object

还有就是，在操作一些属性是，比如是defineProperty上面修改一些不允许的属性时，会抛出异常，用Reflect直接返回错误，这个语法更人性化点

还有就是我们在判断一个对象是否有某个属性时，用Reflect的话，更加函数话，Reflect.has(obj,name)

# Reflect.get()

```javascript
let myObj = {
  foo:1,
  bar:2,
  get baz () {
    return this.foo + this.bar
  }
}

Reflect.get(myObj,name)
```

特殊情况

`Reflect.get(target,name,receiver)`

如果传入了第三个参数的话，那么赋值函数的this,就是这个receiver，比如
```javascript
let myObj = {
  foo:1,
  bar:2,
  get baz () {
    return this.foo + this.bar
  }
}
let otherObj = {
  foo:3,
  bar:5,
}
Reflect.get(myObj,'baz',otherObj)
//我们获取baz，这里面的this指向otherObj

```


# Reflect.set(target,name,value,receiver)

```javascript
var myObject = {
  foo: 1,
  set bar(value) {
    return this.foo = value;
  },
}
Reflect.set(myObject,'bar',3)
```

# Reflect.construct(target,args)

这是一种不实用new，但是可以达到new的效果的

JS现有的装饰器，目前无法实现通过反射来获取酒精有哪些装饰器添加到这个类/方法上了

reflect除了获取类型数据外，我们还可以获取自定义的metadatakey,
系统定义的metadata有：
design:type
design:returntype
design:paramtype


在实际开发项目是，我们需要装饰器修改类的行为，那么注解呢？我们需要通过注解添加元数据，然后装饰器获取这些元数据完成对类和方法的修改，