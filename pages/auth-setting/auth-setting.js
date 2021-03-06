// pages/auth-setting/auth-setting.js
const commonJs = require('../../utils/common.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.shouquan();
    wx.showShareMenu({
      withShareTicket: true
    })
  },

  shouquan() {
    this.wxLogin();
  },

  wxLogin(success) {
    getApp().cache.removeKey('app.session');
    getApp().cache.removeKey('openId');
    getApp().cache.removeKey('session_key');
    wx.login({
      success: (res) => {
        if (res.code) {
          getApp().request.post('wxSession', true, {
              appid: getApp().globalData.appid,
              resCode: res.code
            },
            (data) => {
              getApp().cache.setData('openId', data.openid);
              getApp().cache.setData('session_key', data.session_key);
              if (success) {
                success();
              }
            })
        }
      }
    })
  },

  getPhoneNumber(e) {
    if (!getApp().cache.getData('session_key')) {
      this.wxLogin(()=> {
        this.getPhoneNumber2(e);
      })
      return;
    }
    this.getPhoneNumber2(e);
  },

  getPhoneNumber2(e) {
    var session_key = getApp().cache.getData('session_key')
    var WXBizDataCrypt = require('../../utils/WXBizDataCrypt.js');
    var pc = new WXBizDataCrypt(getApp().globalData.appid, session_key);
    var data = pc.decryptData(e.detail.encryptedData, e.detail.iv);
    var userInfo = getApp().globalData.userInfo || {};
    userInfo.openId = getApp().cache.getData('openId');
    userInfo.mobile = data.phoneNumber || data.purePhoneNumber;
    getApp().globalData.userInfo = userInfo;
    getApp().cache.setData('userInfo', userInfo);

    // var userInfo = getApp().globalData.userInfo || {};
    // userInfo.mobile = "15067127499"; //18858285384
    // getApp().globalData.userInfo = userInfo;
    // getApp().cache.setData('userInfo', userInfo)
    this.login();
  },

  login() {
    wx.showLoading({
      title: "登陆中",
      mask: true
    });
    getApp().request.post('doLogin', "登陆中", {
        openId: getApp().globalData.userInfo.openId,
        mobileNo: getApp().globalData.userInfo.mobile,
        // openId: "fsafsafdsfeerre",
        // mobileNo: "15067127499",
        origin: 1
      },
      (data) => {
        getApp().globalData.session = data;
        getApp().init.getCards(()=>{
          wx.navigateBack()
        });
        
      },getApp().init.initSessionFail)
  }
});