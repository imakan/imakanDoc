namespace advancedTypes {
  // 高级类型，
  // 交叉类型是将多个类型合并成为一个类型，这让我们可以把现有的多种类型叠加到一起成为一种类型，
  // 它包含了所需的所有的类型的特性
  function extent<T, U>(first: T, second: U): T & U {
    let result = <T & U>{}
    for (let id in first) {
      (<any>result)[id] = (<any>first)[id]
    }
    for (let id in second) {
      if (!result.hasOwnProperty(id)) {
        (<any>result)[id] = (<any>second)[id]
      }
    }
    return result
  }
  class Person {
    constructor(public name: string) { }
  }
  interface Loggable {
    log(): void;
  }
  class ConsoleLogger implements Loggable {
    log() {

    }
  }
  var jim = extent(new Person('Jim'), new ConsoleLogger())
  // 联合类型
  function padLeft(value: string, padding: string | number) {
    // doSomething
  }
  //  如果一个类型是联合类型，那么我们只能，也只允许访问这些类型中的共有类型
  // 联合类型适合于那些值可以为不同类型的情况
  interface Bird {
    fly();
    layEggs();
  }

  interface Fish {
    swim();
    layEggs();
  }

  function isFish(pet: Fish | Bird) {
    return (<Fish>pet).swim !== undefined
  }
  // pet is Fish  就是谓词
  let s: number | string = '1'
  let sn: string | null | number = '2'
  sn = null
  sn = 111

  // --- 使用strictNullChecks ,可选参数会被自动地加上 undefined 
  function f(x: number, y?: number) {
    return x + 1 + (y || 0)
  }
  interface Persons {

  }
  // keyof Person 
  //  y 会被自动加上undefined 类型
  //  类型别名不能被extends 和implements 自己也不鞥extends 和 implement其他的类型，因为软件中的对象应该对于扩展是
  // 开放的，但是对于修改是封闭的

}