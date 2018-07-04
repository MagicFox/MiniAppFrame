/**
 * 不同服务器返回不同参数的处理
 */
class ApiResult{

  constructor(){
    this._init();
  }

  _init(){
    this.projectName = '';
    this.exceptionMsg = '';
    this.response = {};
  }

  initData(options, projectName,exceptionMsg) {
    this.projectName = projectName || '';
    this.exceptionMsg = exceptionMsg;
    this.response = options || {};
  }

  isMaster(source) {
    return this.projectName === source;
  }

  getPName(url, master, slave) {
    return url.indexOf(master) > 0 ? master : slave
  }

  isNetError() {
    return !(200 === this.response.statusCode);
  }

  /**
   * 某1 server: code=== B1000 代表成功
   * 某2 server: success === true 代表成功
   */
  isBizError() {
    if (this.isMaster(this.response.source)) {
      return !('B1000' === this.response.data.code);
    } else {
      return !(true === this.response.data.success);
    }
  }

  /**
   * 某1 server: msg
   * 某2 server: errorMessage[0].message
   */
  getMessage() {
    if (this.isMhyq(this.response.source)) {
      return this.response.data.msg || this.exceptionMsg;
    } else {
      return this.response.data.errorMessages && this.response.data.errorMessages[0].message || this.exceptionMsg;
    }
  }

}
export default ApiResult