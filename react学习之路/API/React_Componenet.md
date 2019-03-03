# 概览

定义`React`组件可以以类或者函数的方式，定义为类的组件目前提供更多特征。继承`React.Component`

在`React.Component`子类中，必须定义唯一方法叫`render()`。其他的方法都是可选的。

**注意在`React Component`中，代码重用主要是通过组合而非通过继承**


#  组件生命周期

## 装载

这些方法会按照下列顺序，在组件实例被创建并插入`DOM`中被调用

+ constructor()
+  static getDerivedStateFromProps()
+  render()
+  componentDidMount()


## 更新

+ static getDerivedStateFromProps()
+ shouldComponentUpdate()
+ render()
+ getSnapshotBeforeUpdate()
+ componentDidUpdate()


## 卸载

当一个组件被从DOM中移除时，该方法被调用

+ componentWillUnmount()

