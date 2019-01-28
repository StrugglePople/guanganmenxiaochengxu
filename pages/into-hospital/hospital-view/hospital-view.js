// pages/into-hospital/hospital-view/hospital-view.js
var WxParse = require('../../../utils/wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type:'HOSPITAL_INFO'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      type: options.type
    });
  
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
    this.getViewData(this.data.type);
  },

 getViewData(data){
   var request = require("../../../utils/request.js");
   request.postNoToast('hospitalNoteInfo', {
     hospitalId: getApp().globalData.hospitalIId,
     type: data 
   }, (data) => {
     WxParse.wxParse('article', 'html', data.content, this, 5);
   }, null, 'mobile');
 },

  tabChange :function(e){
    WxParse.wxParse('article', 'html', '', this, 5);
    this.getViewData(e.currentTarget.dataset.type);
    this.setData({
      type: e.currentTarget.dataset.type
    })
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