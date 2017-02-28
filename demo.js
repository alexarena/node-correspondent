//var err = require('./correspondent')('./err')

'use strict'
var success = require('./correspondent')('./success')

var msg = require('./correspondent')('./old')

//.config('./something.json')

//console.log(err)

//console.log(err('USER_NOT_FOUND','Alex','Alex2'))
console.log(success('USER_CREATED','aarena1','hello','world'))

console.log(msg('err','NOT_FOUND','Something','Something else...','something else 2'))

 setInterval( ()=>{ console.log('yo') }, 3000);
