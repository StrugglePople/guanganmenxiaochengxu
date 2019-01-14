//app.js
App({
  onLaunch: function (options) {
    this.globalData = require('./config.js');
    //给对象添加基础方法，相当于继承，
    this.initObject();
    wx.getSystemInfo({
      success: (res) => {
        this.globalData.device = res;
      }
    })

  },
  onShow(options) {
    if (options.scene == 1089 
      && options.path != 'pages/charge/charge' && options.path != 'pages/charge/charge-result/charge-result'
      && options.path != 'pages/charge/charge-confrim/charge-confrim'
      && options.path != 'pages/record/appointment-record-detail/appointment-record-detail'
      && options.path != 'pages/record/reg-record-detail/reg-record-detail'
      && options.path != 'pages/index/in-hospital/in-hospital-info/in-hospital-info'
      && options.path != 'pages/index/self-fee/self-fee-detail/self-fee-detail'
      && options.path != 'pages/index/current-time/current-time'
      && options.path != 'pages/index/body-checkup/body-checkup-confirm/body-checkup-confirm'
      && options.path != 'pages/index/body-checkup/body-checkup-order-detail/body-checkup-order-detail'
      && options.path != 'pages/index/body-checkup/body-check-order/body-check-order'
      && options.path != 'pages/center/member-certified/member-certified'
      && options.path != 'pages/center/member-add-2/member-add-2'
      && options.path != 'pages/into-hospital/volunteer/personage/personage'
      && options.path != 'pages/charge-study/step-2/step-2'
      && options.path != 'pages/more/web-view/web-view'
      && options.path != 'pages/into-hospital/volunteer/index') {
      wx.reLaunch({
        url: '/pages/index/index/index'
      })
    }
  },

  initObject() {
    var cache = require('/utils/cache.js');
    this.cache = cache;
    //请求对象，getApp().request 获取
    var request = require('utils/request.js');
    request.init(this.globalData.mode);
    this.request = request;
    //日志对象，getApp().logger 获取
    this.logger = require('utils/logger.js');
    //验证对象，getApp().validate 获取
    this.validate = require('utils/validate.js');
    //模态框和弹框
    this.widget = require('utils/widget.js');
    //日期
    this.date = require('utils/date.js');
    //初始化
    this.init = require('utils/init.js');
    //成员管理
    this.accountServer = require('utils/accountServer.js');
    // this.init.dataInitWithLaunch();
    ////获取用户信息（昵称，头像）
    this.init.getUserInfo((data) => {
        this.globalData.userInfo = data;
    });
    //初始化账户信息
    setTimeout(()=>{
      this.init.initSession();
    });
    




    this.cache.removeKey('select.member');
  },
  getSelectMember() {
    var member = this.cache.getData('select.member');
    if (!member) {
      if (this.globalData.session.accounts.length > 0) {
        member = this.globalData.session.accounts[0];
        this.cache.setData('select.member', member);
      }
    }
    return member;
  },
  setSelectMember(memberNo) {
    if (this.globalData.session.accounts.length > 0) {
      for (var item of this.globalData.session.accounts) {
        if (item.medicalCardNo == memberNo) {
          this.cache.setData('select.member', item);
          break;
        }
      }
    }
  },
  getPage(route) {
    var array = getCurrentPages();
    var page;
    var index = -1;
    for (var i = array.length - 1; i >= 0; i--) {
      if (array[i].route == route) {
        index = i;
        page = array[i];
        break;
      }
    }
    return { index: index, page: page }
  },
  isLogin() {
    if (this.globalData.session && this.globalData.session.id) {
      return true;
    }
    return false;
  }
})