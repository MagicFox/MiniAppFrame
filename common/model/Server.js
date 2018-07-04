/**
 * server：
 * 根据环境设置默认的host
 * 设置默认的api项目名称
 */
class Server{
  constructor(env,host,projectName,port) {
    if (!env) {
      throw Error('env值不能为空');
    }
    // API环境
    this.env = env;
    // host
    this.host = host;
    // 项目名称
    this.projectName = projectName;
    // port
    this.port = port;
    // base url
    this.serverUrl = this.getUrl(this.projectName);
  }

  getPrefix() {
    let prefix = '';
    if ('prd' === this.env) {
      prefix = '';
    } else if ('uat' === this.env) {
      prefix = 'uat-';
    } else if ('test' === this.env) {
      prefix = 'test-';
    } else {
      prefix = '';
    }
    return prefix;
  }

  /**
   * 是否为主项目
   */
  isMasterProject(projectName){
    return 'master-project' === projectName;
  }
  
  /**
   * 开发环境为ip访问
   * 其他为域名访问
   */
  getUrl(projectName) {
    if ('dev' === this.env) {
      return `http://xxx:${this.port}/${projectName}`;
    } else {
      return `https://${this.getPrefix()}${this.host}/${projectName}`;
    }
  }
}

module.exports = Server;