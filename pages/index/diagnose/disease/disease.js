// pages/index/diagnose/disease/disease.js
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
    this.ids = options.ids;
    this.getData();
  },

  getData() {
    getApp().request.post('getDisease', true, null, [this.ids], (json) => {
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
  showDetailView(e) {
    var index = e.currentTarget.dataset.index;
    var item = this.data.list[index];
    wx.navigateTo({
      url: '../disease-detail/disease-detail?id=' + item.id
    })
  }
})