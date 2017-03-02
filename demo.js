'use strict'
const success = require('./correspondent')('./success')
const correspondent = require('./correspondent')('./old')

const suc = require('./success')

let user = 'aarena1'
console.log(success('USER_CREATED','aarena1'))

console.log(correspondent('err','NOT_FOUND','12PM','Something'))
