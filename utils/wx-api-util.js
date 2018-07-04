import Log from './log';

/**
 * 使用code换open id
 */
function wxLogin() {
  return new Promise(function (resolve, reject) {
    wx.login({
      success: function (res) {
        resolve(res);
      },
      fail: function (res) {
        Log.e('wx-api-util,wx login fail', JSON.stringify(res));
        reject(res);
      }
    });
  });
}

/**
 * 打开设置
 */
function openSetting(reslove, reject) {
  wx.openSetting({
    success: (res) => {
      reslove();
    }, fail: err => {
      reject();
    }
  });
}

/**
 * 获取设置
 */
function getSetting(scope, reslove, reject, isOpenSetting) {
  let that = this;
  wx.getSetting({
    success(res) {
      if (res.authSetting[scope] || isOpenSetting === false) {
        reslove(res);
      } else {
        that.openSetting(reslove, reject);
      }
    }, fail: err => {
      reject(err);
    }
  });
}

/**
 * 获取定位设置
 */
function getLocationSetting(reslove, reject, isOpenSetting) {
  return this.getSetting('scope.userLocation',reslove,reject,isOpenSetting);
}

/**
 * 获取用户信息设置
 */
function getUserInfoSetting(reslove, reject, isOpenSetting) {
  return this.getSetting('scope.userInfo', reslove, reject, isOpenSetting);
}

/**
 * 国际标准:wgs84 
 * 中国标准:gcj02,gcj02ll
 */
function getLocation(locationType, reslove, reject){
  wx.getLocation({
    type: locationType,
    success: function (res) {
      reslove(res);
    },
    fail: function (err) {
      reject(err);
    },
  });
}

/**
 * 获取高度
 */
function getHeight() {
  let _height = 0;
  wx.getSystemInfo({
    success: function (res) {
      _height = res.windowHeight;
    },
  });
  return _height;
}


// 获取元素自适应后的实际宽度
function getWidth (w) {
  try {
    let _res = wx.getSystemInfoSync().windowWidth;
    // 以宽度750px设计稿做宽度的自适应
    var _scale = (750 / 2) / (w / 2);
    return Math.floor(_res / _scale);
  } catch (e) {
    Log.d('wx-api-util.getWidth',e);
    return w;
  }
}

module.exports = {
  wxLogin,
  getSetting,
  openSetting,
  getLocationSetting,
  getUserInfoSetting,
  getLocation,
  getHeight,
  getWidth
}