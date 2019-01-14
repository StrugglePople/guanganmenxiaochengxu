// pages/record/clinic-record/clinic-record.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectIndex: 0,
    hasMore: false,
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.source = options.source;
    this.setData({
      source: options.source
    })
    if (options.title) {
      wx.setNavigationBarTitle({
        title: options.title,
      })
    }
    this.yearMonth = '';
  },
  select(e) {
    var index = e.currentTarget.dataset.tab;
    if (index == this.data.selectIndex) return;
    this.yearMonth = '';
    this.setData({
      selectIndex: index,
      hasMore: false,
      list: []
    })
    this.getData(true);
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // if (this.data.selectIndex == 0) {
    //   this.onShowGuahao();
    // } else {
    //   this.onShowYuyue();
    // }
    this.onShowYuyue();
  },

  onShowGuahao() {
    var zhpTradeId = getApp().cache.getData('reg-record.delete');
    getApp().cache.removeKey('reg-record.delete');
    if (zhpTradeId) {
      for (let i = 0; i < this.data.list.length; i++) {
        if (zhpTradeId == this.data.list[i].zhpTradeId) {
          this.data.list.splice(i, 1);
          this.setData({
            list: this.data.list,
            hasMore: this.data.list.length > 0 ? this.data.hasMore : false
          })
          break;
        }
      }

    }

    var newMember = getApp().getSelectMember();
    if (!newMember) return;
    if (this.member && this.member.id == newMember.id) return;
    this.member = newMember;
    this.setData({
      member: this.member
    })
    this.yearMonth = '';
    this.data.list = [];
    this.getData(true);
  },
  onShowYuyue() {
    var zhpTradeId = getApp().cache.getData('appointment-record.delete');
    getApp().cache.removeKey('appointment-record.delete');
    if (zhpTradeId) {
      for (let i = 0; i < this.data.list.length; i++) {
        if (zhpTradeId == this.data.list[i].zhpTradeId) {
          this.data.list.splice(i, 1);
          this.setData({
            list: this.data.list,
            hasMore: this.data.list.length > 0 ? this.data.hasMore : false
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
    var newMember = getApp().getSelectMember();
    if (!newMember) return;
    if (this.member && this.member.id == newMember.id) return;
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
      accountId: getApp().globalData.session.id,
      regType: this.data.selectIndex == 0 ? 2 : 0,
      patientId: this.member.aesPatientId,
      yearMonth: this.yearMonth
    }
    getApp().request.post('getAppointmentOrRegOnline', hasLoading, param, null, (json) => {
      if (json.success) {
        this.yearMonth = json.data.monthName;
        if (!this.data.list) this.data.list = [];
        if (this.source == 'manyidu') {
          var array = [];
          for (var item of json.data.regRecords) {
            if (item.status == 'PASS') {
              array.push(item)
            }
          }
          json.data.regRecords = array;
        }
        this.data.list = this.data.list.concat(json.data.regRecords);
        this.data.hasMore = json.data && json.data.regRecords && json.data.regRecords.length > 0;
        this.setData({
          hasMore: this.data.hasMore
        })
      } else {
        this.setData({
          hasMore: false
        })
      }
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
    this.getData(false);
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
    var zhpTradeId = e.currentTarget.dataset.id;
    var url = '';
    if (this.data.selectIndex == 0) {
      wx.navigateTo({
        url: '../reg-record-detail/reg-record-detail?zhpTradeId=' + zhpTradeId,
      })
    } else {
      wx.navigateTo({
        url: '../appointment-record-detail/appointment-record-detail?zhpTradeId=' + zhpTradeId,
      })
    }
  }
})