# 排序

排序的稳定性：就是指相等的元素，在排序之后仍然保持两个元素的位置不变，就是稳定的排序，反之就是不稳定的排序。

## 交换排序算法

* 冒泡排序

* 插入排序

* 选择排序

* 希尔排序

* 快排

* 归并排序 

* 堆排序 

## 线性排序算法

* 通排序

### 冒泡排序

冒泡排序就是将两个相邻的元素，比较大小，然后交换位置，第一次从0到n-1进行一次排序，最大的一个数据就“沉”到最后一个位置，然后第n次循环，最小的一个就到第一个吧

```
var arr = [3,23,34,12,1,6,89,4];
function bubbleSort(arr){
  for(var i = 0;i< arr.length;i++){
    for(var j = 0;j<arr.length-i-1;j++){
      if(arr[j] > arr[j+1]){
        var temp = arr[j];
        arr[j] = arr[j+1];
        arr[j+1] = temp;
      }
    }
  }
  return arr;
}
```

***复杂度为O(n^2)***

###  选择排序算法

选择排序就是循环n次，找到组小的一个，然后与第一个交换，然后第二次循环，将最小值与第二个元素交换，知道循环结束,第二个循环，将j 赋值为i,从下一个开始循环

```
var arr = [3,23,34,12,1,6,89,4];
function selectorSort(arr){
  var min,temp;
  for(var i = 0;i<arr.length-1;i++){
    var min = i;
    for(var j = i+1;j<arr.length;j++){
      if(arr[j]<arr[min]){
        min = j
      }
    }
    temp = arr[i];
    arr[i] = arr[min];
    arr[min] = temp;
  }
  return arr;
}
selectorSort(arr)
```
***复杂度为O(n^2)***

### 快速排序算法

1、先从数列中取出一个数做为基准数
2、分区过程，将比这个数大的数全部放到它的右边，小于或者等于它的数全部放到他的左边
3、再对左右区间递归，知道各个区间只有一个数

用了递归 分治的思想

```
function quickSort(arr){
  if(arr.length < 2){
    return arr;
  }
  var left = [];
  var right = [];
  var mid = arr.splice(Math.floor(arr.length/2),1);
  for(var i = 0; i<arr.length;i++){
    if(arr[i] > mid){
      right.push(arr[i])
    }else{
      left.push(arr[i])
    }
  }
  return quickSort(left).concat(mid,quickSort(right))
}
```
***复杂度为O(nlog2n)***

### 插入排序算法

插入排序是将数组分为两组，有序数组和待插入数组，一般来讲把第一个元素作为有序数组，后面的作为待插入数组，每次循环都从待插入数组中取出第一个元素，与有序数组进行比较，并放到合适的位置，每次循环待插入数组都会减少一个，有序数组就会增加一个，直到待插入的数组长度为0
```es6 
var arr = [9,3,4,2,6,7,5,1]
var insertSort = function(arr){
  var temp = 0; 
  var j = 0;
  for(var i = 1;i<arr.length;i++){ //原数组的第一个元素作为有序数组的第一个元素，后面的作为待插入数组
    temp = arr[i]; // 取出待插入数组的第一个元素
    //赋值j,获得有序数组的左右一个元素
    j = i - 1;
    //循环有序数组，判断元素插入条件
    while(j >= 0 && temp < arr[j]){
      arr[j+1] = arr[j] //如不是合适的位置，将有序数组向后移动
      j--;
    }
    arr[j+1] = temp //找到合适位置，将元素插入
  }
  return arr;
}
insertSort(arr)
```
***复杂度为O(n^2)***