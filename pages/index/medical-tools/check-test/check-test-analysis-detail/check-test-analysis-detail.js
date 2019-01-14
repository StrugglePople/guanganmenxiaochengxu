// pages/index/medical-tools/check-test/check-test-analysis-detail/check-test-analysis-detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    getApp().request.postHeadNoToast('itemcontent', {
      hospitalId: getApp().globalData.hospitalIId,
      itemCd: options.id
    }, null, (json) => {
      // this.setData({
      //   title: json.resultData,
      // })
      var WxParse = require('../../../../../utils/wxParse/wxParse.js');
      WxParse.wxParse('article', 'html', json.resultData.content, this, 5);

    }, null, 'cms');
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  }
})