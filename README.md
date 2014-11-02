
###### specify rules

code pattern: `console.log( $_greeting )`
markup template: `<log>{{greeting.value}}</log>`

###### just add water...

code source: `console.log( "yoho" );`
markup output: `<log>yoho</log>`

###### works both ways (it will eventually)

markup source: `<log>haay</log> <log>wuurl</log>`
code output: `console.log( "hay" ); console.log( "hay" );`