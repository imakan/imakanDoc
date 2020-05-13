#slot 插槽
用于标记往哪个具名插槽中插入子组件内容。

#slot-scope 

用于将元素或者组件表示为作用域插槽。特性的值应该是可以出现在函数签名的参数位置的合法的JavaScript表达式，

```html
<div class="child">
  <slot text="hello from child"></slot>
</div>
```

```html
<div class="parent">
  <child>
    <template slot-scope="props">
      <span>hello from parent</span>
      <span>{{ props.text }}</span>
    </template>
  </child>
</div>
```