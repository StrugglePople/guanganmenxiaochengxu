// pages/center/member-list/member-list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    accounts: [],
    showModel:false
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.isSelect = options.isSelect;
    wx.setNavigationBarTitle({
      title: options.isSelect ? "选择持卡人" :"持卡人管理",
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
    var accounts = getApp().globalData.session.patientVoList;
    for (var i = 0; i < accounts.length; i++) {
      accounts[i].itemNameStr = accounts[i].name.substr(-2);
    }
    this.setData({
      accounts: accounts
    });
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
  showPage: function(e){
    var url = e.currentTarget.dataset.url;
    wx.navigateTo({
      url: url
    });
  },
  chooseMember: function(e){
    if (this.data.isSelect){
      getApp().cache.setData("selectMemberId", e.currentTarget.dataset.id);
      wx.navigateBack();
    }else{
      var id = e.currentTarget.dataset.id;
      wx.navigateTo({
        url: '../member-info/member-info?id=' + id,
      })
    }
    

  },
  showModel: function(){
    this.setData({
      showModel:true
    });
  },
  hideModel: function(){
    this.setData({
      showModel: false
    });
  },
  selectMemeberType: function (e) {
    let type = e.currentTarget.dataset.type;
    wx.navigateTo({
      url: '../member-info/member-info?type=' + type,
    })
  }
})