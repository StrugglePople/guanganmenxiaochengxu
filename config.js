var config = {
  mode: 'product', //  debug , product
  innerAudioContext: null,
  appid: 'wx598296333b152b00',
  hospitalName: '中国中医科学院广安门医院',
  hospitalId: 10097,
  selectHospitalId: 10097,
  userInfo: null,
  session: null,
  tjsession: null,
  from:8,
  recordStatus: {
    "PASS": "预约成功",
    "INIT": "预约中",
    "UNPASS": "预约失败",
    "CANCELLED": "已撤销",
    "EXPIRED": "已过期",
    "RETURNED": "已退号",
    "APPOINTTING": "待支付"

  },
  schedules: {
    E_MORNING: '凌晨',
    MORNING: '上午',
    NOON: '中午',
    AFTERNOON: '下午',
    EVENING: '夜间',
    ALLDAY: '全天',
    DAY: "白天"
  }

};
module.exports = config;