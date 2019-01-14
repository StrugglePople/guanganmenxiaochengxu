// pages/record/check-record/check-record.js
const toast = require('../../../utils/toast/index.js');
const date = require('../../../utils/date.js');
Page(Object.assign({}, toast,{

  /**
   * 页面的初始数据
   */
  data: {
    selectIndex: 0,
    inpatientNo: '',
    endTime:'',
    type: '0',//0 检查，1检验
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title:'报告单查询',
    })
    this.initDate();
  },

  initDate() {
    var beginDate = getApp().date.format(new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 7));
    var endDate = getApp().date.format(new Date());
    this.setData({
      beginDate: beginDate,
      endDate: endDate
    })
  },
  blur(e) {
    this.data.inpatientNo = e.detail.value
  },

  select(e) {
    var index = e.currentTarget.dataset.tab;
    this.setData({
      selectIndex: index,
      list:[]
    })
    var endDate = getApp().date.format(new Date());
    if (index == 0){
      this.setData({
        endTime:'',
        endDate:endDate,
      })
    }else{
      this.setData({
        endTime: getApp().date.format(new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 1)),
        endDate: getApp().date.format(new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 1)),
      })
    }
    // this.getData(true);
  },

  radioChange(e){
    this.setData({
      type: e.detail.value,
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var newMember = getApp().getSelectMember();
    if (!newMember) return;
    if (this.member && this.member.id == newMember.id) return;
    this.member = newMember;
    this.setData({
      member: this.member
    })
    this.data.list = [];
    // this.getData(true);
  },

  loadData() {
    if (this.data.selectIndex == 0 && !this.data.member) {
      this.showZanToast('请选择就诊人');
      return;
    }
    if (this.data.selectIndex == 1 && !this.data.inpatientNo) {
      this.showZanToast('请输入住院号');
      return;
    }
    if (getApp().date.compare(this.data.beginDate, this.data.endDate) == 1) {
      this.showZanToast('开始时间不能大于结束时间');
      return;
    }
    var param = {
      accountId: -1,
      beginDate: this.data.beginDate,
      endDate: this.data.endDate
    }
    if (this.data.selectIndex == 0) {
      param.patientId = this.data.member.aesPatientId;
    } else {
      param.inpatientNO = this.data.inpatientNo
    }
    wx.navigateTo({
      url: '../record-detial/record-detial?selectIndex=' + this.data.selectIndex + '&type=' + this.data.type + '&param=' + JSON.stringify(param),
    })

  },


  bindDateChange(e) {
    this.setData({
      [e.currentTarget.dataset.id]:e.detail.value
    })
  },


}))