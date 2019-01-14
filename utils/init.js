var request = require('./request.js');
var cache = require('./cache.js');
var commonJs = require('./common.js');

var Init = {
  getCardTypes: function(data) {
    request.post("getCardTypes", false, null, null, function() {
      cache.setData("cache.cardTypes", data);
    })
  },
  getPaperTypes: function(data) {
    request.post("getPaperTypes", false, null, function() {
      cache.setData("cache.paperTypes", data);
    })
  },
  dataInitWithLaunch: function() {
    // this.getCardTypes();
    // this.getPaperTypes();
  },
  getUserInfo: function(callback) {
    if (cache.getData('userInfo')) {
      callback(cache.getData('userInfo'));
    } else {
      commonJs.getUserInfo(function(data) {
        callback(data);
      });
    }
  },
  initSession: function(callback) {
    if (cache.getData('app.session')) {
      getApp().globalData.session = cache.getData('app.session');
      this.getMembers((data) => {
        this.getCards((data) => {
          if (typeof callback == "function") callback(session);
        }, this.initSessionFail)
      }, this.initSessionFail);
    }
  },
  initSessionFail:function(){
    getApp().globalData.session = {};
    cache.removeKey('app.session');
  },
  getMembers: function(success,fail) {
    request.post("getMembers", "获取持卡人列表", {
      accountId: getApp().globalData.session.id,
        withCard: true
      },
      (data) => {
        getApp().globalData.session.patientVoList = data;
        if (typeof success == "function") success(data);
      }, fail);
  },
  getCards: function (success, fail) {
    request.post("getCards", "获取就诊人列表", { accountId: getApp().globalData.session.id}, 
      (data) => {
        getApp().globalData.session.medicalCards = data.filter((value) => {
          return value.medicalCardValid
        });
        getApp().accountServer.setCardsToAccount();
        if (typeof success == "function") success(data);
      }, fail);
  }
};
module.exports = Init;