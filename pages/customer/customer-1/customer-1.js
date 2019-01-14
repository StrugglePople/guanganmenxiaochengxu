// pages/customer/customer-1/customer-1.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    event: null,
    list: [],
    scrollTop:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var avatarUrl = getApp().globalData.userInfo ? getApp().globalData.userInfo.avatarUrl : '../../../style/image/t-face.svg';
    this.setData({
      height: getApp().globalData.device.windowHeight,
      avatarUrl: avatarUrl
    })
    
    this.loadEvents(() => {
      this.initData()
      this.fillData();
    })
  },

  initData(node) {
    getApp().request.post('kefuInit', true, { node: this.data.event.eventNode.nodeName}, null, (json) => {
      if (json.success) {
        if (json.data) {
          this.data.list.push({ type: 0, data: json.data, isFirst: true  });
        }
        this.setData({
          list: this.data.list
        })
      }
    }, null, '51yizhu');
  },

  getData(question) {
    this.data.list.push({ type: 1, question: question});
    this.setData({
      list: this.data.list
    })
    getApp().request.post('kefuData', true, { question: question}, null, (json) => {
      if (json.success) {
        if (json.data) {
          this.data.list.push({ type: 0, data: json.data });
          for (var i = 0; i < this.data.list.length; i++) {
            if (this.data.list[i].type == 0) {
              this.data.list[i].isFirst = true;
              break;
            }
          }
          this.setData({
            list: this.data.list
          });
          setTimeout(() => {
            this.pageScrollToBottom();
          }, 100);
        }
      }
    }, null, '51yizhu');
  },
  confirm(e) {
    var value = e.detail.value;
    if (!value) return;
 
    this.getData(value);
    this.setData({
      'inputValue': ''
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },
  loadEvents(callback) {
    if (!getApp().globalData.session) return;
    setTimeout(() => {
      getApp().request.post('LatestEvent', false, { medicalCardNo: getApp().globalData.session.id }, null, (json) => {
        if (json.success) {
          this.setData({
            'event': json.data,
          })
          if (callback) {
            callback();
          }
        } else {
          this.setData({
            'event': null
          })
        }
      })
    })
  },
  fillData() {
    if (this.data.event.businessType == 'YUYUE_ONLINE' || this.data.event.businessType == 'GUAHAO_ONLINE') {
      //先取消上次请求
      this.getClinicRecord(this.data.event.businessId)
    } else if (this.data.event.businessType == 'PAYMENT' && this.data.event.eventNode.nodeName == '缴费单') {
      this.getPayMent(this.data.event.businessId);
    }
  },
  getClinicRecord(businessId) {
    if (this.data.event.requestTask) {
      this.data.event.abort();
    }
    this.data.event.requestTask = getApp().request.post('regDetail', false, { businessNO: businessId }, [], (json) => {
      if (json.success) {
        if (json.data.regTime == 'MORNING') {
          json.data.regTimeStr = '上午';
        } else if (json.data.regTime == 'AFTERNOON') {
          json.data.regTimeStr = '下午';
        } else {
          json.data.regTimeStr = '晚上';
        }
        this.setData({
          'event.ext': json.data
        })
      }
    })
  },
  getPayMent(businessId) {
    if (this.data.event.requestTask) {
      this.data.event.requestTask.abort();
    }
    var param = {
      hospitalId: this.data.event.companyId,
      zhpBussinessNo: businessId
    }
    this.data.event.requestTask = getApp().request.post('billDetail', false, param, null, (json) => {
      if (json.success) {
        json.data.show = false;
        json.data.selfFee = (json.data.totalFee - json.data.totalMedicalFee).toFixed(2);
        this.setData({
          'event.ext': json.data
        })
      }
    })
  },
  showDetail(e) {
    var id = e.currentTarget.dataset.id;
    if (!id || id <= 0) return;
    var title = e.currentTarget.dataset.title;
    this.data.list.push({ type: 1, question: title });
    getApp().request.post('kefuAnswer', true, { questionId: id }, null, (json) => {
      if (json.success) {
        this.data.list.push({ type: 2, data: json.data });
        this.setData({
          list: this.data.list
        })
        setTimeout(() => {
          this.pageScrollToBottom();
        }, 100);
      }
    }, null, '51yizhu');
    // wx.navigateTo({
    //   url: '../customer-2/customer-2?id=' + id + '&title=' + title,
    // })
  },
  call(e) {
    var tel = e.currentTarget.dataset.title;
    getApp().widget.confirm(tel, () => {
      wx.makePhoneCall({
        phoneNumber: tel,
      })
    }, '联系客服', ['拨号'])
  },
  pageScrollToBottom: function () {
    wx.createSelectorQuery().select('#red').boundingClientRect( (rect) => {
      // 使页面滚动到底部
      this.setData({
        scrollTop: rect.bottom
      })
      // wx.pageScrollTo({
      //   scrollTop: rect.bottom
      // })
    }).exec()
  },
})