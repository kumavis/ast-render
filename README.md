### ast-render

###### specify rules

code pattern: 
```js
console.log( $_greeting )
```
markup template:
```js
<log>{{greeting.value}}</log>
```

###### just add water...

code source:
```js
console.log( "yoho" );
```
markup output: 
```js
<log>yoho</log>
```

###### works both ways (well, it will eventually)

markup source: 
```js
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
