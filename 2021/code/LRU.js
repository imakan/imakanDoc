/**
 * 1、获取 有的话返回  然后设置成第一个  没有的话返回-1
 * 2、设置 有的话 设置成第一个 没有的话 判断是否超出限制 没有超出设置上 超出的话 删除最后一个  然后设置
 */
class MyLRU {
  constructor(limit) {
    this.limit = limit;
    this.cache = new Map();
  }
  set(key, value) {
    if (this.cache.get(key)) {
      this.cache.delete(key);
      this.cache.set(key, value);
    } else {
      if (this.cache.size >= this.limit) {
        this.cache.delete(this.cache.keys().next().value);
      }
      this.cache.set(key, value);
    }
  }
  get(key) {
    let value = this.cache.get(key);
    if (value) {
      this.cache.delete(key);
      this.cache.set(key, val);
      return value;
    } else {
      return -1;
    }
  }
}
