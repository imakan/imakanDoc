const input = [
  { id: 1, name: 'i1', parentId: 4 },
  { id: 2, name: 'i2', parentId: 1 },
  { id: 3, name: 'i3', parentId: 2 },
  { id: 4, name: 'i4', parentId: 3 },
]

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

let getTree = (list, parentId) => {
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
};

try{
  getTree(input, 1)
}catch(e){
  console.log(11)
  console.log(e)
}
// [{"id":1,"name":"i1","children":[{"id":2,"name":"i2","parentId":1,"children":[{"id":3,"name":"i3","parentId":2,"children":[{"id":4,"name":"i4","parentId":3,"children":[]}]}]},{"id":6,"name":"i6","parentId":1,"children":[]}]}]
