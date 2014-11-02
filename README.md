### idea

needed an easy way of generating bidirectional transformation rules for parsable languages.
thought it would be neat if you just wrote the code you wanted to match instead of writing the AST you wanted to match. The generated rules are valid json, so they can be generated at run time or build time.

### status

transformation from code to xml is mostly working, though its not possible to specify node types in rules yet.
the actual last leg of rendering the tree flat is not finished.
transformation from xml to code is not ready.

### usage

###### specify rules

code pattern: 
```js
console.log( $_greeting )
```
markup template:
```xml
<log>{{greeting.value}}</log>
```

###### run your code through it...

code source:
```js
console.log( "yoho" );
```
markup output: 
```xml
<log>yoho</log>
```

###### works both ways (well, it will eventually)

markup source: 
```xml
<log>haay</log>
<log>wuurl</log>
```
code output: 
```js
console.log( "hay" );
console.log( "wuurl" );
```

### inspiration

[structuredjs](https://github.com/Khan/structuredjs)
