// 默认的iterator接口部署在数据结构的Symbol.iterator属性上
// next return() 在完成遍历钱需要清理和释放资源 则可以部署return 
// for of 可以用break continue return 配合使用

class RangeIterator {
    constructor(start, stop) {
        this.value = start
        this.stop = stop
    }
    [Symbol.iterator]() { return this }
    next() {
        let value = this.value
        if (value < this.stop) {
            this.value++
            return { done: false, value: value }
        }
        return { done: true, value: undefined }
    }
}

function range(start, stop) {
    return new RangeIterator(start, stop);
}
for (var value of range(0, 3)) {
    console.log(value);
}