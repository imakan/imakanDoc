# vm.$nextTick([callback])

将回调延迟下次DOM更新循环之后执行，在修改数据之后立即使用它，然后等待DOM更新。它跟全局Vue.nextTick一样，但是`this`自动绑定到调用他的实例上

>>  2.10起新增，如果没有提供回调且在支持Promise的环境中，则返回一个Promise。请注意Vue不自带polyfill,如果宿主浏览器不支持promise。需要自行polyfill

```es6
new Vue({
  // ...
  methods: {
    // ...
    example: function () {
      // 修改数据
      this.message = 'changed'
      // DOM 还没有更新
      this.$nextTick(function () {
        // DOM 现在更新了
        // `this` 绑定到当前实例
        this.doSomethingElse()
      })
    }
  }
})
```