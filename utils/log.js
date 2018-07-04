const PRE_STR = "------------------------";
var config = require('../config/config.js');
var isDebug = config.is_debug;

function info(scope,str) {
  if (isDebug) {
    console.log(PRE_STR, scope, str);
  }
}

function debug(scope,str) {
  if (isDebug) {
    console.debug(PRE_STR, scope, str);
  }
}

function warn(scope,str) {
  if (isDebug) {
    console.warn(PRE_STR, scope, str);
  }
}

function error(scope,str) {
  if (isDebug) {
    console.error(PRE_STR, scope, str);
  }
}

module.exports = {
  i: info,
  d: debug,
  e: error,
  w: warn,
}