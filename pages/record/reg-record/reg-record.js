// pages/record/reg-record/reg-record.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasMore: false,
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    getApp().cache.removeKey('appoint.record.refresh');
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

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
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

  getData(hasLoading) {
    var param = {
      accountId: getApp().globalData.session.id,
      regType: 1,
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

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  showDetail(e) {
    var zhpTradeId = e.currentTarget.dataset.id;
    var id = e.currentTarget.dataset.mId;
    if (this.source == 'manyidu') {
      if (getApp().globalData.mode == 'debug') {
        getApp().cache.setData("sourceURL", 'https://www.317hu.com/introPage/page/wechatPage/satisfactionForZhicall.html?evn=uat&hospitalId=317&appkey=adf48d47348b44d897b2f29501fd3b56&paperId=14038&patientId=' + this.member.id + id);
      }

      wx.navigateTo({
        url: '../../more/web-view/web-view?title=满意度问卷'
      })
      return;
    }

    wx.navigateTo({
      url: '../reg-record-detail/reg-record-detail?zhpTradeId=' + zhpTradeId,
    })
  }
})