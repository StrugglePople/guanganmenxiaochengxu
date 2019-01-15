// pages/center/card-list/card-list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    medicalCards:[],
    showNoCard:false

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.showNoCard = options.showNoCard;
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
    var members = [],
      medicalCards = [];
    for (let member of getApp().globalData.session.patientVoList){
      var newMember = {...member};
      if (this.data.showNoCard && (!newMember.cards || newMember.cards.length == 0)){
        newMember.cards = [{
          medicalCardNo: newMember.idNo,
          name: newMember.name,
          patientId: newMember.id,
          mobileNo: newMember.mobileNo,
          medicalCardValid:true,
          cardTypeVO:{
            name: "证件号"
          }
        }];

      }
      members.push(newMember);
    }

    this.setData({
      medicalCards: getApp().globalData.session.medicalCards || [],
      members
    });

  },
  chooseCards:function(e){
    getApp().cache.setData("selectCard", e.currentTarget.dataset.card);
    wx.navigateBack();
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  }

})