# 协调

当拆除一棵树时，旧的DOM节点被销毁，组件实例会被放在`componenentWillUNmount()`，当构建一棵新树时，新的DOM节点会被放在`componentWillmount()`,然后收到`componentDidMount()`。任何与旧树有关的状态都会被丢弃

# 相同类型的组件元素

当组件更新时，实例保持相同，这样状态跨渲染被维护，React通过更新底层组件实例的属性（props）来匹配新元素，并在底层实例上调用`componentWillReceiveProps()`和`componentWillUpdate()`

# 子代上的递归

默认时，当递归DOM节点的子节点时，React就是迭代在同一时间点的两个子节点列表，并在不同时产生一个变更