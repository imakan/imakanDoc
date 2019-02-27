#! /usr/local/bin/nod

const recast = require('recast')

// 可以用node + 本文件 + 需要执行的文件
recast.run(function(ast,printSource){
  // printSource(ast)
  // recast.visit —— AST节点遍历
  recast.visit(ast,{
    visitExpressionStatement:function(node){
      console.log(node)
      return false // 必须要写的
    }
  })
})