// pages/record/appointment-record/appointment-record.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    statusList: getApp().globalData.recordStatus
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    getApp().cache.removeKey('appoint.record.refresh');
    this.yearMonth = '';
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
    var zhpTradeId = getApp().cache.getData('appointment-record.delete');
    getApp().cache.removeKey('appointment-record.delete');
    if (zhpTradeId) {
      for (let i = 0; i < this.data.list.length; i++) {
        if (zhpTradeId == this.data.list[i].zhpTradeId) {
          this.data.list.splice(i, 1);
          this.setData({
            list: this.data.list
          })
          break;
        }
      }

    }
    var isRefresh = getApp().cache.getData('appoint.record.refresh');
    getApp().cache.removeKey('appoint.record.refresh');
    if (isRefresh) {
      this.yearMonth = '';
      this.data.list = [];
      this.getData(true);
      return;
    }
    var newMember = getApp().accountServer.getSelectMember();
    if (!newMember) return;
    if (this.member && this.member.id == newMember.id && this.data.list.length > 0) return;
    this.member = newMember;
    this.setData({
      member: this.member
    })
    this.yearMonth = '';
    this.data.list = [];
    this.getData(true);
  },

  getData(hasLoading) {
    var param = {
      name: this.member.name,
      idCard: this.member.idNo
    }
    getApp().request.post('getBedAppointment', hasLoading, param, (data) => {
      this.yearMonth = data.monthName;
      if (!this.data.list) this.data.list = [];
      this.data.list = this.data.list.concat(data);
      this.setData({
        list: this.data.list,
        isLoading: false
      })
      wx.stopPullDownRefresh();
    }, () => {
      this.setData({
        list: this.data.list,
        isLoading: false
      })
      wx.stopPullDownRefresh();
    })
  },
  loadMore() {
    this.setData({
      isLoading: true
    })
    this.getData(true);
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
    this.yearMonth = '';
    this.data.list = [];
    this.getData(false);
  },

  showDetail(e) {
    var index = e.currentTarget.dataset.index;
    getApp().cache.setData("bedAppointDetail", this.data.list[index]);
    wx.navigateTo({
      url: '../bedappoit-record-detail/bedappoit-record-detail',
    })
  }
})