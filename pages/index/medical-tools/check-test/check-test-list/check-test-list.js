// pages/index/medical-tools/check-test/check-test-analysis/check-test-analysis.js
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
    getApp().request.postHeadNoToast('checklistitems', {
      hospitalId: getApp().globalData.hospitalIId,
    }, null, (json) => {
      this.setData({
        testList: json.resultData,
      })

    }, null, 'cms');

  },

  toDetialView: function (e) {

    wx.navigateTo({
      url: '../../check-test/check-test-analysis-detail/check-test-analysis-detail?id=' + e.currentTarget.dataset.id
    })
  },

  search: function (e) {
    getApp().request.postHeadNoToast('checklistitems', {
      keyWord: e.detail.value,
      hospitalId: getApp().globalData.hospitalIId,
    }, null, (json) => {
      this.setData({
        testList: json.resultData,
      })

    }, null, 'cms');
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