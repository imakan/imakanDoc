# Object.defineproperty

其存在两种属性

- 数据描述符

  - configurable:数据可改变
  - enumerable:可枚举
  - value:属性值
  - writable:可读写

- 存取描述符
  - get:一个给属性提供 getter 的方法，如果没有 getter 则为 undefined
  - set:一个给属性提供 setter 的方法，如果没有 setter 则为 undefined

# Proxy

Proxy 意思为代理，即在访问对象之前建立一道拦截。任何访问该对象的操作之前都会通过这道'拦截'，即执行 Proxy 里面定义的方法，也就是第二个参数 handler

```javascript
let pro = new Proxy(target, handler);
```

- new Proxy()表示生成一个 Proxy 实例
- target 参数表示所要拦截的目前对象
- handler 参数也是一个对象，用来定制拦截行为

proxy 支持 13 中拦截行为（handle）

- get (target,propKey,receiver)

- set (target,propKey,value,receiver)
