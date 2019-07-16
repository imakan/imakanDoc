# cli工具

1、使用 Create Next App工具
2、getInitialProps仅在link组件变化，或者动态改变路由时才会调用，尽量在pages中使用getInitiaProps
3、prefetch 预期页面


```javascript
const withTypescript = require('@zeit/next-typescript');
const withSass = require('@zeit/next-sass');

module.exports = withTypescript(
  withSass({
    webpack(config, options) {
      // Further custom configuration here
      return config;
    }
  })
);
```