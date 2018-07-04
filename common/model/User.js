import LocalStorage from '../storage/LocalStorage'; 
import Log from '../../utils/log.js';


class User {
  constructor() {
    this._init();
  }

  _init() {
    this.localStorage = new LocalStorage();
  }

  /**
   * 微信wx.login返回的openid&sessionKey
   */
  setWxLogin(data) {
    this.localStorage.setWxOpenid(data.openid);
    this.localStorage.setWxSessionKey(data.sessionKey);
    getApp().globalData.openId = data.openid;
  }
  
  getOpenId() {
    this.openId = this.localStorage.getWxOpenid() || '';
    return this.openId;
  }
  /**
   * 微信信息
   */
  setWXUser(userInfo) {
    this.localStorage.setWxUser(userInfo);
    getApp().globalData.userInfo = userInfo;
  }

  getWXUser() {
    this.wxUser = this.localStorage.getWxUser();
    return this.wxUser;
  }
  /**
   * 车来拉用户信息
   */
  setUserInfo(userId, phone, name) {
    this.localStorage.setUserId(userId);
    this.localStorage.setPhone(phone);
    this.localStorage.setUserName(name);
    getApp().globalData.userId = userId;
    getApp().globalData.phone = phone;
    getApp().globalData.userName = name;
  }

  getPhone() {
    this.phone = this.localStorage.getPhone() || '';
    return this.phone;
  }

  getUserName(){
    this.userName = this.localStorage.getUserName() || '';
    return this.userName;
  }

  getUserId() {
    this.userId = this.localStorage.getUserId() || '';
    return this.userId;
  }

  setLogined(status) {
    this.localStorage.setLogined(status);
    getApp().globalData.logined = status;
  }

  getLogined() {
    this.logined = this.localStorage.getLogined() || '';
    return this.logined;
  }
  /**
   * 退出登录
   */
  loginOut() {
    this.localStorage.clearAll();
  }

  // 展示本地存储能力
  saveLogs() {
    var logs = wx.getStorageSync('logs') || [];
    logs.unshift(Date.now());
    wx.setStorageSync('logs', logs);
  }

}
export default User