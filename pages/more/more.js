// pages/more/more.js
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
  
  },

  showHtml(e) {
    wx.navigateTo({
      url: 'html-view/html-view?type=' + e.currentTarget.dataset.type,
    })
  },
  call() {
    getApp().request.postWithToast('loadContentInfo', { type: 'ZHICALL_PHONE' }, null,
      (json) => {
        if (json.success) {
          getApp().widget.confirm(json.data.content,()=> {
            wx.makePhoneCall({
              phoneNumber: json.data.content,
            })
          }, '联系客服', ['拨号'])
        }
      })
  }
})