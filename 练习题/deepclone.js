// 方案一：
// 这种方式，date会变字符串，regexp会变空对象，属性是undefined的会消失
let deepclone = obj => {
  let _obj = JSON.stringify(obj);
  return JSON.parse(_obj);
};

// 方案二：
// let deepclone = obj => {
//   let objClone = obj instanceof Array ? [] : {};
//   for (let key in obj) {
//     if (typeof obj[key] == "object") {
//       objClone[key] = deepclone(obj[key]);
//     } else {
//       objClone[key] = obj[key];
//     }
//   }
//   return objClone;
// };

// 方案三

// Object.prototype.clone = function() {
//   // Handle null or undefined or function
//   if (null == this || "object" != typeof this) return this;
//   // Handle the 3 simple types, Number and String and Boolean
//   if (
//     this instanceof Number ||
//     this instanceof String ||
//     this instanceof Boolean
//   )
//     return this.valueOf();
//   // Handle Date
//   if (this instanceof Date) {
//     var copy = new Date();
//     copy.setTime(this.getTime());
//     return copy;
//   }
//   // Handle Array or Object
//   if (this instanceof Object || this instanceof Array) {
//     var copy = this instanceof Array ? [] : {};
//     for (var attr in this) {
//       if (this.hasOwnProperty(attr))
//         copy[attr] = this[attr] ? this[attr].clone() : this[attr];
//     }
//     return copy;
//   }
// };

Object.prototype.clone = function() {
  if (this == null || typeof this != "object") return this;
  if (
    this instanceof Number ||
    this instanceof String ||
    this instanceof Boolean
  )
    return this.valueOf();
  if (this instanceof Date) {
    let copy = new Date();
    copy.setTime(this.getTime());
    return copy;
  }
  if (this instanceof Object || this instanceof Array) {
    let copy = this instanceof Object ? {} : [];
    for (let attr in this) {
      if (this.hasOwnProperty(attr)) {
        copy[attr] = this[attr] ? this[attr].clone() : this[attr];
      }
    }
  }
};
