// pages/index/clinic/expert-schedule/expert-schedule.js
const loginExtends = require('../../../utils/loginExtends.js')

Page(Object.assign({}, loginExtends, {

  /**
   * 页面的初始数据
   */
  data: {
    selectIndex: 0,
    hiddenDefaultDoctor: true,
    showSchedule:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    var data = getApp().cache.getData('clinicInfo');
    // data.doctor.src = getApp().request.url.mobile + '/mobile/image/hospital/' + getApp().globalData.hospitalId + '/expert/' + data.doctor.picName
    this.setData(data);
    var scheduleList = this.handleScheduleList();
    this.setData({
      scheduleList: scheduleList,
      height: getApp().globalData.device.windowHeight - 160,
      height1: getApp().globalData.device.windowHeight  - 150,
    })
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

  handleScheduleList() {
    for (let item of this.data.scheduleList) {
      item.scheduleDate = item.scheduleDate.split(" ")[0];
    }
    return this.data.scheduleList;
  },

  select(e) {
    var index = e.currentTarget.dataset.tab;
    this.setData({
      selectIndex: index
    })
  },
  showHiddenDoctor(e) {
    this.setData({
      hiddenDefaultDoctor: false
    })
  },
  chooseSchedule(e) {
    var scheduleId = e.currentTarget.dataset.schedule;
    var schedule;
    for (var i = 0; i < this.data.scheduleList.length; i++) {
      if (scheduleId == this.data.scheduleList[i].id) {
        schedule = this.data.scheduleList[i];
        break;
      }
    }
    var data = getApp().cache.getData('clinicInfo');
    // if (!getApp().isLogin()) {
    //   wx.navigateTo({
    //     url: '/pages/auth-setting/auth-setting'
    //   });
    //   return;
    // }
    data.schedule = schedule;
    data.time = null;
    getApp().cache.setData('clinicInfo', data);
    wx.navigateTo({
      url: '../clinic-info/clinic-info',
    })
  },
  choosetimes(e) {
    var index = e.currentTarget.dataset.index;
    var time = this.data.schedule.times[index];
    var data = getApp().cache.getData('clinicInfo');
    data.schedule = this.data.schedule;
    data.time = time;
    getApp().cache.setData('clinicInfo', data);
    wx.navigateTo({
      url: '../clinic-info/clinic-info',
    })
  },
  hiddenSchedule() {
    this.setData({
      showSchedule: false
    })
  }
}))