//app.js
import CONFIG from './config/config';
import User from './common/model/User.js';
import WxService from './common/plugins/wx-service/WxService';
import { $tip } from './components/tip';
var user = new User();
var that;

App({
  onLaunch: function () {
    that = this;
    that.user = user;
    // 获取用户信息
    wx.getSetting({
      success: res => {
        console.log('app.onLaunch.getSetting', res);
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.user.setWXUser(res.userInfo);
              this.globalData.userInfo = res.userInfo;
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res);
              }
            }
          });
        }
      }
    });
  },
  // 全局页面提示
  showTips: function (msg, callBack = ({})) {
    $tip.show({
      timer: 1500,
      text: msg,
      isShow: true,
      success: callBack
    });
  },
  // 上一个页面
  getPrePage: function () {
    let pages = getCurrentPages();
    if (pages.length <= 1) {
      return null;
    } else {
      return pages[pages.length - 2];
    }
  },
  // 是否mock假数据
  mock: false,
  // 全局配置信息
  config: CONFIG,
  // 是否debug模式
  isDebug: CONFIG.is_debug,
  wxService: new WxService(),
  globalData: {
    // wx open id
    openId: user.getOpenId(),
    // 登录手机号
    phone: user.getPhone(),
    // user id
    userId: user.getUserId(),
    // 用户名
    userName: user.getUserName(),
    // 登录状态
    logined: user.getLogined(),
    // wx user info
    userInfo: null,
    // wx device info
    deviceInfo: {},
  }
});