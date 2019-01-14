// pages/index/diagnose/diagnose-two/diagnose-two.js
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
    this.item = JSON.parse(options.jsonStr);
    this.getData();
  },

  getData() {
    getApp().request.post('getDiagnoseTwoPart', true, null, [this.item.partCode, this.sex], (json) => {
      if (json.success) {
        json.data.splice(0, 1);
        this.setData({
          item: this.item,
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
  showNext(e) {
    var index = e.currentTarget.dataset.index;
    var item = this.data.list[index];
    wx.navigateTo({
      url: '../symptom/symptom?sex=' + this.sex + '&age=' + this.age + '&jsonStr=' + JSON.stringify(item)
    })
  }
})