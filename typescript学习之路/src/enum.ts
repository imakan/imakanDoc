// 默认的枚举是自增长的
namespace enums {
  enum Direction {
    Up = "UP",
    Down = "DOWN",
    Left = "LEFT",
    Right = "RIGHT",
  }
  enum ShapeKind {
    Circle,
    Square,
  }

  interface Circle {
    kind: ShapeKind.Circle;
    radius: number;
  }

  interface Square {
    kind: ShapeKind.Square;
    sideLength: number;
  }
  let c: Circle = {
    kind: ShapeKind.Circle,
    //    ~~~~~~~~~~~~~~~~ Error!
    radius: 100,
  }
  let getSomeValue = () => {
    return 1
  }
  // 首先枚举成员为了类型，例如我们可以说某些成员。只能是枚举成员的值
  // 常量枚举只能使用常量枚举表达式，并且不同于常规的枚举，它们在编译阶段会被删除，常量枚举成员在使用的地方会被内联进来 之所以可以这么做，是因为常量
  // 枚举不允许包含计算成员
  declare enum Enum {
    A = 1,
    B,
    C = 2
  }


}