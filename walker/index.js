isObject = require('is-object')
async = require('async')

module.exports = walkTree

function walkTree(tree, visit, callback) {
  _walkTree({__root__: tree}, visit, function(){
    callback(null, tree)
  })
}

function _walkTree(node, visit, callback){
  var childKeys = Object.keys(node)
    .filter(function(key){ return isObject(node[key]) })
  // visit and transform all children
  async.map(childKeys, function(key, cb){
    var child = node[key]
    visit(child, key, node, function(err, result){
      // if result is different, update node
      if (!err && child !== result) {
        node[key] = result
      }
      _walkTree(child, visit, cb)
    })
  }, callback)
}