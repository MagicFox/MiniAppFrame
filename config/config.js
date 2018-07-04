var Server = require('../common/model/Server.js');

/* api环境 */
const API_ENVIRONMENT = 'uat';

module.exports = {
  // 是否为debug模式
  is_debug: true,
  // 小程序应用版本
  app_version: '0.0.1',
  // 小程序接口环境
  api_env: API_ENVIRONMENT,
  // master接口对应的server
  masterServer: new Server(API_ENVIRONMENT, 'xxx.cn', 'xx-project','8080'),
  // slave接口对应的server
  slaveServer: new Server(API_ENVIRONMENT, 'xx2.cn', 'xx-project2','8081'),
  // 网络连接失败的默认文字
  network_exception_hint: '网络异常，请稍后再试',
  // qq map key
  qq_map_key: 'xxx'
}