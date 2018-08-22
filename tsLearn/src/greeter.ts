// declare function require(path: string): any
// declare function define(...args: any[]): any
import lodash = require('lodash')
import { range } from "lodash";
console.log(lodash)
class Student {
  fullName: string;
  constructor(public firstName, public middle, public lastName) {
    this.fullName = firstName + ' ' + middle + ' ' + lastName
  }
}
interface Person {
  firstName: string
  lastName: string
}
function greeter(person: Person) {
  return 'Hello, ' + person.firstName + ' ' + person.lastName
}
let user = new Student('makan', 'a', 'kan')
console.log(greeter(user))
let a: number = 0
switch (a) {
  case 1:
  case 2:
    console.log(1)
    break
  case 3:
    console.log(1)
    break
  default:
    break
}

function myCoolFunction() {
  console.log(111)
  if (arguments.length == 2 && !Array.isArray(arguments[1])) {
    var f = arguments[0];
    var arr = arguments[1];
  }
}
myCoolFunction()
interface Options {
  color: string
  volume: number
}
var options = {} as Options;
options.color = "red";
options.volume = 11;

declare var foo: string[] | null;

class Point {
  constructor(public x, public y) { }
  getDistance(p: Point) {
    let dx = p.x - this.x;
    let dy = p.y - this.y;
    return Math.sqrt(dx ** 2 + dy ** 2);
  }
}
interface Point {
  distanceFromOrigin(point: Point): number;
}
class C {
  foo!: number;
  bar = "hello";
  baz: boolean | undefined;
  constructor() {
    this.initialize();
  }
  initialize() {
    this.foo = 0;
  }
}
let x!: number[]
init()
function init() {
  x = [0, 1, 2, 3]
}
x.push(4)

for (let i of range(10)) {
  // ...
  console.log(i)
}
const Foo = Symbol("Foo");
const Bar = Symbol("Bar");