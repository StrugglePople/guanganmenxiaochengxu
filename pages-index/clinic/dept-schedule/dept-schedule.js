// pages/index/clinic/dept-schedule/dept-schedule.js
const loginExtends = require('../../../utils/loginExtends.js')
Page(Object.assign({}, loginExtends, {

  /**
   * 页面的初始数据
   */
  data: {
    selectIndex: 0,
    showFare:false,
    scheduleList:[],
    schedules :{
      E_MORNING: '凌晨',
      MORNING: '上午',
      NOON: '中午',
      AFTERNOON: '下午',
      EVENING: '夜间',
      ALLDAY: '全天',
      DAY: "白天"
    },
    dayOfWeek: ['日','一', '二', '三', '四', '五', '六']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var scheduleInfo = getApp().cache.getData('clinicInfo');
    this.setData({
      ...scheduleInfo
    });
    var scheduleList = this.handleScheduleList();
    this.setData({
      scheduleList: scheduleList,
      height: getApp().globalData.device.windowHeight - 160,
      height1: getApp().globalData.device.windowHeight - 150,
    })
    if ((this.data.dept.name.indexOf('呼吸内科') > -1 || this.data.dept.name.indexOf('内科门诊') > -1) && this.data.regType == 'REAL_TIME' && getApp().globalData.selectHospitalId == 10361) {
      this.setData({
        showFare: true
      })
    } else {
      this.setData({
        showFare: false
      })
    }
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
    let array = [];
    let map = {};
    for (let item of this.data.scheduleList) {
      item.scheduleDate = item.scheduleDate.split(" ")[0];
      // if (!map[item.scheduleDate]) {
      //   map[item.scheduleDate] = {
      //     MORNING: "",
      //     AFTERNOON: "",
      //     EVENING: ''
      //   };
      // }
      // map[item.scheduleDate][item.time] = item;
    }
    return this.data.scheduleList;
    // for (let x in map) {
    //   array.push({ date: x, map: map[x], week: getApp().date.getWeek(x) });
    // }
    // return array;
  },
  select(e) {
    var index = e.currentTarget.dataset.tab;
    this.setData({
      selectIndex: index
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