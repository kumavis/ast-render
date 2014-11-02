### ast-render

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
