// pages/more/web-view.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    doctor: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '医生详情',
    })
    this.setData({
      doctor: getApp().cache.getData('static.doctor')
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
  },
  showHiddenDoctor(){
    this.setData({
      'doctor.src': '/style/svg/expert.svg'
    });
    
  }
})
