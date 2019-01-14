var getOpenId = (success, fail) => {
  wx.checkSession({
    success: () => {
      if (!getApp().cache.getData('openId')) {
        exports.wxLogin(success, fail);
      } else {
        if (success) {
          success(getApp().cache.getData('openId'))
        }
      }
    },
    fail: () => {
      exports.wxLogin(success, fail);
    }
  })

}
exports.wxLogin = (success, fail) => {
  getApp().cache.removeKey('openId');
  getApp().cache.removeKey('session_key');
  wx.login({
    success: (res) => {
      if (res.code) {
        getApp().request.postWithToast('wxSession', { appid: getApp().globalData.appid, resCode: res.code }, null,
          (json) => {
            if (json.success) {
              getApp().cache.setData('openId', json.data.openid);
              getApp().cache.setData('session_key', json.data.session_key);
              if (success) {
                success(json.data.openid)
              }
            } else {
              if (fail) {
                fail();
              }
            } 
          })
      }
    },
    fail: ()=> {
      if (fail) {
        fail();
      }
    }
  })
}



module.exports.getOpenId = getOpenId;