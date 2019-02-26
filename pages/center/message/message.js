// pages/center/message/message.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageIndex: 1,
    pageSize: 10,
    list: [],
    hasMore: false,
    massageType:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.massageType = options.type;
    this.getData(true);
  },
 
  getData(hasLoading) {
    var param = {
      accountId: getApp().globalData.session.id,
      notificationMessageType: this.data.massageType,
      pageIndex: this.data.pageIndex,
      pageSize: this.data.pageSize
    }
    getApp().request.post('message', hasLoading, param, (data) => {
      var hasMore = false;
      this.data.pageIndex++;
      if (data && data.length > 0){
        for (var i = 0; i < data.length; i++) {
          data[i].content0 = data[i].content.split('|')[0];
        }
      }
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
    if (this.data.massageType == "USER_NOTIFICATION"){
      this.setMessageRead();
    }
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
  },
  showMessgaDetail: function(e){
    var index = e.currentTarget.dataset.index,
        message = this.data.list[index];
    if (message.type == "SYSTEM_NOTIFICATION") {
      let arr = message.content.split('|');
      if (arr.length > 1) {
        getApp().cache.setData('sourceURL', arr[1]);
        wx.navigateTo({
          url: '/pages/more/web-view/web-view?title=随访通知'
        })
      }
    }
  }
})