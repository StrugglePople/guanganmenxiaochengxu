// pages/more/faq/faq.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: []
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
    getApp().request.post('getFaqs', false, null, (data)=> {
      this.setData({
        list: data
      })
    })
  },

  showNext(e) {
    wx.navigateTo({
      url: '../faq-detail/faq-detail?jsonStr=' + JSON.stringify(this.data.list[e.currentTarget.dataset.item]),
    })
  }
})