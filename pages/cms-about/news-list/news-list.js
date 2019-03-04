// pages/more/web-view.js
var format = require("../../../utils/date.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    moreList: [],
    pageNumber: 1,
    hasMore: true,
    loading: false,
    loadingComplete: false,
    viewName: '健康资讯',
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var title = options.title || '';
    this.data.options = options;
    wx.setNavigationBarTitle({
      title: title,
    })
    var hospitalId = getApp().globalData.hospitalId;

    // var request = require("../../../utils/request.js");

    var param1 = {
      hospitalId: getApp().globalData.hospitalId,
      type: this.data.options.name,
    }
    getApp().request.postHeadNoToast('cmsGetByType', param1, [], (data) => {
      for (var i = 0; i < data.length; i++) {
        if (data[i].name == title) {
          this.data.typeId = data[i].id;
          this.ajaxDataList();
          break;
        }
      }

    }, null, 'zixun');

  },
  ajaxDataList: function () {
    this.setData({
      loading: true
    });
    getApp().request.postHeadNoToast('getByCatalog', {
      hospitalId: getApp().globalData.hospitalId,
      pageNum: this.data.pageNumber,
      pageSize: 10
    }, [this.data.typeId], listData => {
      this.data.hasMore = listData && listData.length == 10
      var list = listData;
      for (var i = 0; i < list.length; i++) {
        if (list[i].picName) {
          list[i].picURL = "http://venus.zhicall.cn:9090/venus-web/image/news/" + list[i].picName
        }
        list[i].publishTime = format.format(list[i].addTime);
      }
      list = this.data.moreList.concat(list);
      this.setData({
        moreList: list,
        hasMore: this.data.hasMore,
        loading: false
      })
      }, ()=>{
        this.setData({
          hasMore: false,
          loading: false
        })
      }, 'zixun');
  },
  toDetialView: function (e) {
    // var url = 'https://mng.zhicall.cn/news/index.html?newsId=' + even.currentTarget.dataset.newsId;
    // getApp().cache.setData("sourceURL", url);
    wx.navigateTo({
      url: '/pages/more/html-view/html-view?type=gonggao&newsId=' + e.currentTarget.dataset.newsId
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

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.hasMore) {
      this.data.pageNumber++;
      this.ajaxDataList();
    } 
  }
})