var storageKeys = require('../../dict/StorageKeys.js');
import Log from '../../utils/log.js';
/**
 * 本地存储
 * 在storageKeys.Keys中添加相应的字段xx，本类自动构造setxx/getxx方法
 * setxxx调用setValue(key,value)
 * getxxx调用getValue(key)
 */
class LocalStorage {
  constructor() {
    this._init();
  }

  _init() {
    // 发起请求所支持的方法
    const instanceSource = {
      keys: storageKeys.Keys
    };
    const setSuffix = 'set';
    const getSuffix = 'get';
    // 遍历对象构造方法
    for (let key in instanceSource) {
      instanceSource[key].forEach((item, index) => {
        // 构造所有setxx方法
        this[setSuffix + item] = (value) => {
          // 最终指向setValue方法
          return this.setValue(item, value);
        };
        // 构建所有getxx方法
        this[getSuffix + item] = () => {
          // 最终指向getValue方法
          return this.getValue(item);
        };
      });
    }
  }
  /**
   * 设置值
   */
  setValue(key, value) {
    Log.i('local storage set->'+ key, value);
    wx.setStorageSync(key, value);
  }
  /**
   * 取值
   */
  getValue(key) {
    Log.i('local storage get->', key);
    return wx.getStorageSync(key);
  }
  /**
   * 清除所有值
   */
  clearAll(){
    wx.clearStorageSync();
  }
}
export default LocalStorage;