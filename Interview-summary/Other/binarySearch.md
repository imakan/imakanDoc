# 二分查找法
二分查找首先要是有序的 升序或者降序
##  二分查找法 递归实现

```es6
var arr = [-34, 1, 3, 4, 5, 8, 34, 45, 65, 87]; 
var binarySearch = function(arr,dest,start,end){
  var start = start || 0;
  var end = end || arr.length;
  var m = Math.floor((start + end)/2);
  if(start == end) return -1;
  if(dest == arr[m]) return m;
  if(dest < arr[m]){
    return binarySearch(arr,dest,0,m-1)
  }else{
    return binarySearch(arr,dest,m+1,end)
  }
}
binarySearch(arr,4);
```

## 二分查找法 非递归实现

```es6
var binarySearch = function(data,dest){
  var h = data.length;
  l = 0;
  while(l <= h){
    var m = Math.floor((h + l)/2); 
    if(data[m] == dest) return m;
    if(dest < data[m]){
      l = m - 1    
    }else {
      l = m + 1
    }
  }
}
```