const loginExtentds = require('../../../utils/loginExtends.js');
const eventExtentds = require('../../../utils/eventExtends.js');
const commonJs = require('../../../utils/common.js');
const toast = require('../../../utils/toast/index.js');
var wxbarcode = require('../../../utils/barCode/index.js');


const options = {
  accounts:[],
  unreadNum:0
}
Page(Object.assign({}, loginExtentds, eventExtentds, toast,{
  data: {
    isEventList: false,
    unreadNum:0
    },
  onLoad() {
    this.data.list = [];
    commonJs.shareMenu();
  },
  onShow() {
    var userInfo = {
      avatarUrl: "/style/image/t-face.png",
      mobile: ""
    };
    if (getApp().globalData.userInfo && getApp().globalData.userInfo.avatarUrl){
      userInfo.avatarUrl = getApp().globalData.userInfo.avatarUrl;
      userInfo.mobile = getApp().globalData.userInfo.mobile;
    }
    this.setData({
      isLogin: getApp().isLogin(),
      ...userInfo
    });
    if (getApp().isLogin()) {
      // commonJs.getOfferBill();
      // this.loadEvent();
      this.setUnReadMessageAmount();
      var data = getApp().globalData;
      var accounts = data.session.patientVoList || [];
      if (accounts) {
        for (var x in accounts) {
          accounts[x].itemNameStr = accounts[x].name.substr(-2);
        }
      }
      var url = getApp().request.url['mobile'] + '/mobile/barCode/10356/';
      this.setData({
        barcode: url,
        accounts: accounts,
        mobile: data.session.mobile,
        isShow: false,
        event: this.data.event
      })
    }

  },
  showHtml(e) {
    wx.navigateTo({
      url: '/pages/more/html-view/html-view?type=' + e.currentTarget.dataset.type,
    })
  },
  chooseMember: function(e){
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../member-info/member-info?id=' + id,
    })

  },
  auto: wx.getRecorderManager(),
  startRecord:function(){
    recorderManager.start(options)

  },
  stopRecord: function () {
    recorderManager.stop()
  },
  getUserInfoCenter: function (res) {
      getApp().globalData.userInfo = res.detail.userInfo;
      getApp().cache.setData('userInfo', res.detail.userInfo);
      wx.navigateTo({
          url: '/pages/auth-setting/auth-setting'
      });
  },
  setUnReadMessageAmount:function(){
    getApp().request.post("messageAmount",false,{
      accountId:getApp().globalData.session.id,
      notificationMessageType: "SYSTEM_NOTIFICATION"
    },(data)=>{
      this.setData({
        unreadNum: data.unreadAmountAll
      });
    });
  }
}));
