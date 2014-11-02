/*var*/ falafel = require('falafel');
/*var*/ esprima = require('esprima')
/*var*/ treeify = require('treeify').asTree
/*var*/ AstTransformer = require('./index.js')
/*var*/ simpleNode = require('./utils/simple-node.js')
/*var*/ match = require('pattern-match')
/*var*/ handlebars = require('handlebars')

window.dump=dump
function dump(obj){
  console.log(treeify(obj, true))
}

/*var*/ transformer = AstTransformer({stopOnUnmatched: true})

//
// register signatures
//

// Pass throughs

simpleNode(transformer, {
  type: 'Program',
  children: ['body'],
})

simpleNode(transformer, {
  type: 'ExpressionStatement',
  children: ['expression'],
})

// standard nodes

transformer.register({
  type: 'CallExpression',
  children: ['callee', 'arguments'],
}, function(node, key, parent, matched, callback){
  console.log('call expression!')
  callback(null, node)
})

// translate src

// patternSrc = 'rect($_x, $_y, $_width, $_height)'
// templateSrc = 'x:{{x.value}} y:{{y.value}} width:{{width.value}} height:{{height.value}}'
// userSrc = 'rect(1,2,3,4)'

patternSrc = 'console.log( $_greeting )'
templateSrc = 'logging was found: {{greeting.type}}'
userSrc = 'console.log( 1 + 2 ); console.log( "hay" );'

templateRender = handlebars.compile(templateSrc)
patternAst = esprima.parse(patternSrc)
patternAst = patternAst.body[0]
console.log('CODE PATTERN')
dump(patternAst)

tmpTrans = AstTransformer()

// add a rule to turn special identifiers into variable captures
simpleNode(tmpTrans, {
  type: 'Identifier',
}, function(node, key, parent, matched, callback){
  var result = node
  var prefix = '$_'
  if (node.name.slice(0,prefix.length) === prefix && node.name.length>prefix.length) {
    var nodeName = node.name.slice(prefix.length)
    result = match.var(nodeName)
  }
  callback(null, result)
})

// parse the code pattern
tmpTrans.convertAst(patternAst, function(err, output){
  console.log('NEW RULE')
  dump(patternAst)
  // use the code pattern as a rule
  transformer.register(patternAst, function(node, key, parent, matched, callback){
    callback(null, templateRender(matched))
  })
  // transform the user code using the new rule
  ast = esprima.parse(userSrc)
  console.log('USER CODE')
  dump(ast)
  transformer.convertAst(ast, function(){
    console.log('RENDER TREE')
    dump(ast)
  })
})


// // translate src

// patternSrc = 'rect($_x, $_y, $_width, $_height)'
// patternAst = esprima.parse(patternSrc)
// patternAst = patternAst.body[0]
// dump(patternAst)

// tmpTrans = AstTransformer({
//   walkUnmatched: true,
// })

// walkTree(patternAst, visitor, function(err, callback){
//   debugger
// })

// function visitor(node, key, parent, callback){
//   var result = node
//   switch(node.type) {
//     case 'Identifier':
//       var prefix = '$_'
//       if (node.name.slice(0,prefix.length) === prefix && node.name.length>prefix.length) {
//         result = {
//           type: 'Identifier',
//           name: match.var('name'),
//         }
//       }
//       break
//   }
//   callback(null, result)
// }
