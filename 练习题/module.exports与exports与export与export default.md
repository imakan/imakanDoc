# 问： module.exports、exports、export、export default的区别

这个要涉及到了CommonJS和AMD的规范了，module.exports和exports是CMD的规范用法，

+ exports 和  module.exports
  引入需要用require() exports 是module.exports的一个副本，一个文件可以存在多个exports 而只能有一个module.exports了，如果我们在文件中将module.exports赋值后，那么exports就和module.exports没有关系了。

+ export 和 export default
这个两个是es module的用法，引入需要用import，一个文件可以同时存在多个export 比如  export let a = 1;export let b = 2;但是一个页面只能有一个export default



特点：

```javascript
let {stat,,readFile} = require(fs);
// 等同于
let _fs = require('fs');
let stat -= _fs.stat;
let exists -= _fs.exists;
let readFile -= _fs.readFile;
```
上面的这种加载方式其实是“运行时加载”，因为只有运行时才能得到这个对象，导致完全没办法在编译时做"静态优化"

es module
```javascript
import { stat, exists, readFile } from 'fs';
// 这种是编译时加载，上面的代码实质上只加载三个方法，其他的不加载。这种称为编译时加载，或者静态加载，
```

```javascript
export { foo, bar } from 'my_module'; 
// 等价于
import {foo,bar} from '....'
export {foo,bar}
```

因为es6 模块是静态加载，使得静态分析称为可能，也就是webpack的tree-shake

webpack用import() 磨平了 require和 import