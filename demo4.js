// let template = str => {
//   return obj => {
//     let regex = "";
//     let value = "";
//     for (let key in obj) {
//       regex = new RegExp(`{{ ${key} }}`, "g");
//       value = obj[key];
//       str = str.replace(regex, value);
//     }
//     return str
//   };
// };
// var tpl = template("hey there {{ name }},{{ age }}");
// console.log(tpl({ name: "Neo", age: 22 }));

Object.prototype.clone = function() {
  if (this == null || typeof this != "object") return this;
  if (
    this instanceof Number ||
    this instanceof String ||
    this instanceof Boolean || 
    this instanceof RegExp
  )
    return this.valueOf();
  if (this instanceof Date) {
    let copy = new Date();
    copy.setTime(this.getTime());
    return copy;
  }
  if (this instanceof Object || this instanceof Array) {
    let copy = this instanceof Object ? {} : [];
    let attr;
    for (attr of Reflect.ownKeys(this)) {
      // console.log(attr)
      copy[attr] = this[attr] ? this[attr].clone() : this[attr];
    }
    return copy
  }
  
};

let b = Symbol("b");
let a = {
  [b]: 222,
  name:'makan',
  time:new Date().getTime(),
  reg:new RegExp('[0-9]','g'),
  obj:{
    age:111
  }
};
let c1 = a.clone();
c1.name= '张三'
a[b] = 111
console.log(a)
console.log(c1)
