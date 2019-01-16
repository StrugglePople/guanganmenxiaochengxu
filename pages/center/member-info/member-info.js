// pages/center/member-info/member-info.js
const loginExtentds = require('../../../utils/loginExtends.js');

Page(Object.assign({}, loginExtentds, {

  /**
   * 页面的初始数据
   */
  data: {
    member: {},
    buttonName: '确认'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var id = options.id;
    if(id){
      this.data.memberId = id;
      this.setData({
        buttonName: "更新"
      });
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
    if (this.data.memberId) {
      var thismember = getApp().accountServer.getMemberById(this.data.memberId);
      this.data.member = { ...thismember };
      this.setData({
        member: this.data.member
      });
    }
  },
  nameChange: function (e) {
    this.data.member.name = e.detail.value;
  },
  idNoChange: function (e) {
    this.data.member.idNo = idNo;
    var idNo = e.detail.value;
    if (!idNo || idNo.length != 18) return;
    let array = getApp().validate.isChinaId(idNo);
    if (array[0]) {
      // this.data.member.idNo = idNo;
      this.setData({
        'member.birthday': array[1],
        'member.sex': array[2]
      });
    }
  },
  bindDateChange(e) {
    this.setData({
      'member.birthday': e.detail.value
    })
  },
  changeSex: function(e) {
    this.setData({
      'member.sex': e.target.dataset.sex
    });
  },
  mobileNoChange: function(e) {
    this.data.member.mobileNo = e.detail.value;
  },
  formSubmit: function(e) {
    if (this.data.memberId && !this.memberInfoIsChange()){
      getApp().widget.toast('没有信息更改');
      return;
    }
    var member = {};
    member.birthday = this.data.member.birthday;
    member.sex = this.data.member.sex;
    member.name = e.detail.value.name;
    member.idNo = e.detail.value.idNo;
    member.mobileNo = e.detail.value.mobileNo;
    member.paperType = "IDENTITY_CARD";

    if (!member.name) {
      getApp().widget.toast('请输入姓名');
      return;
    }
    if (!member.mobileNo) {
      getApp().widget.toast('请输入手机号');
      return;
    }
    if (!getApp().validate.isMobile(member.mobileNo)) {
      getApp().widget.toast('手机号有误');
      return;
    }
    if (!member.idNo) {
      getApp().widget.toast('请输入证件号');
      return;
    }
    // let array = getApp().validate.isChinaId(member.idNo);
    // if (!array[0]) {
    //   getApp().widget.toast(array[1]);
    //   return;
    // }
    if (!member.birthday) {
      getApp().widget.toast('请输入出生日期');
      return;
    }

    if (!member.sex) {
      getApp().widget.toast('请选择性别');
      return;
    }

    member.accountId = getApp().globalData.session.id;
    if (this.data.member.id) {
      member.patientId = this.data.member.id;
      getApp().request.post("updateMember", true, {
        param: member
      },(data) => {
        getApp().widget.toastTxt("更新持卡人成功", () => {
          getApp().globalData.session.patientVoList = data;
          getApp().cache.setData("app.session", getApp().globalData.session);
          // setTimeout(() => {
          //   wx.navigateBack()
          // }, 1000);
        });
      });

    } else {
      getApp().request.post("addMember", true, {
        param: member
      }, (data) => {
        getApp().widget.toastTxt("添加持卡人成功", () => {
          getApp().globalData.session.patientVoList = data;
          getApp().cache.setData("app.session", getApp().globalData.session);

          setTimeout(() => {
            wx.navigateBack()
          }, 1000);
        });
      });
    }


  },

  showAddCardPage(){
    if (!this.data.memberId){
      getApp().widget.toastTxt('请先填写并保存持卡人信息！');
      return;
    }
    if (this.memberInfoIsChange()) {
      getApp().widget.toastTxt('请先保存持卡人信息！');
      return;
    }
    wx.navigateTo({
      url: '../card-info/card-info?personId='+this.data.member.id
    })
  },
  
  deleteMember(){
    getApp().request.post("deleteMember", true, {
      patientId: this.data.member.id
    }, (data) => {
      getApp().widget.toastTxt("删除持卡人成功", () => {
        getApp().accountServer.deleteMember(this.data.member.id);
        setTimeout(() => {
          wx.navigateBack()
        }, 1000);
      });
    });
  },
  alertWarning(){
    getApp().widget.toastTxt("请确保证件号和姓名姓名填写正确，否则无法取号");
  },
  memberInfoIsChange(){
    var oldMember = getApp().accountServer.getMemberById(this.data.memberId),
    newMember = this.data.member;
    if (oldMember.name != newMember.name){
      return true;
    }
    if (oldMember.idNo != newMember.idNo) {
      return true;
    }
    if (oldMember.sex != newMember.sex) {
      return true;
    }
    if (oldMember.birthday != newMember.birthday) {
      return true;
    }
    if (oldMember.mobileNo != newMember.mobileNo) {
      return true;
    }
  }
}))