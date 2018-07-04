import WxRequest from '../plugins/wx-request/lib/index';
import Log from '../../utils/log';
import util from '../../utils/util';
import ApiResult from '../model/ApiResult';
let apiResult = new ApiResult();
var CONFIG = getApp().config;

/**
 * 网络请求:
 *  支持统一处理 loading & stop stop refresh & show err message
 *  支持返回不同接口不同实体且业务处理结果标识的不同
 *       master返回success为true时表示业务处理成功
 *       slave返回code为B1000时表示业务处理成功
 *  支持结果返回网络异常、业务处理结果标识
 *       isNetError:是否网络请求失败
 *       isBizError:是否业务处理失败
 */
class HttpService extends WxRequest {
  constructor(options) {
    super(options);
    let that = this;
    that.interceptors.use({
      request(request) {
        request.header = request.header || {};
        request.header['Content-Type'] = 'application/json';
        request.source = apiResult.getPName(request.url, CONFIG.masterServer.projectName, CONFIG.slaveServer.projectName);
        that.showLoading(request);
        Log.i('http request prepare request->', JSON.stringify(request));
        return request;
      },
      requestError(requestError) {
        requestError = that.handleResult(requestError);
        return Promise.reject(requestError);
      },
      response(response) {
        response = that.handleResult(response);
        return response;
      },
      responseError(responseError) {
        responseError = that.handleResult(responseError);
        return Promise.reject(responseError);
      },
    });
  }

  /***
  * 发起一个请求:
  * params:{
  *    toast: {//配置提示
  *      title:'我要加载',
  *      showErrorMsg: '服务器正忙，请稍后再试',
  *      stopRefresh: '停止下拉刷新',
  *    },
  *    method: 'get/post',
  *    url:'具体接口路径',
  *    source:'master/slave',默认空表示来源为master的接口
  *    data: params,
  *    baseURL: 'http://host:port/project/path/',
  * }
  *  返回的结果包含:
  *  {
  *    isNetError:是否网络请求失败
  *    isBizError:是否业务处理失败
  *  }
   */
  httpRequest(config) {
    // 配置参数
    var params = {
      data: config.data,
      toast: config.toast,
      source: config.source
    };
    // 是否更新项目基础路径
    if (config.baseURL) {
      params.baseURL = config.baseURL;
    }
    // 发送请求
    if ('get' === config.method.toLowerCase()) {
      return this.handleNetworkSuccess(this.getRequest(config.url, params));
    } else {
      return this.handleNetworkSuccess(this.postRequest(config.url, params));
    }
  }

  /**
   * 处理网络成功的结果
   */
  handleNetworkSuccess(data) {
    return data.then(res => {
      Log.i('http request response->', JSON.stringify(res));
      // 过滤业务异常
      if (res.isNetError || res.isBizError) {
        return Promise.reject(res);
      }
      // 返回服务端的data数据
      return res.data.data || res.data;
    });
  }

  /**
   * showLoading
   */
  showLoading(request) {
    if (request.toast.loading) {
      wx.showLoading({
        title: request.toast.title || '加载中',
        icon: 'loading'
      });
    }
  }

  /**
   * 处理master & slave接口返回的不同参数
   */
  handleResult(response) {
    // 处理无网络时空数据
    if (!response.statusCode || !response.data) {
      response = Object.assign({}, response, { data: {} });
    }
    // 不同服务器的不同结果
    apiResult.initData(response, CONFIG.masterServer.projectName, CONFIG.network_exception_hint);
    response.isNetError = apiResult.isNetError();
    response.isBizError = apiResult.isBizError();

    this.handleView(response);
    return response;
  }

  /**
   * hide loading & stop refresh & show err message
   * master的接口返回参数与slave不同
   */
  handleView(response) {
    // hide loading
    if (response.toast.loading) {
      wx.hideLoading();
    }
    // stop refresh
    if (response.toast.stopRefresh) {
      wx.stopPullDownRefresh();
    }
    // show err message
    if ((response.isNetError || response.isBizError) && response.toast.showErrorMsg) {
      getApp().showTips(apiResult.getMessage(), function () { });
    }
  }
}

module.exports = {
  masterServer: new HttpService({ baseURL: CONFIG.masterServer.serverUrl }),
  slaveServer: new HttpService({ baseURL: CONFIG.slaveServer.serverUrl }),
};