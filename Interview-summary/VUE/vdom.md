#virtual Dom

![Vnode](/asset/vnode.png)

virtual-dom的概念大规模的推广还是得益于react出现，virtual-dom也是react这个框架的非常重要的特征之一。相比于频繁的手动去操作dom而带来的性能问题，vdom很好的讲dom做了一层映射关系，进而将在我们本需要直接进行dom的一系列操作，映射到了操作vdom,而vdom上定义了关于真实dom的一些关键信息，vdom完全用js去实现，和宿主浏览器没有任何关系，此外得益于js的执行速度，将原本需要在真实dom进行的创建节点，删除节点，添加节点等一系列复杂的dom操作全部放到vdom中进行，这样就就通过vdom来提高直接操作dom的效率和性能。

Vue在2.0版本后也引入了vdom。其vdom算法是基于snabbdom算法所做的修改

在vue的整个生命周期中，每次需要更新视图的时候都会使用vdom，

首先，我们还是来看下Vue生命周期当中初始化的最后阶段：将vm实例挂载到dom上，源码在
[src/core/instance/init.js](https://github.com/vuejs/vue/blob/dev/src/core/instance/init.js#L67-L70)

```javascript
 Vue.prototype._init = function () {
    ...
    vm.$mount(vm.$options.el)  
    ...
}

```

实际上是调用了[src/core/instance/lifecycle.js](https://github.com/vuejs/vue/blob/dev/src/core/instance/lifecycle.js#L139-L202)中的mountComponent方法，
mountComponent函数的定义是：
```es6
export function mountComponent (
  vm: Component,
  el: ?Element,
  hydrating?: boolean
): Component {
  // vm.$el为真实的node
  vm.$el = el
  // 如果vm上没有挂载render函数
  if (!vm.$options.render) {
    // 空节点
    vm.$options.render = createEmptyVNode
  }
  // 钩子函数
  callHook(vm, 'beforeMount')

  let updateComponent
  /* istanbul ignore if */
  if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
    ...
  } else {
    // updateComponent为监听函数, new Watcher(vm, updateComponent, noop)
    updateComponent = () => {
      // Vue.prototype._render 渲染函数
      // vm._render() 返回一个VNode
      // 更新dom
      // vm._render()调用render函数，会返回一个VNode，在生成VNode的过程中，会动态计算getter,同时推入到dep里面
      vm._update(vm._render(), hydrating)
    }
  }

  // 新建一个_watcher对象
  // vm实例上挂载的_watcher主要是为了更新DOM
  // vm/expression/cb
  vm._watcher = new Watcher(vm, updateComponent, noop)
  hydrating = false

  // manually mounted instance, call mounted on self
  // mounted is called for render-created child components in its inserted hook
  if (vm.$vnode == null) {
    vm._isMounted = true
    callHook(vm, 'mounted')
  }
  return vm
}
```
上面的代码中定义了一个updateComponent函数，这个函数执行的额时候内部会调用vm._update(vm._render(),hyddrating)方法，其中vm._render()函数会返回一个vnode，然后传入vm._update方法后，就用这个新的vnode和老的vnode进行diff,最后完成dom的更新工作，
那么updateComponent都是在什么时候进行调用的呢？

```es6
vm._watcher = new Watcher(vm,updateComponent,noop)
```
实例化一个watcher，在求值的过程中this.value = this.lazy ? undefined : this.get()，会调用this.get()方法，因此在实例化的过程当中Dep.target会被设为这个watcher，通过调用vm._render()方法生成新的Vnode并进行diff的过程中完成了模板当中变量依赖收集工作。即这个watcher被添加到了在模板当中所绑定变量的依赖当中。一旦model中的响应式的数据发生了变化，这些响应式的数据所维护的dep数组便会调用dep.notify()方法完成所有依赖遍历执行的工作，这里面就包括了视图的更新即updateComponent方法，它是在mountComponent中的定义的。
updateComponent方法的定义是：

```es6
updateComponent = () => {
  vm._update(vm._render(), hydrating)
}
```
完成视图的更新工作事实上就是调用了vm._update方法，这个方法接收的第一个参数是刚生成的Vnode，调用的`vm._update`方法[(src/core/instance/lifecycle.js)](https://github.com/vuejs/vue/blob/dev/src/core/instance/lifecycle.js#L50-L90)的定义是

```es6
Vue.prototype._update = function (vnode: VNode, hydrating?: boolean) {
    const vm: Component = this
    if (vm._isMounted) {
      callHook(vm, 'beforeUpdate')
    }
    const prevEl = vm.$el
    const prevVnode = vm._vnode
    const prevActiveInstance = activeInstance
    activeInstance = vm
    // 新的vnode
    vm._vnode = vnode
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    // 如果需要diff的prevVnode不存在，那么就用新的vnode创建一个真实dom节点
    if (!prevVnode) {
      // initial render
      // 第一个参数为真实的node节点
      vm.$el = vm.__patch__(
        vm.$el, vnode, hydrating, false /* removeOnly */,
        vm.$options._parentElm,
        vm.$options._refElm
      )
    } else {
      // updates
      // 如果需要diff的prevVnode存在，那么首先对prevVnode和vnode进行diff,并将需要的更新的dom操作已patch的形式打到prevVnode上，并完成真实dom的更新工作
      vm.$el = vm.__patch__(prevVnode, vnode)
    }
    activeInstance = prevActiveInstance
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el
    }
}
```
在这个方法当中最为关键的就是`vm.__patch__`方法，这也是整个`virtaul-dom`当中最为核心的方法，主要完成了prevVnode和vnode的diff过程并根据需要操作的vdom节点打patch，最后生成新的真实dom节点并完成视图的更新工作。


