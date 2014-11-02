var match = require('pattern-match')
var isObject = require('is-object')
var isArray = require('is-array')
var async = require('async')
var walkTree = require('./walker.js')

module.exports = AstTransformer

// setup registry

function AstTransformer(opts) {
  // optional 'new' keyword
  if (!(this instanceof AstTransformer)) return new AstTransformer(opts)
  this._initialize(opts)
}

AstTransformer.prototype = {

  _initialize: function(opts){
    opts = opts || {}
    this.stopOnUnmatched = !!opts.stopOnUnmatched

    this._registry = {}
  },

  register: function(pattern, callback){
    var registry = this._registry
    if (!registry[pattern.type]) registry[pattern.type] = []
    var registered = registry[pattern.type]
    registered.push({
      pattern: pattern,
      callback: callback,
    })
  },

  convertAst: function(ast, callback){
    walkTree( ast, this.tryNode.bind(this), callback)
  },

  tryNode: function(node, key, parent, callback){
    try {
      // TODO: if registered.length is 0, skip to children
      match(node, function(when) {
        // last in has precedence
        var registered = (this._registry[node.type] || []).slice().reverse()
        registered.forEach(function(entry){
          when(entry.pattern, function(matched){
            entry.callback(node, key, parent, matched, callback)
          })
        })
      }, this)
    } catch (err) {
      if (err instanceof match.MatchError && !this.stopOnUnmatched) {
        callback(null, node)
      } else {
        callback(err)
      }
    }
  },

}