ts使用tsconfig.json 文件管理工程配置
读取所有可是别的src目录下的文件(include输入)
接受JavaScript作为输入（allowJS作为配置）
生成的目录是在 build 文件下的
将JavaScript代码降级到低版本比如es5 通过targe 指定
请注意 paths 是相对于baseUrl 进行解析，如果baseUrl 被设置成除了“.”外的其他值，比如tsconfig.json 所在的目录，那么映射必须要做相应的改变
通过paths 可以指定复杂的映射，包括指定多个回退位置，假设在一个工程配置里面，有一些模块位于移除，而其他的则在另外的一处，构建过程会将他们集中至一处

imports 'folder1/files' and 'folder2/files'

tsconfig 

“compilerOption”:{
  paths:{
    '*':[
      '*',
      ''
    ]
  }
}

--module AMD | System | ES2015 时默认的值是Classic，其它情况则是node
当你在类的外部使用this关键字的时候，它会默认获得any类型，比如，假设有一个Point类，并且我们要添加一个函数作为他的方法

class 是在运行时  

interface 是在编译时检查

显示赋值断言 
显示赋值断言是一个新语法，使用它来告诉ts一个属性会被明确地赋值，但是除了在类属性上使用它之外，还可以在变量声明上使用它


三斜线指令中的types = ''  也可以当做import 使用
例如：把/// reference types = 'node' 表明这个文件使用了@types/node/index.d.ts,并且这个包需要在编译阶段与声明文件一起
被包含进来，仅当你需要写一个d.ts文件时才使用这个命令

/// reference no-default-lib='true'
这个指令把一个文件标记成默认库。你会在lib.d.ts 文件和他不同的变体的顶端看到这个注释



