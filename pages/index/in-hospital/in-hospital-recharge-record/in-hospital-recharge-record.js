// pages/index/in-hospital/in-hospital-recharge-record/in-hospital-recharge-record.js
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
    this.inpatientNO = options.inpatientNO
    this.initDate();
    this.getData();
  },

  initDate() {
    var beginDate = getApp().date.format(new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 90));
    var endDate = getApp().date.format(new Date());
    this.setData({
      beginDate: beginDate,
      endDate: endDate
    })
  },
  bindDateChange(e) {
    this.setData({
      [e.currentTarget.dataset.id]: e.detail.value
    })
  },
  getData() {
    var param = {
      medicalCardNo: this.inpatientNO,
      beginDate: this.data.beginDate,
      endDate: this.data.endDate,
      accountId: -1,
      hospitalId: getApp().globalData.selectHospitalId,
      'type': 'IN_PATIENT_CHARGE'
    }
    getApp().request.postWithToast('rechargeRecord', param, [], (json) => {
      if (json.success) {
        this.setData({
          list: json.data
        })
      } else {
        this.setData({
          list: []
        })
      }
    })
  },
  loadData() {
    if (getApp().date.compare(this.data.beginDate, this.data.endDate) == 1) {
      getApp().widget.toast('开始时间不能大于结束时间');
      return;
    }
    this.getData();
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  }
})