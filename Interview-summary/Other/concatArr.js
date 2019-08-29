var arr1 = [1, 3, 5, 7, 9];
var arr2 = [2, 4, 6, 8]

var func = function (arr1, arr2) {
  var _temp = arr2;
  for (var i = 0; i < arr1.length; i++) {
    for (var j = 0; j < arr2.length; j++) {
      if (arr1[i] >= arr2[j] && arr1[i] < arr2[j + 1]) {
        _temp = arr2.splice(j, 0, arr1[i]);
      }

    }
  }
  return _temp;
}

console.log(func(arr1, arr2))