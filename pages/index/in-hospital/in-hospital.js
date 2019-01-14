// pages/index/in-hospital/in-hospital.js
const toast = require('../../../utils/toast/index.js');
Page(Object.assign({}, toast,{

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.key = getApp().globalData.selectHospitalId + '.inHospital.member.data';
    this.setData({
      list: getApp().cache.getData(this.key) || []
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  formSubmit(e) {
    var name = e.detail.value.name;
    var idCard = e.detail.value.idCard;
    var inPatientNo = e.detail.value.inPatientNo;
    if (!name) {
      this.showZanToast('请输入名字');
      return;
    }
    if (!idCard) {
      if (!inPatientNo) {
        this.showZanToast('身份证和住院号必须要填一项');
        return;
      }
    } else {
      let array = getApp().validate.isChinaId(idCard);
      if (array[0] === false) {
        this.showZanToast('您输入的身份证号码有误！');
        return;
      }
    }
    this.showNext(name, idCard, inPatientNo);
  },


  showNext(name, idCard, inPatientNo) {
    var param = {
      inpatientName: name,
      idCardNo: idCard,
      inpatientNO: inPatientNo,
      hospitalId: getApp().globalData.selectHospitalId
    }
    getApp().request.post('inHospitalInfo', this, param, null, (json) => {
      if (json.success) {
        let array = getApp().cache.getData(this.key) || [];
        if (array.length > 0) {
          let index = -1;
          for (let i = 0; i < array.length; i++) {
            if (array[i].inpatientName == name && array[i].inpatientNO == json.data.inpatientNO) {
              index = i;
              break;
            }
          }
          if (index >= 0) {
            array.splice(index, 1);
          }
        }
        array.unshift({
          inpatientName: name,
          idCardNo: idCard,
          inpatientNO: json.data.inpatientNO,
          sex: json.data.sex,
          inpatientNameStr: name.substring(1)
        });
        this.setData({
          list: array
        })
        getApp().cache.setData(this.key, array);
        json.data.idCardNo = idCard;
        wx.navigateTo({
          url: 'in-hospital-info/in-hospital-info?jsonStr=' + JSON.stringify(json.data),
        })
      }
    })
  },



  clinicItem(e) {
    var index = e.currentTarget.dataset.index;
    var item = this.data.list[index];
    this.showNext(item.inpatientName, item.idCardNo, item.inpatientNO);
  },

  deleteCache() {
    getApp().cache.removeKey(this.key);
    this.setData({
      list: []
    })
  }
  
}))