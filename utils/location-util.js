import Log from './log';
var QQMapWX = require('./qqmap-wx-jssdk.min.js');
var wxApiUtil = require('./wx-api-util.js');
var CONFIG = getApp().config;

function getAddress(resolve, reject) {
  let that = this;
  wxApiUtil.getLocation('wgs84', res=>{
    let options = {
      latitude: res.latitude,
      longitude: res.longitude,
      coordType: 1,
      poiOptions: 'address_format=short;policy=1;radius=200',
    };
    that.getAddressByOptions(options, info => {
      resolve(info);
    }, err => {
      reject(err);
    });
  }, err=>{
    reject(err);
  });
};

/**
 * 
 * http://lbs.qq.com/qqmap_wx_jssdk/method-reverseGeocoder.html
 * {
 *  latitude:   纬度
 *  longitude:  经度
 *  coordType:  坐标类型
 *  poiOptions: Poi列表
 *      poi_options=address_format=short:返回短地址，缺省时返回长地址
 *      poi_options=radius=5000:半径，取值范围 1-5000（米）
 *      poi_options=policy=1/2/3;policy=1[默认]着力描述当前位置；policy=2 到家场景;policy=3 出行场景
 * }
 */
function getAddressByOptions(options, resolve, reject) {
  let qqmapsdk = new QQMapWX({
    key: CONFIG.qq_map_key
  });
  qqmapsdk.reverseGeocoder({
    location: {
      latitude: options.latitude,
      longitude: options.longitude
    },
    coord_type: options.coordType,
    poi_options: options.poiOptions,
    success: function (res) {
      Log.i('get address success->', JSON.stringify(res));
      // 二级地标，较一级地标更为精确，规模更小
      let _landmark_l2 = res.result.address_reference.landmark_l2;
      // 位置描述
      let _formatted_addresses = res.result.formatted_addresses;
      // 行政区划信息
      let _ad_info = res.result.ad_info;

      let _location = {
        province: _ad_info.province,
        city: _ad_info.city,
        district: _ad_info.district,
        address: _landmark_l2 && _landmark_l2.title || _formatted_addresses.recommend,
        location: _landmark_l2 && _landmark_l2.location
      };
      resolve(_location);
    },
    fail: function (res) {
      Log.i('get address fail->', JSON.stringify(res));
      reject(res);
    }
  });
  
};

module.exports = {
  getAddress,
  getAddressByOptions
};

