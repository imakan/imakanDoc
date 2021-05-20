const fn = (arr, k) => {
  const obj = {}; // { value: [index1, index2]}
  arr.forEach((value, index) => {
    obj[value] ? obj[value].push(index) : (obj[value] = [index]);
  });
  console.log("obj", obj);
  arr.sort((a, b) => a - b);
  const res = arr.slice(0, k);
  console.log(res);
  const resObj = {};
  res.forEach((item) => {
    const index = obj[item].shift();
    resObj[index] = item;
  });
  console.log(resObj);
  return Object.values(resObj);
};
console.log(fn([1, 2, 3, 5, 6, 3, 2], 5));
