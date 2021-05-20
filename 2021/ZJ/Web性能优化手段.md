从不同的方便可以说

url --> dns ---> ip ---> nginx ---> service ---> 资源--->浏览器（HTML--> dom tree CSS ---> style tree 布局/绘制 js parse|执行）

# network 层

- https|http2
- dns-prefetch
- preload
- preconnect
- prefetch
- defer async
- nginx cache、gzip、 proxy cache、maxAge、expries last-modify
- cdn

避免重绘和回流

# webpack 层

- 开启 preload
- ddl 动态链
- production
- tree shaking

# dom 层

1、语义化

# css 层

- 雪碧图等
- 动画，独立 layer 渲染 will-change

# js 层

- 减少不必要的包引用（利用 webpack 包分析工具查看包大小）
- 将 long task 分片
- lazy 组件
- 图片延迟加载

其他的性能优化 -- 可以看 performance 面板 火焰图 渲染层
