// /*var */esprima = require('esprima')
// /*var */treeify = require('treeify').asTree
// /*var */round = require('./index.js')
// /*var */standardNode = round.standardNode
// /*var */convertAst = round.convertAst

// window.dump=dump
// function dump(obj){
//   return treeify(obj, true)
// }

// //
// // register signatures
// //

// // Pass throughs

// standardNode({
//   type: 'Program',
//   children: ['body'],
// })

// standardNode({
//   type: 'ExpressionStatement',
//   children: ['expression'],
// })

// // standard nodes

// standardNode({
//   type: 'CallExpression',
//   children: ['callee', 'arguments'],
// }, function(matched, callback){
//   console.log('call expression!')
//   callback()
// })

// standardNode({
//   type: 'MemberExpression',
//   children: ['object', 'property'],
// }, function(matched, callback){
//   console.log('member expression!')
//   callback()
// })

// standardNode({
//   type: 'BinaryExpression',
//   children: ['left', 'right'],
//   variables: ['operator'],
// }, function(matched, callback){
//   console.log('binary expression!')
//   callback()
// })

// // leaf nodes

// standardNode({
//   type: 'Identifier',
//   variables: ['name'],
// }, function(matched, callback){
//   console.log('saw identifier: "'+matched.name+'"!')
//   callback()
// })

// standardNode({
//   type: 'Literal',
//   variables: ['value'],
// }, function(matched, callback){
//   console.log('saw literal: "'+matched.value+'"!')
//   callback()
// })

// // translate src

// var src = 'console.log("haay"+" wuurl")'
// var ast = esprima.parse(src)

// console.log(dump(ast))

// convertAst(ast, function(err){
//   if (err) {
//     console.log('no match for pattern:')
//     console.log(dump(err.actual))
//     console.log('from registered:')
//     console.log(dump(err.expected))
//   } else {
//     console.log('-------- complete ---------')
//   }
// })

