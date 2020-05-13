//写出一个数组展开函数，如输入[1,[2,[3,4],2,5,[6]]]

var arr= [[[2,3],1],[2,[3,4],2,5,[6]]]
//method 1
var faltten = function(arr){
	return arr.join().split(',')
}



//method 2
var flatten = (arr) => {
	return arr.reduce((pr,cr,index,arr) => {
		return pr.concat(cr instanceof Array?flatten(cr):[cr])
	},[])
}
flatten(arr)