问题：隐式转换的规则是什么

> 说起JS的隐式转换规则，我们可以说下JS的基础数据类型

# JS的七中类型
我们所熟知的JS，可以在大体上可以分为2中类型：原始类型，复杂类型（对象类型）

## 原始类型

JS再继续细分的话，原始类型包含：`string`、`number`、`boolean`、`null`、`undefined`、`symbol`

## 对象类型

JS的对象类型包含：`object`


# 三种隐式转换类型


`JS`中一个难点就是隐式转换，因为`JS`在一些操作符下其类型会做一些变化，所以`JS`灵活，同时也会造成一些错误，并且难以理解

这其中涉及隐式转换最多的两个运算符 `+` `==` 

`+`运算符即可数字相加，也可以字符串相加，所以比较麻烦，`==` 不同于 `===`，也存在隐式转换， `*`、`/`、`-`这些操作符都是针对`number`类型的，故转换的结果只能是转换成`number`

隐式转换中主要是三种转换方式：

+ 将值转换为原始值。`toPrimitive(input,type?)`;
+ 将值转换为数字。`toNumber()`
+ 将值转换为字符串。`toString()`

## 通过`toPrimitive()`将值转换为原始值

```javascript
ToPrimitive(input,PreferredType?)
```
`input`是要转换的值，`Preferred`是可选参数，可以是`Number`或者`String`类型。他只是一个转换标志。转换后的结果并不一定是这个参数所代表的类型，但是转换结果一定是个原始值或者是错误


### ToPrimitive(input,number)

- 如果输入的已经是一个原始值，则直接返回它，
- 否则，如果输入的是一个对象，则使用这个对象上面的`valueOf()`方法。如果`valueOf()`返回的是一个原始值，则返回这个原始值
- 否则，调用这个对象上面的`toString()`方法，如果`toString()`方法返回的是一个原始值，则返回这个原始值。
- 否则，抛出一个`typeError`异常

### ToPrimitive(input,string)

- 如果输入的已经是一个原始值，则直接返回它。
- 否则，如果输入的是一个对象，则使用这个对象上面的`toString()`方法。如果`toString()`返回的是一个原始值。则返回这个原始值
- 否则，调用这个对象上面的`vaueOf()`方法，如果`valueOf`方法返回一个原始值，则直接返回
- 否则，抛出`typeError`异常

既然第二个参数是可选的，那么如果我们不填写这个参数的话，怎么转换呢？

规则如下：
1、如果对象是`Date`,则第二个参数是`string`
2、否则是`number`

### `valueOf`方法和`toString`方法解析

`JS`常见内置对象：`Date`、`Array`、`Math`、`Number`、`Boolean`、`String`、`RegExp`、`Function`

1、` Number`、`Boolean`、`String` 这三种构造函数生成的基础值的对象形式，通过`valueOf`转换后会变成相应的原始值。

比如：
```javascript
var num = new Number('123')
num.valueOf(); // 123

var str = new String('12df');
str.valueOf(); // '12df'

var bool = new Boolean('fd');
bool.valueOf(); // true

```

2、`Date`这种特殊的对象，其原型`Date.prototype`上内置的`valueOf`函数是将日期转换为毫秒数的形式的值

```javascript
var a = new Date();
a.valueOf(); // 1515143895500
```

3、除此之外返回的都是他们自己本身

```javascript
var a = new Array();
a.valueOf() === a; // true

var b = new Object({});
b.valueOf() === b; // true

```

上面说了`valueOf`函数，下面说说`toString`函数

1、`Number`、`Boolean`、`String`、`Array`、`Date`、`RegExp`、`Function`这几种构造函数生成的对象，通过`toString`转换后会变成相应的字符串的形式，因为这些构造函数上封装了自己的`toString`方法

```javascript
Number.prototype.hasOwnProperty('toString'); // true
Boolean.prototype.hasOwnProperty('toString'); // true
String.prototype.hasOwnProperty('toString'); // true
Array.prototype.hasOwnProperty('toString'); // true
Date.prototype.hasOwnProperty('toString'); // true
RegExp.prototype.hasOwnProperty('toString'); // true
Function.prototype.hasOwnProperty('toString'); // true

var num = new Number('123sd');
num.toString(); // 'NaN'

var str = new String('12df');
str.toString(); // '12df'

var bool = new Boolean('fd');
bool.toString(); // 'true'

var arr = new Array(1,2);
arr.toString(); // '1,2'

var d = new Date();
d.toString(); // "Wed Oct 11 2017 08:00:00 GMT+0800 (中国标准时间)"

var func = function () {}
func.toString(); // "function () {}"

```
**除了这些对象及其实例化对象之外，其他的对象返回的都是该对象的类型。都是继承的`Object.prototype.toString`**

```javascript
var obj = new Object({})
obj.toString() // '[object object]'

Math.toString(); // "[object Math]"

```

从上面`valueOf`和`toString`两个函数对对象的转换可以看出为什么对于`ToPrimitive(input, PreferredType?)`，`PreferredType`没有设定的时候，除了`Date`类型，`PreferredType`被设置为`String`，其它的会设置成`Number`。
因为`valueOf`函数会将`Number`、`String`、`Boolean`基础类型的对象类型值转换成 基础类型，`Date`类型转换为毫秒数，其它的返回对象本身，而`toString`方法会将所有对象转换为字符串。显然对于大部分对象转换，`valueOf`转换更合理些，因为并没有规定转换类型，应该尽可能保持原有值，而不应该想`toString`方法一样，一股脑将其转换为字符串。
所以对于没有指定`PreferredType`类型时，先进行`valueOf`方法转换更好，故将`PreferredType`设置为`Number`类型。
而对于`Date`类型，其进行`valueOf`转换为毫秒数的`number`类型。在进行隐式转换时，没有指定将其转换为`number`类型时，将其转换为那么大的`number`类型的值显然没有多大意义。（不管是在+运算符还是==运算符）还不如转换为字符串格式的日期，所以默认`Date`类型会优先进行`toString`转换。故有以上的规则：

#### 总结

``PreferredType``没有设置时，`Date`类型的对象，`PreferredType`默认设置为`String`，其他类型对象`PreferredType`默认设置为`Number`。


