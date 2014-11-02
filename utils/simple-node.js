var match = require('pattern-match')
var async = require('async')

module.exports = standardNode

/*

automated pattern generation for simple nodes

simpleNode({
  type: 'BinaryExpression',
  children: ['left', 'right'],
  variables: ['operator'],
}, function(matched, callback){
  console.log('binary expression!')
  callback()
})

*/

function standardNode(transformer, opts, callback) {
  var pattern = { type: opts.type }
  var childKeys = opts.children || []
  var varKeys = opts.variables || []
  callback = callback || function(node, key, parent, matched, cb){ cb(null, node) }

  childKeys.forEach(function(key){
    pattern[key] = match.var(key)
  })

  varKeys.forEach(function(key){
    pattern[key] = match.var(key)
  })

  transformer.register(pattern, function(node, key, parent, matched, cb){
    // on match, use the consumer's handler, and then continue parsing the children
    callback(node, key, parent, matched, function(error, result){
      var childNodes = childKeys.map(function(key){ return matched[key] })
      async.map(childNodes, transformer.convertAst.bind(transformer), function(){
        cb(null, result)
      })
    })
  })
}