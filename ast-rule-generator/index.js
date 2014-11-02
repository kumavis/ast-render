/*var*/ AstTransformer = require('../rule-transform/index.js')
/*var*/ simpleNode = require('../utils/simple-node.js')


module.exports = AstRuleGenerator

function AstRuleGenerator(opts) {
  if (!(this instanceof AstRuleGenerator)) return new AstRuleGenerator(opts)
  this._initialize(opts || {})
}

AstRuleGenerator.prototype = {

  _initialize: function(opts){
    var prefix = this.prefix = opts.prefix || '$_'

    var compiler = this.compiler = AstTransformer()

    // add a rule to turn special identifiers into variable captures
    simpleNode(compiler, {
      type: 'Identifier',
    }, function(node, key, parent, matched, callback){
      var result = node
      // node name starts with prefix but is not only the prefix
      if (node.name.slice(0,prefix.length) === prefix && node.name.length>prefix.length) {
        var nodeName = node.name.slice(prefix.length)
        result = compiler.match.var(nodeName)
      }
      callback(null, result)
    })

  },

  compile: function(patternAst, callback){
    // parse the code pattern
    this.compiler.convertAst(patternAst, callback)
  },

}