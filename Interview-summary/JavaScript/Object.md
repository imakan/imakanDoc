# getOwnPropertyDescriptor

## Object.getOwnPropertyDescriptor返回某个对象属性的描述对象

例如：

```es6
var obj = { p: 'a' };  
Object.getOwnPropertyDescriptor(obj, 'p')  
// Object { value: "a",  
// writable: true,  
// enumerable: true,  
// configurable: true  
// }  
```

## Object.getOwnpropertyDescriptors 返回指定对象的所有自身属性，不包含继承属性的描述对象,包含set get 方法，用于深克隆对象

例如：

```es6
const obj = {  
    foo: 123,  
    get bar() { return 'abc' }  
};  
Object.getOwnPropertyDescriptors(obj)  
// { foo:  
// { value: 123,  
// writable: true,  
// enumerable: true,  
// configurable: true },  
// bar:  
// { get: [Function: bar],  
// set: undefined,  
// enumerable: true,  
// configurable: true } }  
```