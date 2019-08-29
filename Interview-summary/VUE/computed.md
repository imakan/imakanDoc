# 计算属性
Vue里面的Computed属性非常的频繁的被使用到，但并不是很清楚他的实现原理，比如：计算属性如何与属性建立依赖关系？属性发生变化又如何通知到计算属性重新计算？

我的想法：利用JavaScript的单线程的原理和Vue的Getter设计，通过一个简单的发布订阅，就可以再一次计算属性求值的过程中收集到相关依赖。

# data 属性初始化getter setter

```javascript
Object.defineProperty(obj,key,{
  enumerable:true,
  configurable:true,
  get:function reactiveGetter(){
    const value = getter?getter.call(obj):val
    //判断是否处于依赖收集状态
    if(Dep.target){
      dep.depend()
    }
    return value;
  }
  set:function reactiveSetter(newVal){
    ....
    dep.notify()
  }
})

```

# computer 计算属性初始化

```javascript
//初始化计算属性
function initComputed(vm:Component,computed:Object){
  ...
  //遍历computed 计算属性
  for(const key in computed){
    //创建Watcher实例
    //created internal watcher for the computed property.
    watchers[key] = new Watcher(vm,getter || noop,noop,computedWatcherOptions)

    //创建属性vm.reversedMessage,并将提供的函数将用作属性vm.reversedMessage的getter
    // 最终commouted 与 data 会一起混合到vm下，所以当computed 与 data 存在重名属性时会发出警告
    defindComputed(vm,key,userDef)
    ...
  }
}
export function defineComputed (target: any, key: string, userDef: Object | Function) {
  ...
  // 创建 get set 方法
  sharedPropertyDefinition.get = createComputedGetter(key)
  sharedPropertyDefinition.set = noop
  ...
  // 创建属性 vm.reversedMessage，并初始化 getter setter
  Object.defineProperty(target, key, sharedPropertyDefinition)
}
function createComputedGetter (key) {
  return function computedGetter () {
    const watcher = this._computedWatchers && this._computedWatchers[key]
    if (watcher) {
      if (watcher.dirty) {
        // watcher 暴露 evaluate 方法用于取值操作
        watcher.evaluate()
      }
      // 同第1步，判断是否处于依赖收集状态
      if (Dep.target) {
        watcher.depend()
      }
      return watcher.value
    }
  }
}
```

**无论是属性还是计算属性，都会生成一个对应的watcher实例** 

```javascript
// src/core/observer/watcher.js

// 当通过 vm.reversedMessage 获取计算属性时，就会进到这个 getter 方法
get () {
  // this 指的是 watcher 实例
  // 将当前 watcher 实例暂存到 Dep.target，这就表示开启了依赖收集任务
  pushTarget(this)
  let value
  const vm = this.vm
  try {
    // 在执行 vm.reversedMessage 的函调函数时，会触发属性（步骤1）和计算属性（步骤2）的 getter
    // 在这个执行过程中，就可以收集到 vm.reversedMessage 的依赖了
    value = this.getter.call(vm, vm)
  } catch (e) {
    if (this.user) {
      handleError(e, vm, `getter for watcher "${this.expression}"`)
    } else {
      throw e
    }
  } finally {
    if (this.deep) {
      traverse(value)
    }
    // 结束依赖收集任务
    popTarget()
    this.cleanupDeps()
  }
  return value
}
```
上面多出提到了 dep.depend, dep.notify, Dep.target，那么 Dep 究竟是什么呢？

Dep 的代码短小精悍，但却承担着非常重要的依赖收集环节。

```javascript
// src/core/observer/dep.js

export default class Dep {
  static target: ?Watcher;
  id: number;
  subs: Array<Watcher>;

  constructor () {
    this.id = uid++
    this.subs = []
  }

  addSub (sub: Watcher) {
    this.subs.push(sub)
  }

  removeSub (sub: Watcher) {
    remove(this.subs, sub)
  }

  depend () {
    if (Dep.target) {
      Dep.target.addDep(this)
    }
  }

  notify () {
    const subs = this.subs.slice()
    for (let i = 0, l = subs.length; i < l; i++) {
      // 更新 watcher 的值，与 watcher.evaluate() 类似，
      // 但 update 是给依赖变化时使用的，包含对 watch 的处理
      subs[i].update()
    }
  }
}

// 当首次计算 computed 属性的值时，Dep 将会在计算期间对依赖进行收集
Dep.target = null
const targetStack = []

export function pushTarget (_target: Watcher) {
  // 在一次依赖收集期间，如果有其他依赖收集任务开始（比如：当前 computed 计算属性嵌套其他 computed 计算属性），
  // 那么将会把当前 target 暂存到 targetStack，先进行其他 target 的依赖收集，
  if (Dep.target) targetStack.push(Dep.target)
  Dep.target = _target
}

export function popTarget () {
  // 当嵌套的依赖收集任务完成后，将 target 恢复为上一层的 Watcher，并继续做依赖收集
  Dep.target = targetStack.pop()
}
```

## 总结
总结一下依赖收集，动态计算的流程，
```
1、data初始化属性 getter setter 
2、computed 计算属性初始化，提供的函数将用作属性vm.reserveMessage的getter
3、当首次获取reverseMessage 计算属性的值时，Dep开始依赖收集
4、在执行 message getter 方法时，如果 Dep 处于依赖收集状态，则判定 message 为 reversedMessage 的依赖，并建立依赖关系
5、当message发生变化是，触发reserveMessage的重新计算
```

vue的数据双向绑定是 
```javascript
object.definedProperty({
  enumerable:true,
  configurable:true,
  get:function reactiveGetter(){

  }
})
```

<!-- data属性初始化数据  提供核心数据getter setter 方法
computed初始化数据，遍历每一个属性，每一个属性都有自己的dep和生成的watcher,computed每一个函数都将作为属性，message作为该属性的依赖，然后message发生变化，那么就会动态计算该属性 -->


