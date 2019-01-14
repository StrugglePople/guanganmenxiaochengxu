// pages/more/web-view.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    webUrl: ''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var title = options.title || ''
    this.data.options = options;
    if (this.data.options.name == 'HEALTH') {
      title = '健康资讯';
    } else if (this.data.options.name == 'NEWS') {
      title = '医院新闻';
    } else if (this.data.options.name == 'HOSPITAL') {
      title = '医院介绍';
    } else if (this.data.options.name == 'INSTRUCTIONS') {
      title = '就医指南';
    }
    wx.setNavigationBarTitle({
      title: title,
    })

    var str = ''
    var myself = this;
    var url = getApp().cache.getData('sourceURL');
    if (url.indexOf('https://mng.zhicall.cn/news/index.html') > -1 && getApp().globalData.mode == 'debug') {
      url += '&uat=dev';
    }
    this.setData({
      webUrl: url
    })
    getApp().cache.removeKey('sourceURL');
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
