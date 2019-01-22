const commonJs = require('../../../utils/common.js')
Page({
  data: { list: [], num: 0, scrollTop: 0},
  onLoad() {
    var device = getApp().globalData.device;
    if (!device.windowHeight) {
      device = wx.getSystemInfoSync();
    }
    this.setData({
      height: device.windowHeight - 50
    })
  },
  onShow() {
    this.setData({
      list: [],
      num: 0,
      inputValue: ''
    })
    console.log(getApp().globalData.userInfo)
    this.data.list = [];
    var avatarUrl = getApp().globalData.userInfo ? getApp().globalData.userInfo.avatarUrl : '/style/image/zizhu/guahao.png';
    this.setData({
      avatarUrl: avatarUrl
    })
  },
  initData(node) {
    getApp().request.postHeadNoToast('kefuInit', { node: node }, null, (json) => {
      if (json.success) {
        if (json.data) {
          this.data.list.push({ type: 0, data: json.data, isFirst: true });
        }
        this.setData({
          list: this.data.list
        })
      }
    }, null, '51yizhu');
  },
  fillData() {
    if (this.data.event.businessType == 'YUYUE_ONLINE' || this.data.event.businessType == 'GUAHAO_ONLINE') {
      //先取消上次请求
      this.getClinicRecord(this.data.event.businessId)
    } else if (this.data.event.businessType == 'PAYMENT' && this.data.event.eventNode.nodeName == '缴费单') {
      this.getPayMent(this.data.event.businessId);
    }
  },
  getClinicRecord(businessId) {
    if (this.data.event.requestTask) {
      this.data.event.abort();
    }
    this.data.event.requestTask = getApp().request.post('regDetail', false, { businessNO: businessId }, [], (data) => {
      if (data.regTime == 'MORNING') {
        data.regTimeStr = '上午';
      } else if (data.regTime == 'AFTERNOON') {
        data.regTimeStr = '下午';
      } else {
        data.regTimeStr = '晚上';
      }
      this.setData({
        'event.ext': data
      })
    })
  },
  getPayMent(businessId) {
    if (this.data.event.requestTask) {
      this.data.event.requestTask.abort();
    }
    var param = {
      hospitalId: this.data.event.companyId,
      zhpBussinessNo: businessId
    }
    this.data.event.requestTask = getApp().request.post('billDetail', false, param, null, (data) => {
      data.show = false;
      data.selfFee = (data.totalFee - data.totalMedicalFee).toFixed(2);
      this.setData({
        'event.ext': data
      })
    })
  },
  showDetail(e) {
    var id = e.currentTarget.dataset.id;
    if (!id || id <= 0) return;
    var title = e.currentTarget.dataset.title;
    this.data.list.push({ type: 1, question: title });
    getApp().request.postHeadNoToast('kefuAnswer', { questionId: id }, null, (data) => {
      this.data.list.push({ type: 2, data: data });
      this.setData({
        list: this.data.list
      })
      setTimeout(() => {
        this.pageScrollToBottom(id);
      }, 100);
    }, null, '51yizhu');
  },
  getData(question) {
    this.data.list.push({ type: 1, question: question });
    this.setData({
      list: this.data.list
    })
    getApp().request.postHeadNoToast('kefuData', { question: question }, [], (data) => {
      if (data) {
        this.data.list.push({ type: 0, data: data });
        for (var i = 0; i < this.data.list.length; i++) {
          if (this.data.list[i].type == 0) {
            this.data.list[i].isFirst = true;
            break;
          }
        }
        this.setData({
          list: this.data.list
        });
        setTimeout(() => {
          this.pageScrollToBottom(json.data[json.data.length - 1].id);
        }, 100);
      }
    }, null, '51yizhu');
  },
  confirm(e) {
    var value = e.detail.value;
    if (!value) return;

    this.getData(value);
    this.setData({
      'inputValue': ''
    })
  },
  pageScrollToBottom(id) {
    this.setData({toView: 'customer-' + id})
    wx.createSelectorQuery().select('#red').boundingClientRect((rect) => {
      // 使页面滚动到底部
      this.setData({
        scrollTop: rect.bottom
      })
    }).exec()
  },
  call(e) {
    var tel = e.currentTarget.dataset.title;
    getApp().widget.confirm(tel, () => {
      wx.makePhoneCall({
        number: tel,
      })
    }, '联系客服', ['拨号'])
  }
});
