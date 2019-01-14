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
    var id = options.id,
      accounts = getApp().globalData.session.patientVoList;
    if (id) {
      for (var i = 0; i < accounts.length; i++) {
        if (accounts[i].id == id) {
          var thismember = accounts[i];
          this.setData({
            member: thismember,
            buttonName: "更新"
          });

        }
      }
    } else {

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
    this.setData({
      member: this.data.member
    });
  },
  changeSex: function(e) {
    this.setData({
      'member.sex': e.target.dataset.sex
    });
  },
  idNoChange: function(e) {
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
  formSubmit: function(e) {
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
      getApp().widget.toast('请输入身份证号');
      return;
    }
    let array = getApp().validate.isChinaId(member.idNo);
    if (!array[0]) {
      getApp().widget.toast('输入的身份证号有误');
      return;
    }
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


  bindDateChange(e) {
    this.setData({
      'member.birthday': e.detail.value
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
  }
}))