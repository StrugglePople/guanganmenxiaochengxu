// pages/index/diagnose/diagnose-index/diagnose-index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.sex = options.sex;
    this.age = options.age;
    this.getData();
  },

  getData() {
    getApp().request.post('getDiagnoseFirstPart', true, null, [this.sex], (json) => {
      if (json.success) {
        this.setData({
          list: json.data
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },
  showTwoPart(e) {
    var index = e.currentTarget.dataset.index;
    var item = this.data.list[index];
    wx.navigateTo({
      url: '../diagnose-two/diagnose-two?sex='+this.sex+'&age='+this.age+'&jsonStr='+JSON.stringify(item)
    })
  }
})