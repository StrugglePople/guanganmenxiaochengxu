// pages/center/message/message.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageIndex: 1,
    pageSize: 1,
    list: [],
    hasMore: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData(true);
  },
 
  getData(hasLoading) {
    var param = {
      accountId: getApp().globalData.session.id,
      notificationMessageType: 'SYSTEM_NOTIFICATION',
      pageIndex: this.data.pageIndex,
      pageSize: this.data.pageSize
    }
    getApp().request.post('message', hasLoading, param, (data) => {
      var hasMore = false;
      this.data.pageIndex++;
      this.data.list = this.data.list.concat(data);
      hasMore = data && data.length == this.data.pageSize;
      this.setData({
        list: this.data.list,
        hasMore: hasMore
      })
      wx.stopPullDownRefresh();
    },()=>{
      hasMore = false;
      this.setData({
        hasMore: hasMore
      })
    })
  },
  loadMore() {
    this.getData(true);
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setMessageRead();
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.data.pageIndex = 1;
    this.data.list = [];
    this.getData(true);
  },
  setMessageRead: function () {
    getApp().request.post("setMessageRead", false, {
      accountId: getApp().globalData.session.id
    });
  }
})