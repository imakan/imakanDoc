let hero1 = {
  name: "赵云",
  hp: "100",
  sp: "100",
  equipment: ["马", "长枪"]
};

// var value = "";
// Object.defineProperty(hero, "hp", {
//   set(val) {
//     console.log("设置属性");
//     return (value = val);
//   },
//   get: () => {
//     return value;
//   }
// });

// hero.hp = "200";

// Object.defineProperty(hero.equipment, "push", {
//   value() {
//     console.log("拦截器");
//     this[this.length] = arguments[0];
//   }
// });

// hero.equipment.push('mmm')
// console.log(hero.equipment)

// // 简化对象或者数组属性变化呢

// let hero = {
//   name: "赵云",
//   age: 25
// };

// let handler = {
//   get(hero, name) {
//     const heroName = `英雄名是${hero.name}`;
//     return heroName;
//   },
//   set(hero, name, value) {
//     console.log(`${hero.name} change to ${value}`);
//     hero[name] = value;
//     return true;
//   }
// };
// let heroProxy = new Proxy(hero, handler);
// console.log(heroProxy.name);
// heroProxy.name = "aaaa";
// console.log(heroProxy.name);

let hero = {
  name: "赵云",
  hp: 100,
  sp: 100,
  equipment: ["马", "长枪"]
};
const handler = {
  set(target, key, value, receiver) {
    //内部调用对应的 Reflect 方法
    const result = Reflect.set(target, key, value, receiver);
    //执行观察者队列
    console.log(111)
    observableArray.forEach(item => {
      item()
    });
    return result;
  }
}; //初始化Proxy对象，设置拦截操作
const createProxy = obj => new Proxy(obj, handler); //初始化观察者队列
const observableArray = new Set();
const heroProxy = createProxy(hero); //将监听函数加入队列
observableArray.add(() => {
  console.log('又加入一个新的实例');
});

heroProxy.name = "黄忠"; // --> 黄忠
heroProxy.name = "黄忠"; // --> 黄忠
heroProxy.name = "111"; // --> 黄忠
