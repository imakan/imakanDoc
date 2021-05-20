// 将一个数组转为森林。要求：保持原有相对位置顺序不变

// 节点数据结构

const treeToList = (tree: any) => {
  let queue: any[] = [];
  let out: any[] = [];
  queue = queue.concat(tree);
  while (queue.length) {
    const first = queue.shift();
    if (first.children) {
      queue.concat(first.children);
      delete first.childrend;
    }
    out.push(first);
  }
};

interface ListNode {
  // id
  id: number;
  // 父节点的id为0，代表无父节点
  parentId: number;
}

// 树节点数据结构

interface TreeNode {
  id: number;
  parentId: number;
  children: TreeNode[];
}

// 实现函数
const list2Tree = (listNodes: ListNode[]): TreeNode[] => {
  const tree = Array<TreeNode>();
  const getChildren = (parent: any, list: ListNode[]) => {
    const children: any[] = [];
    list.forEach((item) => {
      if (item.parentId === parent.id) {
        // 说明当前item是parent的child,继续获取item的child
        const child = getChildren(item, list);
        children.push(child);
      }
    });
    if (children.length) {
      parent.children = children;
    }
    return parent;
  };
  // 循环数组,
  listNodes.forEach((item) => {
    //  找到根据点
    if (!item.parentId) {
      // 获取子节点
      const children = getChildren(item, listNodes);
      tree.push(children);
    }
  });
  console.log(JSON.stringify(tree));
  return tree;
};

// 举例
// 转换前
const data = [
  {
    id: 1,
    parentId: 0,
  },
  {
    id: 2,
    parentId: 0,
  },
  {
    id: 3,
    parentId: 1,
  },
  {
    id: 4,
    parentId: 2,
  },
  //   {
  //     id: 5,
  //     parentId: 3,
  //   },
];
// 转换后

const result = [
  {
    id: 1,
    parentId: 0,
    children: [
      {
        id: 3,
        parentId: 1,
        children: [
          {
            id: 5,
            parentId: 3,
            children: [],
          },
        ],
      },
    ],
  },
  {
    id: 2,
    parentId: 0,
    children: [
      {
        id: 4,
        parentId: 2,
        children: [],
      },
    ],
  },
];

list2Tree(data);
