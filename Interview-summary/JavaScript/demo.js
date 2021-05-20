var tree = {
  name: "中国",
  children: [
    {
      name: "北京",
      children: [
        {
          name: "朝阳群众",
        },
        {
          name: "海淀区",
        },
        {
          name: "昌平区",
        },
      ],
    },
    {
      name: "浙江省",
      children: [
        {
          name: "杭州市",
          code: 0571,
        },
        {
          name: "嘉兴市",
        },
        {
          name: "绍兴市",
        },
        {
          name: "宁波市",
        },
      ],
    },
  ],
};

function OutMinData(arr, k) {
  for (var i = 0; i < arr, length; i++) {
    arr[i].p = data[i];
  }

  for (var i = 0; i < k && i < COLS; i++) {
    var temp = queue.top();
    queue.pop();
    temp.p++;
    queue.push(temp);
  }
}
