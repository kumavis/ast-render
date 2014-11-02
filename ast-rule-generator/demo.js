/*var*/ esprima = require('esprima')
/*var*/ treeify = require('treeify').asTree
/*var*/ handlebars = require('handlebars')
/*var*/ astRuleGenerator = require('./index.js')()

window.dump=dump
function dump(obj){
  console.log(treeify(obj, true))
}

/*var*/ transformer = AstTransformer()

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
patternAst = esprima.parse(patternSrc).body[0]

console.log('CODE PATTERN')
dump(patternAst)

astRuleGenerator.compile(patternAst, function(err){

  if (err) debugger

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
