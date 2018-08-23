namespace classes {
  class Person {
    protected name: string;
    protected name2: string
    constructor(name: string, name2: string, name3: string, name4: string) { this.name = name; this.name2 = name2 }
  }
  class Employee extends Person {
    private department: string;
    constructor(name: string, name2: string, name3: string, name4: string, department: string) {
      super(name, name2, name3, name4)
      this.department = department;
    }

    public getElevatorPitch() {
      console.log(this.name2)
      return `Hello, my name is ${this.name} and I work in ${this.department}.`;
    }
  }
  let howard = new Employee("Howard", '111', "Sales", '', '');
  console.log(howard.getElevatorPitch());
}
//  只读属性必须在声明或者构造函数里被初始化

class Octopus {
  readonly name:string
  readonly numberOfLegs:number = 8
  constructor (tagName:string){
    this.name = tagName
  }
}
let dada = new Octopus('asas')

class Grid {
  static origin = {x: 0, y: 0};
  calculateDistanceFromOrigin(point: {x: number; y: number;}) {
      let xDist = (point.x - Grid.origin.x);
      let yDist = (point.y - Grid.origin.y);
      return Math.sqrt(xDist * xDist + yDist * yDist) / this.scale;
  }
  constructor (public scale: number) { }
}

let grid1 = new Grid(1.0);  // 1x scale
let grid2 = new Grid(5.0);  // 5x scale

console.log(grid1.calculateDistanceFromOrigin({x: 10, y: 10}));
console.log(grid2.calculateDistanceFromOrigin({x: 10, y: 10}));