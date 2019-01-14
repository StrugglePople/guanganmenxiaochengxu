// pages/index/in-hospital/in-hospital-info/in-hospital-info.js
const toast = require('../../../../utils/toast/index.js');
const commonJs = require('../../../../utils/common.js');
Page(Object.assign({}, toast,{

  /**
   * 页面的初始数据
   */
  data: {
    selectMoney: 500,
    selectMoney1: 500,
    showCharge: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var json = JSON.parse(options.jsonStr);
    this.setData({
      item: json
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getData()
  },


  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.getData();
  },

  getData() {
    var param = {
      inpatientName: this.data.item['inpatientName'],
      idCardNo: this.data.item['idCardNo'],
      inpatientNO: this.data.item['inpatientNO'],
      hospitalId: getApp().globalData.selectHospitalId
    }
    getApp().request.post('inHospitalInfo', false, param, null, (json) => {
      if (json.success) {
        this.data.item.totalAmount = json.data.totalAmount;
        this.data.item.balance = json.data.balance;
        this.setData({
          item: this.data.item
        })
      }
      wx.stopPullDownRefresh();
    })
  },
  changeMoney(e) {
    var money = e.currentTarget.dataset.money;
    this.setData({
      selectMoney: money,
      selectMoney1: money
    })
  },
  changeInput(e) {
    var money = e.detail.value;
    this.setData({
      selectMoney: money
    });
    console.log(money+'')
  },
  hiddenCharge() {
    this.setData({
      showCharge: false
    })
  },
  showCharge() {
    this.setData({
      showCharge: true
    })
  },
  charge() {
    if (!this.data.selectMoney || this.data.selectMoney - 0 <= 0) {
      this.showZanToast('请输入金额');
      return;
    }
    var param = {
      hospitalId: getApp().globalData.selectHospitalId,
      accountId: getApp().globalData.session.id,
      idCardNo: this.data.item.idCardNo,
      fee: this.data.selectMoney,
      inpatientName: this.data.item.inpatientName,
      source: 8,
      inpatientNO: this.data.item.inpatientNO,
    }
    getApp().request.post('inHospitalRecharge', this, param, [], (json) => {
      if (json.success) {
        commonJs.zhicallPay(json.data.tradeNo, () => {
          this.setData({
            showCharge: false
          })
          getApp().widget.alert('支付成功', () => {
            var param = {
              zhpFundSerialNo: json.data.outTradeNo,
              zhpChargeSerialNo: json.data.outTradeNo
            }
            getApp().request.postWithToast('inHospitalRechargeResult', param, [], (json) => {
              if (json.success) {
                var title = '充值异常';
                var message = '请稍后去充值记录查看结果';
                if (json.data.base.status == 'SUCCESS') {
                  title = '充值成功';
                  message = '充值成功， 如需发票，请到医院收费处咨询打印';
                } else if (json.data.base.status == 'FAIL') {
                  title = '充值失败';
                  message = '充值处理失败,退费金额将在1 - 2天自动退还至您的支付账号';
                }
                getApp().widget.alert(message, null, title);
              }
              this.getData();
            })
          })
        })
      }
    })
  },
  showRecord() {
    wx.navigateTo({
      url: '../in-hospital-record/in-hospital-record?jsonStr='+JSON.stringify(this.data.item),
    })
  }
}))