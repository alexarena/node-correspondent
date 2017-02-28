
//Handles C# style formatted strings
function parse(str,vars) {
    let args = [].slice.call(vars, 1)
    for(let i=0; i<args.length; i++){
      let regex = new RegExp("{["+i+"]\}","g")
      str = str.replace(regex, args[i])
    }
    return str
}

function validate(sourceJSON){
  let json = null
  try {
      json = require(sourceJSON)
  } catch (e) {
    throw new Error(e)
    return 0
  }

  if(json.messages){
    if(!Array.isArray(json.messages)){
      throw new Error('Missing "messages" array required by node-correspondent')
      return 0
    }else{
      return 1
    }
  }
  else{
    Object.keys(json).forEach((key) => {
      if(key != 'unknown'){
        if(!Array.isArray(json[key].messages)){
          const e = 'Missing "messages" array required by node-correspondent for message type: "'+key+'" '
          throw new Error(e)
          return 0
        }
      }
    })
    return 2
  }

  return 1
}

var msg = (sourceJSON,code,args,mtype) =>{
  let json = require(sourceJSON)

  if(mtype){
    json = json[mtype]
  }

  try{
    var msg = ""
    if(json.prefix){
      msg += json.prefix
    }

    for(let i=0; i<json.messages.length; i++){
      if(json.messages[i][code]){
        msg += json.messages[i][code] //[code
      }
    }

    if(json.postfix){
      msg += json.postfix
    }

    if(arguments.length >= 2){
       msg = parse(msg, args)
    }
    return msg
  }
  catch(e){
    console.log(e)
    console.log('Your JSON might not be correctly formatted for node-correspondent.')
    return ""
  }
}

module.exports = (sourceJSON) => {
    let type = validate(sourceJSON)

    if(type === 1){
      return function(code){
        return msg(sourceJSON,code,arguments)
      }
    }
    else{
      return function(mtype,code){
        return msg(sourceJSON,code,arguments,mtype)
      }
    }

}

module.exports.msg = msg
