const app = getApp();
module.exports = {
    methodNeedLogin(e) {
      if (e.detail.userInfo){
        getApp().globalData.userInfo = e.detail.userInfo;
        getApp().cache.setData('userInfo', e.detail.userInfo)
      }
      if (app.isLogin()) {
          var method = e.currentTarget.dataset.method;
          if (this[method]) {
              this[method](e);
          }
      } else {
        app.widget.toastTxt("请先登录再使用此功能");
        
          // wx.navigateTo({
          //   url: '/pages/auth-setting/auth-setting'
          // });
      }
    },
    showPage(e) {
        var url = e.currentTarget.dataset.url;
        wx.navigateTo({
            url: url
        });
    }
};
