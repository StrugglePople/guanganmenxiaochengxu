var cache = require('./cache.js');

//获取用户信息（昵称，头像）
var getUserInfo = (callback) => {
    wx.getUserInfo({
        success: res => {
            if (res.userInfo) {
                cache.setData('userInfo', res.userInfo);
                if (typeof callback == "function") callback(res.userInfo);
            }
        },
        fail:res => {
            console.log(res);
        }

    })
};




























/**加载事件 */
var loadEvents = (callback, fail) => {
    if (!getApp().globalData.session) {
        if (fail) {
            fail();
        }
        return;
    };
    setTimeout(() => {
        getApp().request.post('LatestEvent', false, { medicalCardNo: getApp().globalData.session.id }, null, (json) => {
            if (json.success) {
                if (callback) {
                    callback(json.data);
                }
            } else {
                if (fail) {
                    fail();
                }
            }
        })
    }, 500)
}
/**获取账单 */
var getOfferBill = () => {
    if (getApp().globalData.session) {
        getApp().request.post('getOfferBill', false, { hospitalId: 10356, accountId: getApp().globalData.session.id, patientId: -1 }, []);
        getApp().request.post('getOfferBill', false, { hospitalId: 10361, accountId: getApp().globalData.session.id, patientId: -1 }, []);
    }

}

var initSocket = () => {
    if (!getApp().globalData.session) return;
    var url = getApp().request.url.wss + "/wss?companyId=" + getApp().globalData.hospitalId + '&userId=' +
        getApp().globalData.session.id;
    wx.connectSocket({
        url: url
    })
    wx.onSocketOpen((res) => {
    })
    wx.onSocketClose((res) => {
        module.exports.initSocket();
    })
    wx.onSocketMessage((res) => {
        var res1 = JSON.parse(res.data);
        var page = getApp().getCurrentPage();
        if (page.socketRefresh) {
            page.socketRefresh(res1);
        }
    })
}

var verifiedRefresh = () => {
    if (!getApp().globalData.session) return;
    getApp().request.postNoToast('verifiedRefresh', { accountId: getApp().globalData.session.id }, null,
        (json) => {
        })
}

var initAccounts = (callback) => {
    var data = getApp().globalData;
    getApp().request.postNoToast('getMembers', null, [data.session.id, data.hospitalId],
        (json) => {
            if (json.success) {
              getApp().globalData.session.accounts = json.data;
                getApp().cache.setData('app.session', getApp().globalData.session);
                if (callback) {
                    callback();
                }
            }
        })
}

var verifiedRefresh = () => {
    if (!getApp().globalData.session) return;
    getApp().request.postNoToast('verifiedRefresh', { accountId: getApp().globalData.session.id }, null,
        (json) => {
        })
}

const pay_platform = '3007';
var zhicallPay = (tradeNo, callback, fail) => {
  var param = {
    trade_no: tradeNo,
    pay_platform: pay_platform,
    open_id: getApp().cache.getData('openId')
  }
  getApp().request.post('trade', true, param, [], (json1) => {
    module.exports.clientPay(json1, callback, fail)
  }, null, 'pay', 'text')
}
var clientPay = (data, callback, fail) => {
  wx.requestPayment({
    'timeStamp': data.timeStamp,
    'nonceStr': data.nonceStr,
    'package': data.package,
    'signType': data.signType,
    'paySign': data.paySign,
    'success': (res) => {
      if (callback) {
        callback(res.resultCode);
      }
    },
    'fail': (res) => {
      if (fail) {
        fail(res);
      }
    }
  })
}


var shareMenu = () => {
  wx.showShareMenu({
    withShareTicket: true
  })
}

module.exports = {
    loadEvents,
    getOfferBill,
    initSocket,
    verifiedRefresh,
    initAccounts,
    verifiedRefresh,
    zhicallPay,
    clientPay,
    getUserInfo,
    shareMenu
}