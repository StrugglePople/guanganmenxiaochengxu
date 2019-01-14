// pages/record/reg-record-detail/reg-record-detail.js
const toast = require('../../../utils/toast/index.js');
const commonJs = require('../../../utils/common.js');
Page(Object.assign({}, toast,{

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.zhpTradeId = options.zhpTradeId;
    this.source = options.source;
  },
  getData() {
    getApp().request.post('regDetail', this, { businessNO: this.zhpTradeId }, [], (json) => {
      if (json.success) {
        this.setData({
          data: json.data
        })
        var barcode = require('../../../utils/barcode.js');
        barcode.code128(wx.createCanvasContext('barcode-show'), json.data.medicalCardNo, 250, 70);
      }
    })
  },
  deleteRecord() {
    getApp().widget.confirm('是否删除记录？', () => {
      getApp().request.post('deleteRegRecord', this, null, [this.zhpTradeId], (json) => {
        if (json.success) {
          getApp().cache.setData('reg-record.delete', this.zhpTradeId);
          wx.navigateBack();
        }
      })
    })
  },
  confirm() {
    getApp().widget.confirm('线上支付均为全额自费，暂不支持医保结算及医保报销。', () => {
      getApp().request.post('confirmReg', this, { hospitalId: this.data.data.hospitalId }, [this.data.data.hospitalId, this.data.data.id], (json) => {
        if (json.success) {
          commonJs.zhicallPay(json.data.tradeNo, () => {
            wx.redirectTo({
              url: '/pages/pay-result/pay-result-for-clinic/pay-result-for-clinic?zhpTradeId=' + this.zhpTradeId + '&type=' + 2 + '&source=' + this.source,
            })
          })
        }
      })
    }, '温馨提示');

  },
  map(e) {
    var deptId = this.data.data.deptId;
    var hospitalId = this.data.data.hospitalId;
    if (!deptId) {
      wx.navigateToMiniProgram({
        appId: 'wx0fb39a1dc27c5e6d',
        path: 'pages/index?id=YflTGH3fHY',
      })
    } else {
      getApp().request.post('hisDept', this, { hospitalId: hospitalId }, [hospitalId, deptId], (json) => {
        if (json.data) {
          wx.navigateToMiniProgram({
            appId: 'wx0fb39a1dc27c5e6d',
            path: 'pages/index?id=YflTGH3fHY&appKey=ghpHT52Lu5&poi=' + json.data.hisDeptId,
          })
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getData();
  }
}))