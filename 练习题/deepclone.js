// 方案一：
// 这种方式，date会变字符串，regexp会变空对象，属性是undefined的会消失
let deepclone = obj => {
  let _obj = JSON.stringify(obj);
  return JSON.parse(_obj);
};

// 方案二：
let deepclone = obj => {
  let objClone = obj instanceof Array ? [] : {};
  for (let key in obj) {
    if (typeof obj[key] == "object") {
      objClone[key] = deepclone(obj[key]);
    } else {
      objClone[key] = obj[key];
    }
  }
  return objClone;
};
