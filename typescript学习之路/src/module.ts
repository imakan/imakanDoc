declare function require(path: string): any
declare function define(...args: any[]): any
//  内部模块现在乘坐为命名空间，外部模块简称为模块，
// 也就是 module x 相当于 namespace x {}
//  模块在其自身的作用域里面执行，而不是在全局作用域里。这意味着定义在一个模块里的变量，函数，类等等在模块外部是不可见的，除非你明确第使用export形式导出他们，相反，如果想会用其他模块导出的变量。函数，类 接口，那么必须导入
//  可以使用import形式之一
//  模块是自声明的；两个模块之间的关系是通过文件级别上使用imports和exports建立的
// 如果一个文件不带有顶级的import 或者export 声明，那么它的内容会被视为全局可见，因此对模块也是可见的

// 导出，都能够通过添加exprot关键字来导出。
// implements 实现一个接口，实现一个接口，就要实现这个接口下的所有的方法
export interface StringValidator {
  isAccetable(s: string): boolean
}
export const numberRegexp = /^[0-9]+$/
export class ZipCodeValidator implements StringValidator {
  isAccetable(s: string) {
    return s.length === 5 && numberRegexp.test(s)
  }
}
// 导出jquery
// declare let $:JQuery
// export default $

// export =  和 import = require() 
// CommonJS 和AMD 都有一个exports对象的概念
// export =  对应的是 import x = require('x')

// 想要描述非ts编写的类库的类型，我们需要声明类库所暴露的api 我们叫他声明 因为他不是外部程序的具体实现，他们通常是在.d.ts 文件里定义的 
// 在node.js 里面大部分工作是通过加载一个或者多个模块实现的。我们可以使用顶级的export声明来为每个模块都定义一个.d.ts文件，但最好还是通过写在一个大的.d.ts文件里。我们使用与构造一个外部命名空间相似的方法，但是这里使用module
// module关键字，并且把名字用引号括起来，方便之后import 
// declare module "hot-new-module"; declare d.ts 声明
// import _ = require('lodash')
