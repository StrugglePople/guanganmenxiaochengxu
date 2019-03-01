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
  

  initObject() {
    var cache = require('/utils/cache.js');
    this.cache = cache;
    // var crypto = require('/utils/lib/crypto-js.min.js');
    // this.crypto = crypto;
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
      this.init.initSession(()=>{
        getApp().cache.removeKey('selectMemberId');
        getApp().cache.removeKey('selectCard');
      });
      // this.init.loadNote();
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