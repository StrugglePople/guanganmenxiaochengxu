// pages/record/appointment-record-detail/appointment-record-detail.js
const toast = require('../../../utils/toast/index.js');
const commonJs = require('../../../utils/common.js');
Page(Object.assign({}, toast, {

  /**
   * 页面的初始数据
   */
  data: {
    isCancelRecord: false,
    statusList: getApp().globalData.recordStatus,
    schedules: getApp().globalData.schedules
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.zhpTradeId = options.zhpTradeId;
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
    this.setData({
      phoneNumber: getApp().globalData.session.mobile
    });
    this.getData();
  },

  onHide: function() {},
  getData() {
    getApp().request.post('regDetail', this, {
      accountId: getApp().globalData.session.id,
      businessNo: this.zhpTradeId
    }, (data) => {
      this.setData({
        data: data
      })
      var barcode = require('../../../utils/barcode.js');
      barcode.code128(wx.createCanvasContext('barcode-show'), json.data.medicalCardNo, 250, 70);
      this.startInterval();
    })
  },

  cancelRecord() {
    this.setData({
      isCancelRecord: true
    })

  },


  getVerCode(e) {
    this.data.verCode = e.detail.value;
  },
  cancelCancelRecord() {
    this.setData({
      isCancelRecord: false,
      verCode: ''
    })
  },
  confirmCancelRecord() {
    this.setData({
      isCancelRecord: false
    })
    var param = {
      businessNo: this.data.data.zhpTradeId,
      accountId: getApp().globalData.session.id,
      verifyCode: this.data.verCode,
      from: getApp().globalData.from
    }
    getApp().widget.confirm('是否取消预约？', () => {
      getApp().request.post('cancelYuyue', true, {
          param
        },
        (json) => {
          this.getData();
          getApp().cache.setData('appoint.record.refresh', true);
        })
    })
  },
  deleteRecord() {
    var param = {
      businessNo: this.data.data.zhpTradeId,
      accountId: getApp().globalData.session.id,
      verifyCode: this.data.verCode
    }
    getApp().widget.confirm('是否取消预约？', () => {
      getApp().request.post('delectYuyue', true, {
        param
      },
        (json) => {
          this.getData();
          getApp().cache.setData('appoint.record.refresh', true);
        })
    })
  }
}))