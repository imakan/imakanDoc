namespace interface {

  // ts的核心原则之一是对值所具有的结构进行类型检查 接口的作用就是为这些类型命名和为你的代码或第三方代码定义契约
  interface labelObj {
    label: string
  }
  interface SquareConfig {
    color?: string
    width?: number
  }
  function createSquareConfig(config: SquareConfig): { color: string; area: number } {
    let newSquare = { color: "white", area: 100 };
    if (config.color) {
      newSquare.color = config.color
    }
    if (config.width) {
      newSquare.area = config.width ** 2
    }
    return newSquare
  }
  let mySquare = createSquareConfig({ color: 'black' })

  interface Point {
    readonly x: number
    readonly y: number
  }
  let p1: Point = { x: 10, y: 10 }

  // TypeScript 具有ReadonlyArray<T>类型，与Array<T>相似，只是把所有可变方法去掉了，因此可以确保数组创建后再也不能被修改

  let a: number[] = [1, 2, 3, 4]
  let ro: ReadonlyArray<number> = a
  a = ro as number[]
  interface SquareConfigs {
    color?: string
    width?: number
    [propName: string]: any
  }
  interface SearchFunc {
    (source: string, subString: string): boolean
  }
  let mySearch: SearchFunc
  mySearch = function (source: string, subString: string) {
    return false
  }
  interface StringArray {
    [index: number]: string
  }

  let myArray: StringArray
  myArray = ['1', '2']
  let myStr: string = myArray[0]
  class Animal {
    name: string;
  }
  class Dog extends Animal {
    breed: string;
  }

  // 错误：使用数值型的字符串索引，有时会得到完全不同的Animal!
  interface NotOkay {
    [x: string]: Animal
  }

  interface ReadonlyStringArray {
    readonly [index: number]: string
  }
  let myArrays: ReadonlyStringArray = ['1', '2']
  myArrays[2]

  // 类类型 
  // 实现接口 
  // TS 能够用它来明确的强制轶哥类去符合某种契约
  // interface ClockInterface {
  //   currentTime: Date
  // }
  // class Clock implements ClockInterface {
  //   currentTime: Date
  //   constructor(h: number, m: number) { }
  // }
  interface ClockConstructor {
    new(hour: number, minute: number);
  }
  interface ClockInterface {
    tick();
  }
  function createClock(ctor: ClockConstructor, hour: number, minute: number): ClockInterface {
    return new ctor(hour, minute);
  }
  interface Shape {
    color: string;
  }
  interface Square extends Shape {
    sideLength: number;
  }
  let square = <Square>{};
  square.color = "blue";
  square.sideLength = 10;

















}