组件从概念上讲就像是函数，组件就是一个类或者是一个函数（无状态组件），组件可以接受任何值，属性，函数，组件都可以

自定义组件必须 必须要首字母大写，也就是首字母大写的都是自定义组件

组件的返回值只能有一个根元素，这也是React.Fragment包裹的原因

Props必须是只读的

所有的React组件有一个严格的规则，那就是所有的React组件必须像纯函数那样使用它们的Props，也就是不能改变输入值

React的生命周期

1、组件安装阶段

初始化，constructor

收集初始化属性  getDerivedStateFromProps()

渲染 render()

装载完成 ComponentDidUpdate()


2、组件更新阶段

+ getDerivedStateFromProps

+ scu

+ render()

+ getSnapShotBeforeUpdate

+ componentDidUpdate()