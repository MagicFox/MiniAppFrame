/**
 * 将对象转换成url
 */
function jsonToUrl(url, params) {
  let _keys = Object.keys(params);
  let _str = '';
  if (url.indexOf('?') == -1 && _keys.length > 0) {
    _str = '?';
    _keys.map((item) => {
      _str += '&' + item + '=' + params[item];
    });
  }
  return _str;
};


module.export = {
  jsonToUrl,
}