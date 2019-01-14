// pages/record/record-detial/record-detial.js
const toast = require('../../../utils/toast/index.js');
Page(Object.assign({}, toast,{

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    type:0,
    medicalCard:{},
    member:{},
    refresh:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    wx.setNavigationBarTitle({
      title: options.type == 0 ? '检查单记录':'检验单记录',
    })
    this.setData({
      type:options.type , //0 检查，1检验
    })
    
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
    // this.data.member = getApp().accountServer.getSelectMember();
    if (!this.data.refresh){
      return;
    }
    this.data.medicalCard = getApp().cache.getData("selectCard");
    this.data.member = getApp().accountServer.getMemberById(this.data.medicalCard.patientId);
    this.setData({
      member:this.data.member,
      medicalCard: this.data.medicalCard
    })
    this.getData(true);
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */


  getData(hasLoading) {
    var nowDate = getApp().date.format(new Date());
    var param = {
      accountId: getApp().globalData.session.id,
      patientId:this.data.member.id,
      name: this.data.member.name,
      medicalCardNo: this.data.medicalCard.medicalCardNo,
      beginDate: getApp().date.getPreMonth(nowDate,3),
      endDate: nowDate
      
    }

    var urlId = '';
    if (this.data.type == 0) {
      urlId = 'getCheckup';
    } else {
      urlId = 'getCheckInspect';
    }
    getApp().request.post(urlId, hasLoading,  param, (data) => {
      this.data.refresh = false;
      this.setData({ list: data});
      wx.stopPullDownRefresh();
    },()=>{
      this.setData({ list: [] })
    })
  },

  onShareAppMessage: function () {
  
  },

    onPullDownRefresh: function () {
    this.getData(false);
  },
  
  showDetail(e) {
    var doctorAdviceNo = e.currentTarget.dataset.id;
    for (var i = 0; i < this.data.list.length; i++) {
      if (doctorAdviceNo == this.data.list[i].doctorAdviceNo) {
        if (this.data.type == 0) {
          getApp().cache.setData('check-record-detail.data', this.data.list[i]);
          wx.navigateTo({
            url: '../check-record-detail/check-record-detail',
          })
        } else {
          getApp().cache.setData('inspect-record-detail.data', this.data.list[i]);
          wx.navigateTo({
            url: '../inspect-record-detail/inspect-record-detail',
          })
        }
        break;
      }
    }
  },
  showPage(e) {
    this.data.refresh = true;
    var url = e.currentTarget.dataset.url;
    wx.navigateTo({
      url: url
    });
  }
}))