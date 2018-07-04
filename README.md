## 整体思路
![image](https://note.youdao.com/yws/public/resource/809ec2c297feb5131603bad9e88dc43f/xmlnote/713FE958F94942E4A316EE6D3159BC6D/32489)


## 项目目录（update by MagicFox at 2018.07.02 ）
```

├── README.md                           
├── app.js                              模板自带
├── app.json                            
├── app.wxss                            
├── common                              公用模块
│   ├── model                           实体类
│   │   ├── ApiResult.js                接口结果类 
│   │   ├── Server.js                   接口类
│   │   └── User.js                     用户类
│   ├── plugins                         第三方api
│   │   ├── wx-request                  网络请求封装
│   │   └── wx-service                  Promise 封装 wx 原生方法
│   ├── service                         网络封装层
│   │   ├── HttpService.js              网络请求类
│   │   ├── user-service.js             用户相关的接口
│   └── storage                         存储层
│       └── LocalStorage.js             本地存储
├── components                          组件模块
│   ├── component.js                    
│   ├── tip.js
│   └── tips                            公用提示控件
│       ├── tips.js
│       └── tips.wxml
├── config                              全局配置
│   └── config.js                       
├── dict                                静态数据
│   ├── StorageKeys.js                  本地数据存储key
├── images                              图片
├── pages                               页面
│   ├── index                           首页
│   │   ├── ...
│   ├── logs                            模板自带log页面
│   │   ├── ...
├── project.config.json                 模板自带
└── utils                               项目工具
    ├── location-util.js                定位
    ├── log.js                          日志
    ├── parse-util.js                   数据转换
    ├── qqmap-wx-jssdk.min.js           腾讯地图
    ├── util.js                         工具
    ├── validate-util.js                数据验证
    └── wx-api-util.js                  wx api

```


## 功能使用

- 网络请求
在[skyvow的项目](https://github.com/skyvow/wx-extend)基础之上

```
新增：
    支持统一处理 loading & stop stop refresh & show err message
    可配置多网络域名
        master/slave/自定义
    支持返回不同接口不同实体且业务处理结果标识的不同
        master返回success为true时表示业务处理成功
        slave返回code为B1000时表示业务处理成功
    支持结果返回网络异常、业务处理结果标识
        isNetError:是否网络请求失败
        isBizError:是否业务处理失败

```

```

master/slave接口服务返回实体不同,配置两个server请求对象于config/config.js:
masterServer  master接口请求对象
slaveServer  slave接口请求对象

网络请求处理过程:
1,引用网络请求基类
2,调用封装请求对象
3,处理请求结果

1,引用网络请求基类
var baseService = require('/common/service/HttpService.js');

2,调用封装请求对象
直接调用
baseService.masterServer.httpRequest({
    url: 'sign/searchHistory',
    method: 'post',
    data: {
      id: xxx
    },
    toast: {
      showErrorMsg: true,
      stopRefresh: true
    },
}).then(data => {
    // 成功
}).catch(error => {
    // 失败
    Log.d('task-list.submitTasks fail', error);
});
or 封装调用
// step 1,封装网址&请求方式&是否提示
function historyList(params) {
  return baseService.masterServer/slaveServer.httpRequest({
    url: 'sign/searchHistory',
    method: 'post',
    data: params,
    toast: {
      showErrorMsg: true,
      stopRefresh: true
    },
  });
}
// step 1,回调
historyList({id:xxx})
.then(data => {
    // 成功
}).catch(error => {
    // 失败
    Log.d('task-list.submitTasks fail', error);
});


## 上线需知
一.确认服务器环境及地址
二.确认车长数据
三.删除为测试方便而改的配置


一.确认服务器环境及地址
    确认修改config/config.js文件配置的内容:
      API_ENVIRONMENT = 'prd' // 正式环境 
      is_debug:false // 关闭日志开关
      app_version: xxx // 修改版本号(找产品确认,虽然没显示,也可以做个提交记录)
二.确认数据
    此处省略你的真实项目配置
三.删除为测试方便而改的配置
    此处省略你的真实项目配置
    
```