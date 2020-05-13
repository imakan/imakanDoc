// 前端的requestAnimationFrame了解吗？有使用过吗？说一下使用场景。

/**
 * requestAnimationFrame这个方法，目前主要是用来优化动画渲染的方法
 * 说起这个，一般要和setTimeou以及setInterval做比较，
 * 一般情况下，我们家用电脑都是60HZ,也就是显示器一秒刷新60次，大概就是16.7ms刷新一次，也就是绘制一次
 * 我们平时使用的setTimeout以及setInterval，设置延迟执行时间，这个时间精度不准，受限于主程设么时候空间
 * 受限于时间片什么时候执行我们的程序。
 * 
 * requestAnimationFrame使用系统时间间隔。保持最佳绘制效率，不会造成过度绘制。节省cpu资源。
 * 
 */

 // 使用方法

 let animationFrameID = requestAnimationFrame(() => {
   console.log(0)
 })

 cancelAnimationFrame(anmationFrameID)