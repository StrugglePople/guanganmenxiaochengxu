// pages/index/clinic/clinic-info/clinic-info.js
const toast = require('../../../utils/toast/index.js');
Page(Object.assign({}, toast,{

  /**
   * 页面的初始数据
   */
  data: {
    medicalCard:{},
    member:{},
    clinicInfo: {},
    schedules: getApp().globalData.schedules
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var clinicInfo = getApp().cache.getData('clinicInfo')
    this.setData({
      ...clinicInfo
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var medicalCard = getApp().cache.getData("selectCard");
    if (medicalCard && medicalCard.patientId){
      var member = getApp().accountServer.getMemberById(medicalCard.patientId);
      this.setData({
        medicalCard,
        member
      })
    }
    
  },

  showCardList() {
    wx.navigateTo({
      url: '/pages/center/card-list/card-list?showNoCard=true',
    })
  },

  submit() {
    if (!this.data.medicalCard.name) {
      getApp().widget.toast('请选择就诊人');
      return;
    }

    let param = this.getClinicParam();
    getApp().request.post('commitReg', this, { param: param}, (data) => {
      var zhpTradeId = data.apply.zhpTradeId;
      wx.redirectTo({
        url: '/pages/record/appointment-record-detail/appointment-record-detail?zhpTradeId=' + zhpTradeId,
      })
      // if (this.data.regType == 'RESERVATION') {
      //   wx.redirectTo({
      //     url: '../../../record/appointment-record-detail/appointment-record-detail?zhpTradeId=' + zhpTradeId,
      //   })
      // } else {
      //   wx.redirectTo({
      //     url: '../../../record/reg-record-detail/reg-record-detail?zhpTradeId=' + zhpTradeId + '&source=' + this.data.source,
      //   })
      // }
    })
  },
  
  getClinicParam() {
    var regParam = {};
    regParam.accountId = getApp().globalData.session.id;
    regParam.patientId = this.data.medicalCard.patientId;
    regParam.mobileNo = this.data.member.mobileNo;
    regParam.scheduleId = this.data.schedule.id;
    regParam.deptId = this.data.dept.id;
    regParam.regDate = this.data.schedule.scheduleDate;
    regParam.regTime = this.data.schedule.time;
    regParam.fee = this.data.schedule.price;
    regParam.clinicFee = this.data.schedule.price;
    regParam.hisPlanId = this.data.schedule.hisPlanId;
    regParam.noHisPlanId = this.data.schedule.hisPlanId;
    if (this.data.medicalCard.cardTypeVO.name != "身份证"){
      regParam.medicalCardId = this.data.medicalCard.id;
      regParam.medicalCardNo = this.data.medicalCard.medicalCardNo;
    }

    if (this.data.doctor) {
      regParam.doctorId = this.data.doctor.id;
    }
    

    return regParam;
  }
}))