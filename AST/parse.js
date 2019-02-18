const recast = require('recast')
// 引入变量声明，变量符号，函数声明三种“模具”
const {variableDeclaration,variableDeclarator,functionExpression} = recast.types.builders

const code = 
`
function add(a, b) {
  return a +
    // 有什么奇怪的东西混进来了
    b
}
`

// 解析器
const ast = recast.parse(code)
// ast 可以处理很巨大的代码文件
// 但我们现在只需要代码块的第一个body,(可以存在多个body，也就是多个函数)，即add函数,
const add  = ast.program.body[0]
// 打印出来的是真个add函数的结构
// console.log(add)

// console.log(add.params[0])

// console.log(add.body.body[0].argument.left)


// recast.types.builders制作模具

/**
 * 需求：我们把函数表达式，改成匿名函数式声明const add = function (a,b){...}
 * 
 * 如何改装，
 * 第一步：我们创建一个VariableDeclation变量声明对象，声明头为const,内容为一个即将创建的VariableDeclarator对象
 * 
 * 第二步：创建一个VariableDeclator,放置add.id在左边，右边是将创建的FunctionDeclaration对象
 * 
 * 第三步：创建一个FunctionDeclaration，如前面所述的三个组件，id params body中，因为是匿名函数id设为空，params使用add.params,body使用add.body
 */

//  将准备好的组件置入模具，并组装回原来的ast对象

ast.program.body[0] = variableDeclaration('const',[
  variableDeclarator(add.id,functionExpression(
    null, // Anonymize the function expression
    add.params,
    add.body
  ))
])

const output = recast.prettyPrint(ast, { tabWidth: 2 }).code;
console.log(output)