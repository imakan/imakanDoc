// 实现一个deepClone

const getType = (key) => {
  return Object.prototype.toString.call(key);
};
const OBJTYPE = "[object object]";
const ARRAYTYPE = "[object array]";
const STRTYPE = "[object string]";
const NUMTYPE = "[object number]";
const REGTYPE = "[object RegExp]";
const DATETYPE = "[object Date]";
const FUNTYPE = "[object Function]";
const clone = (target, newTarget) => {
  if (Object.prototype.toString.call(target) !== "[object object]") {
    return target;
  } else {
    for (let item in target) {
      //   如果是数组
      if (getType(target[item]) === ARRAYTYPE) {
        target[item].forEach((child) => {
          clone(child, newTarget[item]);
        });
      } else if (getType(target[item]) === REGTYPE) {
        newTarget[item] = new RegExp(target[item]);
      } else if (getType(target[item] === DATETYPE)) {
        newTarget[item] = new Date(target[item]);
      } else if (getType(target[item]) === OBJTYPE) {
        // 对象类型
        clone(target[item], newTarget[item]);
      } else {
        newTarget[item] = target[item];
      }
    }
  }
  return newTarget;
};
