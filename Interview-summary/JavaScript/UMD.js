(function (name, definition) {
	//检测上下文是否为AMD 或者 CMD;
	var hasDefine = typeof define === 'function';
	//检测上下文是否为node
	var hasExports = typeof module !== 'undefined' && module.exports;
	if (hasDefine) {
		//AMD环境或者是CMD环境
		define(definition)
	} else if (hasExports) {
		//定义为普通Node模块
		module.exports = definition();
	} else {
		//将模块的执行结果挂载window变量中，在浏览器中this指向window对象
		this[name] = definition()
	}
})('filter', function () {
	return ''
})