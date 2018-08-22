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

// let a: number[] = [1, 2, 3, 4]
// let ro: Readonly<number> = a

