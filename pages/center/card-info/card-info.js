// pages/center/card-info/card-info.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    member: {},
    buttonName: '保存',
    card: {}

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var personId = options.personId,
      cardId = options.cardId,
      accounts = getApp().globalData.session.patientVoList;
    if (personId) {
      for (var i = 0; i < accounts.length; i++) {
        if (accounts[i].id == personId) {
          var thismember = accounts[i];
          this.setData({
            member: thismember
          });

        }
      }
    }
    if (cardId) {
      var cards = this.data.member.cards;
      for (let card of cards) {
        if (card.id == cardId) {
          this.setData({
            card,
            buttonName: "删除就诊卡"
          });
          break;
        }
      }

    }


  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },
  formSubmit: function(e) {
    if (this.data.card.id) {
      getApp().request.post("deleteCard", true, {
        medicalCardId: this.data.card.id
      }, (data) => {
        getApp().widget.toastTxt("删除就诊卡成功", () => {
          var cards = this.data.member.cards;
          for (var i = 0; i < cards.length;i++){
            if (cards[i].id == this.data.card.id){
              cards.splice(i, 1);
              break;
            }
          }
          getApp().cache.setData('app.session', getApp().globalData.session);
          setTimeout(() => {
            wx.navigateBack()
          }, 1000);
          
        });
      });
      return;
    }





    var member = this.data.member,
      card = {};
    card.patientId = member.id;
    card.mobileNo = member.mobileNo;
    card.idCardNo = member.idNo;
    card.patientName = member.name;
    card.birthday = member.birthday;
    card.sex = member.sex;
    card.accountId = getApp().globalData.session.id;
    card.medicalCardNo = e.detail.value.medicalCardNo;


    if (!card.medicalCardNo) {
      getApp().widget.toast('请输入就诊卡号');
      return;
    }
    getApp().request.post("addCard", true, {
      param: card
    }, (data) => {
      getApp().widget.toastTxt("添加就诊卡成功", () => {
        this.data.member.cards.push(data.medCard);
        getApp().cache.setData("app.session", getApp().globalData.session);
        setTimeout(() => {
          wx.navigateBack()
        }, 1000);
      });
    });


  }
})