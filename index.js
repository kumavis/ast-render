var match = require('pattern-match')
var isArray = require('is-array')
var async = require('async')

// setup registry

module.exports = {
  standardNode: standardNode,
  convertAst: convertAst,
}

var registry = {}

function register(pattern, callback){
  if (!registry[pattern.type]) registry[pattern.type] = []
  var registered = registry[pattern.type]
  registered.push({
    pattern: pattern,
    callback: callback,
  })
}

function standardNode(opts, callback) {
  var pattern = { type: opts.type }
  var childKeys = opts.children || []
  var varKeys = opts.variables || []
  callback = callback || function(_,cb){ cb() }

  childKeys.forEach(function(key){
    pattern[key] = match.var(key)
  })

  varKeys.forEach(function(key){
    pattern[key] = match.var(key)
  })

  register(pattern, function(matched, cb){
    callback(matched, function(){
      var childNodes = childKeys.map(function(key){ return matched[key] })
      async.map(childNodes, convertAst, cb)
    })
  })
}

function convertAst(ast, callback){
  var nodes = isArray(ast) ? ast : [ast]
  async.map(nodes, tryNode, callback)
}

function tryNode(node, callback){
  try {
    match(node, function(when) {
      var registered = registry[node.type] || []
      registered.forEach(function(entry){
        when(entry.pattern, function(matched){
          entry.callback(matched, callback)
        })
      })
    })
  } catch (err) {
    callback(err)
  }
}