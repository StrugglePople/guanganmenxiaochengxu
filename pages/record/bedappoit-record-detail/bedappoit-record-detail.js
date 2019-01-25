// pages/record/appointment-record-detail/appointment-record-detail.js
const toast = require('../../../utils/toast/index.js');
const commonJs = require('../../../utils/common.js');
Page(Object.assign({}, toast, {

  /**
   * 页面的初始数据
   */
  data: {
    isCancelRecord: false,
    statusList: {
      "PASS": "预约成功",
      "INIT": "预约中",
      "APPOINTTING": "待确认"
    }

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var data = getApp().cache.getData("bedAppointDetail");
    this.setData({
      data: getApp().cache.getData("bedAppointDetail")
    });
    
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
    
  },

  onHide: function () {
  }
}))