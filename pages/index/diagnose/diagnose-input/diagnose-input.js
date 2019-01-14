// pages/index/diagnose/diagnose-input/diagnose-input.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sex: 'MAN',
    items: [
      { name: '0-2', value:'ZERO_TWO'}, 
      { name: '3-6', value:'THREE_SIX' }, 
      { name: '7-12', value:'SEVEN_TWELVE_WOMAN' }, 
      { name: '13-17', value:'THIRTEEN_SEVENTEEN' }
    ],
    age: 'ZERO_TWO'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    getApp().cache.removeKey('select.symptom')
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  handleZanSelectChange({ componentId, value }) {
    this.setData({
      [`checked.${componentId}`]: value
    });
  },
  chooseAge(e) {
    var item = e.currentTarget.dataset.item;
    this.setData({
      age:item
    })
  },
  chooseSex(e) {
    var item = e.currentTarget.dataset.item;
    this.setData({
      sex: item
    })
  },
  showNext(e) {
    // var hospitalId = e.currentTarget.dataset.id;
    // getApp().globalData.selectHospitalId = hospitalId - 0;
    wx.redirectTo({
      url: '../diagnose-index/diagnose-index?sex=' + this.data.sex + '&age=' + this.data.age,
    })
  }
})