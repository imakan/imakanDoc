// LRU least recently use
/**
 缓存容量 = 2
 LRUCache cache = new LRUCache( 2 )
 cache.put(1, 1);
 cache.put(2, 2);
 cache.get(1); // 返回 1
 cache.put(3, 3); // 该操作会使得关键字 2 作废
 cache.get(2); // 返回 -1 (未找到)
 cache.put(4, 4); // 该操作会使得关键字 1 作废
 cache.get(1); // 返回 -1 (未找到)
 cache.get(3); // 返回 3
 cache.get(4); // 返回 4
 */

/**
 * 实现原理，目前业界有两种实现方案，
 * 1、第一种使用js天然优势 Map结构；
 *     值得注意的是map.keys() 返回iterator,它包含按照顺序插入map对象的 KEY 值
 * 2、第二种使用hashmap+双向链表的形式
 */

//  第一种实现方式使用Map结构
/**
 * 实现步骤：
 * get操作
 * 如果元素存在： set --> delete --> return
 * 如果元素不存在： return -1
 *
 * set操作
 * 如果元素存在 delete--> set
 * 如果元素不存在：
 *  判断容器大小： 如果小于容器大小 直接set
 *               如果大于容器大小  delete tail元素，然后set
 */

class LRUcacheMap {
  private capacity: number;
  private cache: Map<any, any>;
  public constructor(capacity: number) {
    this.capacity = capacity;
    this.cache = new Map();
  }
  public get(key: any) {
    let value: any = this.cache.has(key) || -1;
    if (value) {
      this.cache.delete(key);
      this.cache.set(key, value);
    }
    return value;
  }
  public set(key: any, value: any) {
    if (this.cache.get(key)) {
      this.cache.delete(key);
      this.cache.set(key, value);
    } else {
      if (this.cache.size >= this.capacity) {
        this.cache.delete(this.cache.keys().next().value);
      }
      this.cache.set(key, value);
    }
  }
}

// LRU是通过hashmap和双向链表实现，
// hashmap用于快速查找到节点所在位置，然后将使用到的节点放到对头
// 双向链表是 可以通过一个元素知道他前前面的和后面的元素

/**
 * @param {number} capacity
 */
var LRUCache = function (capacity) {
  this.capacity = capacity;
  this.tail = {};
  this.head = {};
  this.tail.prev = this.head;
  this.head.next = this.tail;
  this.map = new Map();
};

/**
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function (key) {
  if (this.map.has(key)) {
    const node = this.map.get(key);

    node.prev.next = node.next;
    node.next.prev = node.prev;

    this.tail.prev.next = node;
    node.prev = this.tail.prev;
    node.next = this.tail;
    this.tail.prev = node;

    return node.value;
  } else {
    return -1;
  }
};

/**
 * @param {number} key
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function (key, value) {
  if (this.get(key) !== -1) {
    this.tail.prev.value = value;
  } else {
    // capacity 限制
    if (this.capacity === this.map.size) {
      this.map.delete(this.head.next.key);
      this.head.next = this.head.next.next;
      this.head.next.prev = this.head;
    }

    const newNode: any = { key, value };
    this.map.set(key, newNode);

    this.tail.prev.next = newNode;
    newNode.prev = this.tail.prev;
    newNode.next = this.tail;
    this.tail.prev = newNode;
  }
};

/**
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */
