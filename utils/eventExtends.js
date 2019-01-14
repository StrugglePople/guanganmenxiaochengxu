const app = getApp();
const commonJs = require('common.js');
module.exports = {
  packageData(data) {
    if (Object.prototype.toString.call(data) == '[object Array]') {
      for (var i = 0; i < data.length; i++) {
        for (var item of data[i].eventNode.eventNodeList) {
          if (item.eventName == '宣教') {
            item.tips = item.eventTips.split(',');
            item.links = item.eventLink.split(',');
          }
        }
      }
    } else {
      for (var item of data.eventNode.eventNodeList) {
        if (item.eventName == '宣教') {
          item.tips = item.eventTips.split(',');
          item.links = item.eventLink.split(',');
        }
      }
    }
    return data;
  },
  fillData(flag) {
    //flag 数组
    if (flag) {
      for (var i = 0; i < this.data.list.length; i++) {
        if (this.data.list[i].ext) {
          continue;
        }
        if (this.data.list[i].businessType == 'YUYUE_ONLINE' || this.data.list[i].businessType == 'GUAHAO_ONLINE') {
          //先取消上次请求
          this.getClinicRecord(i, this.data.list[i].businessId)
        } else if (this.data.list[i].businessType == 'PAYMENT' && this.data.list[i].eventNode.nodeName == '缴费单') {
          this.getPayMent(i, this.data.list[i].businessId);
        }
      }
    } else {
      if (this.data.event.businessType == 'YUYUE_ONLINE' || this.data.event.businessType == 'GUAHAO_ONLINE') {
        //先取消上次请求
        this.getClinicRecord(-1, this.data.event.businessId)
      } else if (this.data.event.businessType == 'PAYMENT' && this.data.event.eventNode.nodeName == '缴费单') {
        this.getPayMent(-1, this.data.event.businessId);
      }
    }
  },
  getClinicRecord(index, businessId) {
    if (index >= 0) {
      if (this.data.list[index].requestTask) {
        this.data.list[index].requestTask.abort();
      }
      this.data.list[index].requestTask = getApp().request.post('regDetail', false, { businessNO: businessId }, [], (json) => {
        if (json.success) {
          if (json.data.regTime == 'MORNING') {
            json.data.regTimeStr = '上午';
          } else if (json.data.regTime == 'AFTERNOON') {
            json.data.regTimeStr = '下午';
          } else {
            json.data.regTimeStr = '晚上';
          }
          var now = getApp().date.format(new Date());
          json.data.isShowSign = json.data.regDate == now && json.data.hospitalId == 10361 && (json.data.dept == '发热呼吸道.');
          json.data.isShowCheckUp = this.data.list[index].businessType == 'GUAHAO_ONLINE' && json.data.hospitalId == 10361 &&
            (json.data.dept == '发热呼吸道.');
          if (json.data.isShowCheckUp) {
            this.getFever(index, json.data.id, json.data.hospitalId);
          }
          var key = 'list[' + index + '].ext'
          this.setData({
            [key]: json.data
          })
        }
      })

    } else {
      if (this.data.event.requestTask) {
        this.data.event.abort();
      }
      this.data.event.requestTask = getApp().request.post('regDetail', false, { businessNO: businessId }, [], (json) => {
        if (json.success) {
          if (json.data.regTime == 'MORNING') {
            json.data.regTimeStr = '上午';
          } else if (json.data.regTime == 'AFTERNOON') {
            json.data.regTimeStr = '下午';
          } else {
            json.data.regTimeStr = '晚上';
          }
          json.data.isShowCheckUp = this.data.event.businessType == 'GUAHAO_ONLINE' && json.data.hospitalId == 10361 &&
            (json.data.dept == '发热呼吸道.');
          if (json.data.isShowCheckUp) {
            this.getFever(-1,json.data.id, json.data.hospitalId);
          }
          this.setData({
            'event.ext': json.data
          })
        }
      })
    }
  },
  getPayMent(index, businessId) {
    if (index > -1) {
      if (this.data.list[index].requestTask) {
        this.data.list[index].requestTask.abort();
      }
      var param = {
        hospitalId: this.hospitalId,
        zhpBussinessNo: businessId
      }
      this.data.list[index].requestTask = getApp().request.post('billDetail', false, param, null, (json) => {
        if (json.success) {
          json.data.show = true;
          var key = 'list[' + index + '].ext'
          this.setData({
            [key]: json.data
          })
        }
      })
    } else {
      if (this.data.event.requestTask) {
        this.data.event.requestTask.abort();
      }
      var param = {
        hospitalId: this.data.event.companyId,
        zhpBussinessNo: businessId
      }
      this.data.event.requestTask = getApp().request.post('billDetail', false, param, null, (json) => {
        if (json.success) {
          json.data.show = true;
          json.data.selfFee = (json.data.totalFee - json.data.totalMedicalFee).toFixed(2);
          this.setData({
            'event.ext': json.data
          })
        }
      })
    }
  },

  getFever(index, businessId, hospitalId) {
    if (index > -1 ) {
      if (this.data.list[index].requestTask2) {
        this.data.list[index].requestTask2.abort();
      }
      this.data.list[index].requestTask = getApp().request.post('feverDetail', false, { regApplyId: businessId, hospitalId: hospitalId }, [], (json) => {
        if (json.success) {
          var key = 'list[' + index + '].ext.fever';
          this.setData({
            [key]: json.data
          })
        }
      })
    } else {
      if (this.data.event.requestTask2) {
        this.data.event.requestTask2.abort();
      }
      this.data.event.requestTask = getApp().request.post('feverDetail', false, { regApplyId: businessId, hospitalId: hospitalId }, [], (json) => {
        if (json.success) {
          this.setData({
            'event.ext.fever': json.data
          })
        }
      })
    }
  },
  map(e) {
    var deptId = e.currentTarget.dataset.id;
    var hospitalId = e.currentTarget.dataset.hospitalId;
    if (!deptId) {
      wx.navigateToMiniProgram({
        appId: 'wx0fb39a1dc27c5e6d',
        path: 'pages/index?id=YflTGH3fHY',
      })
    } else {
      getApp().request.post('hisDept', true, { hospitalId: hospitalId }, [hospitalId, deptId], (json) => {
        if (json.data) {
          wx.navigateToMiniProgram({
            appId: 'wx0fb39a1dc27c5e6d',
            path: 'pages/index?id=YflTGH3fHY&appKey=ghpHT52Lu5&poi=' + json.data.hisDeptId,
          })
        }
      })
    }
  },
  map1(e) {
    var deptId = e.currentTarget.dataset.id;
    wx.navigateToMiniProgram({
      appId: 'wx0fb39a1dc27c5e6d',
      path: 'pages/index?id=YflTGH3fHY&uuid=' + deptId,
    })
  },
  xj(e) {
    var id = e.currentTarget.dataset.id;
    var title = e.currentTarget.dataset.title;
    getApp().cache.setData('sourceURL', 'https://www.317hu.com/introPage/page/course/courseList/courseDetail.html?id='
      + id)
    wx.navigateTo({
      url: '/pages/more/web-view/web-view?title=' + title,
    })
  },
  showFever(e) {
    var zhpTradeId = e.currentTarget.dataset.id;
    var hospitalId = e.currentTarget.dataset.hospitalId;
    var card = e.currentTarget.dataset.card;
    wx.navigateTo({
      url: '../../index/fever/fever-3/fever-3?businessNO=' + zhpTradeId + '&medicalCardNo=' +
      card + '&hospitalId=' + hospitalId
    })
  },
  showFeverAgain(e) {
    var zhpTradeId = e.currentTarget.dataset.id;
    var hospitalId = e.currentTarget.dataset.hospitalId;
    var id = e.currentTarget.dataset.feverId;
    var itemId = e.currentTarget.dataset.itemId;
    var extId = e.currentTarget.dataset.extId;
    getApp().widget.confirm('您确定要重新提交吗', () => {
      getApp().request.post('feverAgain', true, { hospitalId: hospitalId, feverRecordId: id }, null, (json) => {
        if (json.success) {
          getApp().widget.alert('您已成功提交检验申请！分诊医生正在审核，请耐心等待短信通知！', () => {
            if (this.data.isEventList) {
              for (var i = 0; i < this.data.list.length; i++) {
                if (this.data.list[i].id == itemId) {
                  this.getFever(i, extId, hospitalId);
                  break;
                }
              }
            } else {
              this.getFever(-1, extId, hospitalId);
            }
          });
        }
      })
    })
  },
  showManyidu(e) {
    var medicalCardNo = e.currentTarget.dataset.id;
    var members = getApp().globalData.session.accounts;
    for (var i = 0; i < members.length; i++) {
      if (members[i].medicalCardNo == medicalCardNo) {
        medicalCardNo = members[i].id;
        break;
      }
    }
    if (getApp().globalData.mode == 'debug') {
      getApp().cache.setData("sourceURL", 'https://www.317hu.com/introPage/page/wechatPage/satisfactionForZhicall.html?evn=uat&hospitalId=317&appkey=adf48d47348b44d897b2f29501fd3b56&paperId=14038&patientId=' + medicalCardNo + exports.getEventData().id);
    }

    wx.navigateTo({
      url: '/pages/more/web-view/web-view?title=满意度问卷'
    })
  },
  showReport(e) {
    var item = null
    if (this.data.isEventList) {
      var index = e.currentTarget.dataset.index;
      var item = this.data.list[index];
    } else {
      item = this.data.event;
    }
    getApp().setSelectMember(item.medicalCardNo);
    if (item.businessType == 'REPORT_PACS') {
      wx.navigateTo({
        url: '/pages/record/check-record/check-record?type=0'
      })
    } else {
      wx.navigateTo({
        url: '/pages/record/check-record/check-record?type=1'
      })
    }
  },
  pay1(e) {
    var item = null
    if (this.data.isEventList) {
      var index = e.currentTarget.dataset.index;
      var item = this.data.list[index];
    } else {
      item = this.data.event;
    }
    var param = {
      mergerPaymentIds: item.ext.id,
      patientId: -1,
      payType: 2,
      hospitalId: item.ext.hospitalId,
      medicalCardNO: item.ext.medicalCardNO,
    }
    getApp().widget.confirm('线上支付均为全额自费，暂不支持医保结算及医保报销。', () => {
      getApp().request.post('payForBill', true, param, [], (json) => {
        if (json.success) {
          commonJs.zhicallPay(json.data.tradeNo, () => {
            wx.navigateTo({
              url: '/pages/pay-result/pay-result-for-self-pay/pay-result-for-self-pay?zhpTradeId=' + json.data.outTradeNo,
            });
            setTimeout(() => {
              if (this.data.isEventList) {
                this.data.pageIndex = 1;
                this.data.list = [];
                this.getData(false);
              } else {
                this.loadEvent();
              }
            }, 4000)
          })
        }
      })
    }, '温馨提示');
  },
  kefu() {
    wx.navigateTo({
      url: '/pages/customer/customer-1/customer-1'
    })
  },

  cancelRecord(e) {
    var hospitalId = e.currentTarget.dataset.hospitalId;
    var zhpTradeId = e.currentTarget.dataset.id;
    getApp().widget.confirm('是否取消预约？', () => {
      getApp().request.post('cancelYuyue', this, null, [hospitalId, zhpTradeId], (json) => {
        if (json.success) {
          if (this.data.isEventList) {
            this.data.pageIndex = 1;
            this.data.list = [];
            this.getData(false);
          } else {
            this.loadEvent();
          }
        }
      })
    })
  },
  
};
