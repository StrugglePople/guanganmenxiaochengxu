// pages/more/html-view/html-view.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  type: {
    'ABOUT_US': '关于我们',
    'DISCLAIMER': '免责声明',
    'gonggao': ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (options.title) {
      wx.setNavigationBarTitle({
        title: options.title
      })
      return;
    }
    this.data.newsId = options.newsId;
    var type = options.type;
    wx.setNavigationBarTitle({
      title: this.type[type]
    })
    this.setData({
      type: type,
    })
    if (!this.data.type) {
      var content = getApp().cache.getData('html.data');
      getApp().cache.removeKey('html.data');
      var WxParse = require('../../../utils/wxParse/wxParse.js');
      WxParse.wxParse('article', 'html', content, this, 5);
      return;
    }
    if (this.data.type == "gonggao") {
      getApp().request.postHeadWithToast('getNewDetail', {
        hospitalId: getApp().globalData.hospitalId,
        familyId: 0
      }, [this.data.newsId],
        (data) => {
          wx.setNavigationBarTitle({
            title: data.title
          })
          var WxParse = require('../../../utils/wxParse/wxParse.js');
          WxParse.wxParse('article', 'html', data.newsDetail, this, 5);
        }, null, "zixun")
    } else {
      getApp().request.postWithToast('loadContentInfo', {
        type: this.data.type
      },
        (data) => {
          var WxParse = require('../../../utils/wxParse/wxParse.js');
          WxParse.wxParse('article', 'html', data.content, this, 5);
        })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    


  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  }
})