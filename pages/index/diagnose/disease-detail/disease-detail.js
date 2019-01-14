// pages/index/diagnose/disease-detail/disease-detail.js
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
    this.id = options.id;
    this.getData();
  },

  getData() {
    getApp().request.post('getDiseaseDetail', true, null, [this.id, getApp().globalData.hospitalId], (json) => {
      if (json.success) {
        this.setData({
          data: json.data
        })
      }
    })
  },
  backMan() {
    wx.switchTab({
      url: '/pages/index/index/index'
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  }
})