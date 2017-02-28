var err = require('./correspondent')('./err')
var success = require('./correspondent')('./success')

//.config('./something.json')

//console.log(err)

//console.log(err('USER_NOT_FOUND','Alex','Alex2'))
console.log(success('USER_CREATED','aarena1','hello','world'))
