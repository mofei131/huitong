
var isReady=false;var onReadyCallbacks=[];
var isServiceReady=false;var onServiceReadyCallbacks=[];
var __uniConfig = {"pages":["pages/index/index","pages/train/train","pages/mine/mine","pages/mine/order","pages/mine/authe","pages/mine/about","pages/mine/contract","pages/train/video","pages/mine/setUp","pages/login/login","pages/login/reg","pages/login/forget","pages/login/agreement"],"window":{"navigationBarTextStyle":"white","navigationBarBackgroundColor":"#1890FF"},"tabBar":{"list":[{"pagePath":"pages/index/index","iconPath":"static/images/index.png","selectedIconPath":"static/images/index2.png","text":"首页"},{"pagePath":"pages/train/train","iconPath":"static/images/BAI.png","selectedIconPath":"static/images/BAI2.png","text":"培训"},{"pagePath":"pages/mine/mine","iconPath":"static/images/wode.png","selectedIconPath":"static/images/wode2.png","text":"我的"}]},"nvueCompiler":"uni-app","nvueStyleCompiler":"uni-app","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"huitong","compilerVersion":"3.1.22","entryPagePath":"pages/index/index","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/index/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"首页","titleNView":false}},{"path":"/pages/train/train","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"培训"}},{"path":"/pages/mine/mine","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"我的","titleNView":false}},{"path":"/pages/mine/order","meta":{},"window":{"navigationBarTitleText":"环保检测"}},{"path":"/pages/mine/authe","meta":{},"window":{"navigationBarTitleText":"认证","titleNView":{"buttons":[{"text":"修改","fontSize":"26rpx","float":"right"}]}}},{"path":"/pages/mine/about","meta":{},"window":{"navigationBarTitleText":"关于我们"}},{"path":"/pages/mine/contract","meta":{},"window":{"navigationBarTitleText":"服务协议"}},{"path":"/pages/train/video","meta":{},"window":{"navigationBarTitleText":"视频"}},{"path":"/pages/mine/setUp","meta":{},"window":{"navigationBarTitleText":"账号与安全"}},{"path":"/pages/login/login","meta":{},"window":{"navigationBarTitleText":"","navigationBarBackgroundColor":"#FFFFFF"}},{"path":"/pages/login/reg","meta":{},"window":{"navigationBarTitleText":"","navigationBarBackgroundColor":"#FFFFFF"}},{"path":"/pages/login/forget","meta":{},"window":{"navigationBarTitleText":"忘记密码","navigationBarBackgroundColor":"#FFFFFF"}},{"path":"/pages/login/agreement","meta":{},"window":{"navigationBarTitleText":"用户协议"}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
__uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});
