// pages/more/web-view.js
var format = require("../../../utils/date.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    moreList: [],
    pageNumber: 1,
    hasMore: false,
    loading: false,
    loadingComplete: false,
    viewName: '健康资讯',
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    var title = options.title || '';
    this.data.options = options;
    if (this.data.options.name == 'HEALTH') {
      title = '健康资讯';
    } else if (this.data.options.name == 'NEWS') {
      title = '医院新闻';
    } else if (this.data.options.name == 'HOSPITAL') {
      title = '医院介绍';
    } else if (this.data.options.name == 'INSTRUCTIONS') {
      title = '就医指南';
    } else if (this.data.options.name == 'ANNOUNCEMENT') {
      title = '医院公告';
    }
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
      var typeId = "";
      for (var i = 0; i < data.length; i++) {
        if (data[i].name == title) {
          this.data.typeId = data[i].id;
          this.ajaxDataList();
        }
      }
      
    }, null, 'cms');

  },
  ajaxDataList: function () {
    getApp().request.postHeadNoToast('getByCatalog', {
      hospitalId: getApp().globalData.hospitalId,
      pageNum: this.data.pageNumber,
      pageSize: 8
    }, [this.data.typeId], listData => {
      this.data.hasMore = listData && listData.length == 8
      var list = listData;
      for (var i = 0; i < list.length; i++) {
        if (list[i].picName) {
          list[i].picURL = "http://venus.zhicall.cn:9090/venus-web/image/news/" + list[i].picName
        }
        list[i].publishTime = format.format(list[i].addTime);
      }
      list = this.data.moreList.concat(list);
      this.setData({
        moreList: list
      })
    }, null, 'cms');
  },
  toDetialView: function(even) {
    var url = 'https://mng.zhicall.cn/news/index.html?newsId=' + even.currentTarget.dataset.newsId;
    getApp().cache.setData("sourceURL", url);
    wx.navigateTo({
      url: '../more/web-view/web-view?title=' + even.currentTarget.dataset.title + '&newsId=' + even.currentTarget.dataset.newsId
    })
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

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    if (this.data.hasMore) {
      this.data.pageNumber++;
      this.ajaxDataList();
      this.data.loading = true;
    } else {
      this.data.loadingComplete = true;
    }
  }
})