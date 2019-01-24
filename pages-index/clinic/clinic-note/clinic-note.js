// pages/index/clinic/clinic-note/clinic-note.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    height: 200,
    regType: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      height: getApp().globalData.device.windowHeight - 60,
      regType:options.regType
    });
    getApp().request.postWithToast('loadContentInfo', { type: 'GUAHAO' },
      (data) => {
        var WxParse = require('../../../utils/wxParse/wxParse.js');
        WxParse.wxParse('article', 'html', data.content, this, 5);
      })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  showNext(e) {
    var hospitalId = e.currentTarget.dataset.id;
    getApp().globalData.selectHospitalId = hospitalId - 0;
    wx.redirectTo({
      url: '../dept-expert/dept-expert?regType=' + this.data.regType
    })
  }
})