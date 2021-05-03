declare interface Book { }
declare interface BookOfSpells extends Book { }
declare class Career { }
class Wizzard<c extends Career> {
  public spellBooks: Array<BookOfSpells>;
  public constructor(career: c) {
    let handler = {
      get(target: any, name: any) {
        let _obj = Object.getPrototypeOf(career);
        if (target[name]) {
          return target[name];
        } else {
          return _obj[name];
        }
      }
    };
    return new Proxy(this, handler);
  }
  public caseSpell() {

  }
}

class Engineer {
  public buildBabel() {
    console.log(1111);
  }
}
// ...
const mike = new Engineer;  // 这个地方写不写都可以 只是一个标准，类似于分号
// 补全代码
const magicMike: any = new Wizzard(mike);

// magicMike.__proto__ = mike;
// Object.setPrototypeOf(magicMike, mike);
// console.log(magicMike.buildBabel())
// // 实现
magicMike.buildBabel();
