//var messages = require('./ugh.json')
var unknown_msg = "Unknown error."

function parse(str,vars) {
    var args = [].slice.call(vars, 1)
    for(var i=0; i<args.length; i++){
      var regex = new RegExp("{["+i+"]\}","g")
      str = str.replace(regex, args[i])
    }
    return str
}

var config = function(sourceJSON){

//  console.log('INPUT: ' + input)

  return function(code){
  //  console.log('hello' + input)
    return msg(sourceJSON,code,arguments)
  }

  // if(message_file){
  //   messages = require(message_file)
  // }
  // else{
  //   messages = require('./messages.json')
  // }

  var firstMsgArr = messages[Object.keys(messages)[0]].msg
  if(!(  typeof(messages) === 'object' && Array.isArray(firstMsgArr) )){
    const err = new Error('Missing required JSON fields for uniform-messenger')
    throw err
  }


  // if(){
  //   console.log('seems valid')
  // }

  if(messages['unknown']){
    unknown_msg = messages['unknown']
  }

  // if(typeof(tmp) === array){
  //   console.log('seems valid')
  // }


}

var msg = function(sourceJSON,code,args){
  var messages = require(sourceJSON)
  // console.log('SOURCE IS: ' + sourceJSON)
  // console.log('CODE IS: ' + code)
  // console.log('ARGS ARE: ')
  // console.log(args)
  //console.log()
  config()
  try{
    var msg = ""
    if(messages.prefix){
      msg += messages.prefix
    }

    for(var i=0; i<messages.msg.length; i++){
      if(messages.msg[i][code]){
        msg += messages.msg[i][code] //[code
      }
    }

    if(messages.postfix){
      msg += messages.postfix
    }

    if(arguments.length >= 2){
       msg = parse(msg, args)
    }
//    console.log('MSG: ' + msg)
    return msg
  }
  catch(e){
    console.log('Err e: ' + e)
    return unknown_msg
  }
}

module.exports.msg = msg
module.exports = config
//module.exports.msg = msg
