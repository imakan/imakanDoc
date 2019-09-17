function getTrees(list, parentId) {
  let items = {};
  for (let i = 0; i < list.length; i++) {
    let key = list[i].parentId || -1;
    if (items[key]) {
      items[key].push(list[i]);
    } else {
      items[key] = [];
      items[key].push(list[i]);
    }
  }
  return formatTree(items, parentId);
}
function formatTree(items, parentId) {
  let result = [];
  if (!items[parentId]) {
    return result;
  }
  for (let t of items[parentId]) {
    t.children = formatTree(items, t.id);
    result.push(t);
  }
  return result;
}

const input = [
  { id: 1, name: "i1" },
  { id: 2, name: "i2", parentId: 1 },
  { id: 4, name: "i4", parentId: 3 },
  { id: 3, name: "i3", parentId: 2 }
];

console.log(JSON.stringify(getTrees(input,-1)))