// pages/index/in-hospital/in-hospital-record/in-hospital-record.js
const toast = require('../../../../utils/toast/index.js');
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
    var json = JSON.parse(options.jsonStr);
    var endDate = getApp().date.format(new Date());
    this.setData({
      item: json,
      beginDate: getApp().date.format(new Date()),
      endDate: endDate
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getData();
  },

  getData() {
    var param = {
      inpatientName: this.data.item.inpatientName,
      beginDate: this.data.beginDate,
      inpatientNO: this.data.item.inpatientNO,
      hospitalId: getApp().globalData.selectHospitalId
    }
    getApp().request.post('inHospitalRecord',this,param,[], (json)=>{
      if (json.success) {
        this.setData({
          data: this.caculate(json.data[0])
        })
      } else {
        this.setData({
          data: null
        })
      }
    })
  },
  caculate(data) {
    let med = 0;
    for (let item of data.feeItems) {
      med += item.totalMedicalFee * 1;
    }
    data.totalMedicalFee = med.toFixed(2);
    data.totalSelfFee = (data.totalFee - med).toFixed(2);
    for (var i = 0; i < data.feeItems.length; i++) {
      for (var item of data.feeItems[i].feeDetailItem) {
        item.selfFee = (item.fee - item.medicalFee).toFixed(2)
      }
    }
    return data;
  },

  bindDateChange(e) {
    this.setData({
      [e.currentTarget.dataset.id]: e.detail.value
    })
    this.getData();
  },

}))