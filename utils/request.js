const config = require('../config.js');
var cache = require('./cache.js');
const url_debug = {
  // mobile: 'http://218.75.108.154:8817/mobile-web-gam',
  mobile: 'http://172.16.10.233:8049/mobile-web',
  // mobile: 'http://121.40.34.251:8084/mobile-web',
  pay: 'http://paytest.zhicall.cn/pay-proxy',
  // cms: 'http://218.75.108.154:8818/cms-web',
  cms: 'https://mng.zhicall.cn/cms-web',
  media: 'https://mobiles.zhicall.cn/media',
  nurse: 'http://218.75.108.154:8818/nurse-web',
  '317hu': 'https://317hu.com',
  '51yizhu': 'http://wxtest.zhicall.cn/51yizhu-web',
  wss: 'wss://mobiles.zhicall.cn/mobile-web',
  lianfan: 'http://host:6445',
  zixun:"http://hera.ehujia.com:8000/hera-web"
}
const url_product = {
  mobile: 'http://app.njch.com.cn:8091/mobile-web',
  pay: 'https://pays.zhicall.cn/pay-proxy',
  cms: 'https://mng.zhicall.cn/cms-web',
  media: 'https://mobiles.zhicall.cn/media',
  nurse: 'https://mobiles.zhicall.cn/nurse-web',
  '317hu': 'https://317hu.com',
  '51yizhu': 'https://51yizhu.zhicall.cn/51yizhu-web',
  wss: 'wss://mobiles.zhicall.cn/mobile-web',
  lianfan: 'http://host:6445',
  zixun: "http://hera.ehujia.com:8000/hera-web"
}
const urlIds = {
  //登录
  doLogin: '/account.weixin.login.hsr',
  getPaperTypes: '/patient.paper.type.hsr',
  getCarousel: '/outerInterface/carousel/getByHospitalId',
  //个人中心
  getMembers: '/patient.list.hsr',
  addMember:"/patient.bind.hsr",
  updateMember:"/patient.update.hsr",
  deleteMember:"/patient.unbind.hsr",
  addCard:"/medcard.bind.hsr",
  deleteCard:"/medcard.unbind.hsr",
  getCards: '/medcard.list.hsr',
  loadContentInfo: '/more.hospital.note.info.hsr',
  getAppointDeptList: '/schedule.dept.list.hsr',
  expertListBySchedule: '/schedule.dept.doctors.hsr',
  expertListByDept: '/guiding.dept.doctors.info.hsr',
  getScheduleForExpert: '/schedule.dept.doctor.sch.no.hsr',
  getDeptDetailInfo: '/schedule.dept.doctor.sch.no.hsr',
  
  //预约挂号
  commitReg:"/guahao.apply.lockIn.hsr",
  cancelYuyue:"/guahao.apply.cancel.hsr",
  cancelAppointVerCode:"/guahao.apply.cancel.verifycode.hsr",
  //记录类
  getAppointmentOrRegOnline: "/guahao.record.list.online.hsr",
  regDetail: "/guahao.record.detail.online.hsr",
  getBedAppointment:"/gamInpatientBed.records.hsr",
  //走进医院
  guideDepts:"/guiding.depts.info.hsr",
  expertList: '/guiding.famous.doctors.info.hsr',

  //检查检验
  getCheckup:"/report.check.hsr",
  getCheckInspect:"/report.assay.hsr",

  getAllExpertsHasSchedule: '/mobile/hospital/reg/experts/-1',
  /*cms*/
  cmsGetByType: '/resident/healthNews/catalogs/get/10097',
  getByCatalog: '/resident/healthNews/{?}',
  getNewDetail:"/resident/healthNews/detail/get/{?}",


  newsGetById: '/outerInterface/news/getById',
  getByCatalogType: '/outerInterface/news/getByCatalogType',
  
  deptsList: '/mobile/hospital/guidingDoctor/depts',
  getAllDepts2: '/mobile/hospital/100352/static/dept/info',
  deptExperts: '/mobile/hospital/guidingDoctor/dept/experts',
  hospitalNoteInfo: '/more.hospital.note.info.hsr',
  hbselftest: '/outerInterface/hbselftest',
  checklistitems: '/outerInterface/checklistitems',
  itemcontent: '/outerInterface/checklistitems/itemcontent',
  babyBlood: '/outerInterface/babyBlood',
  //guide
  getBuildingDetail: '/guiding.floorNavigation.hsr',
  //消息中心
  messageAmount: "/message.amount.unread.hsr",
  message: "/message.list.hsr",
  setMessageRead: "/message.all.read.hsr",
  /**客服 */
  kefuInit: '/smartcs/robot/init',
  kefuData: '/smartcs/robot/reply',
  kefuAnswer: '/smartcs/robot/answer',
  //more
  submitFeedBack:"/more.suggestion.feedback.add.hsr",
  getFaqs: "/more.common.question.info.hsr"
};

var setURL = (id, args) => {
  var url = urlIds[id];
  if (typeof url === 'undefined')
    throw "no url!";
  if (!args) return url;
  for (var i = 0; i < args.length; i++) {
    if (url.indexOf('{?}') < 0)
      break;
    url = url.replace(/\{\?\}/, args[i] + '');
  }
  //最后是否有/{?}
  if (url.lastIndexOf('/{?}') > -1) {
    url = url.substr(0, url.lastIndexOf('/{?}'));
  }
  return url;
}

var init = (mode) => {
  exports.url = mode == 'debug' ? url_debug : url_product;
}
/*
 * urlId              请求地址
 * hasLoading         是否显示loading
 * data               请求参数
 * requestParam       替换url中{?}参数
 * success            请求成功回调
 * fail               请求失败回调
 * head               服务器地址
 * showFailedInfo     是否显示请求失败信息
 *
 * */
var commomPost = (urlId, hasLoading, data, requestParam, success, fail, head, showFailedInfo) => {
  var url = (head ? exports.url[head] : exports.url.mobile) + setURL(urlId, requestParam);
  if (hasLoading) {
    wx.showLoading({
      title: typeof hasLoading == "boolean" ? '请求中...' : hasLoading,
      mask: true
    })
  }
  if (!data) {
    data = {}
  };
  data.hospitalId = getApp().globalData.hospitalId;
  var header = {
    'content-type': 'application/json',
    'hospitalId': 10097
  };
  if (head){
    header['content-type']  = "application/x-www-form-urlencoded";
  }
  var session = getApp().globalData.session;
  if (session && session.token) {
    header.token = session.token;
  }
  return wx.request({
    url: url, //仅为示例，并非真实的接口地址
    data: data,
    method: 'POST',
    header: header,
    success: (res) => {
      if (res.statusCode == 200) {
        if (hasLoading) {
          wx.hideLoading();
        }
        if (head){
          if(res.data.success){
            res.data.code = 0;
            if(head == "cms"){
              res.data.value = res.data;
            }else{
              res.data.value = res.data.data;
            }
            
          }
        }
        if (res.data.code == 0) {
          if (typeof success == "function") success(res.data.value);
        } else {
          if (hasLoading && !showFailedInfo && res.data.msg) {
            wx.showToast({
              icon: 'none',
              title: res.data.msg,
              duration: 2000
            })
          }
          if (typeof fail == "function") fail();
        }
      } else {
        if (hasLoading) {
          wx.hideLoading();
          if (!showFailedInfo) {
            wx.showToast({
              icon: 'loading',
              title: '网络异常',
            })
          }
        }
        if (typeof fail == "function") fail();
      }
      // getApp().logger.log('===>' + url + '<====');
      // getApp().logger.log(res.data)
    },
    fail: (res) => {
      if (hasLoading) {
        wx.hideLoading();
        if (!showFailedInfo) {
          wx.showToast({
            icon: 'loading',
            title: '网络异常',
          })
        }
      }
      if (typeof fail == "function") fail();
    }
  })
}



var post = (urlId, hasLoading, data, success, fail) => {
  exports.commomPost(urlId, hasLoading, data, [], success, fail)
}
var postWithToast = (urlId, data, success, fail) => {
  exports.commomPost(urlId, true, data, [], success, fail)
}

var postNoToast = (urlId, data, success, fail) => {
  exports.commomPost(urlId, false, data, [], success, fail)
}

var postHeadWithToast = (urlId, data, requestParam, success, fail, head) => {
  exports.commomPost(urlId, true, data, requestParam, success, fail, head);
}

var postHeadNoToast = (urlId, data, requestParam, success, fail, head,) => {
  exports.commomPost(urlId, false, data, requestParam, success, fail, head);
}

module.exports.init = init;

module.exports.commomPost = commomPost;
module.exports.post = post;

module.exports.postWithToast = postWithToast;

module.exports.postNoToast = postNoToast;

module.exports.postHeadWithToast = postHeadWithToast;

module.exports.postHeadNoToast = postHeadNoToast;