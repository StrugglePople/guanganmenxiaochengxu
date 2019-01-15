var config = {
  mode: 'debug', //  debug , product
  innerAudioContext: null,
  appid: 'wxe79ea86026141aef',
  hospitalName: '浙江大学附属儿童医院',
  hospitalId: 10097,
  selectHospitalId: 10097,
  userInfo: null,
  session: null,
  tjsession: null,
  recordStatus: {
    "PASS": "预约成功",
    "INIT": "预约中",
    "UNPASS": "预约失败",
    "CANCELLED": "已撤销",
    "EXPIRED": "已过期",
    "RETURNED": "已退号",
    "APPOINTTING": "待支付"

  }

};
module.exports = config;