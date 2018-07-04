let baseService = require('../service/HttpService.js');
import Log from '../../utils/log.js';


/**
 * 登录
 */
function login(params) {
  return baseService.slaveServer.httpRequest({
    url: 'user/login',
    method: 'post',
    data: params,
    toast: {
      loading: true,
      showErrorMsg: false
    },
  });
}
/**
 * 获取open id
 */
function getOpenId(params) {
  return baseService.masterServer.httpRequest({
    url: 'user/getOpenId',
    method: 'get',
    data: params,
    toast: {
      loading: true
    },
  });
}

module.exports = {
  login,
  getOpenId
};

