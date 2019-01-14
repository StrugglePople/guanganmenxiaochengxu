// pages/more/web-view.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    deptList: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var request = require("../../../utils/request.js");
    request.postHeadNoToast('deptsList', {
    }, null, (json) => {
      var t = this.handleData(json.data);
      this.setData({
        deptList: t
      })
    }, null, 'mobile');
  },
  handleData(depts) {
    let map = {};
    for (let i = 0; i < depts.length; i++) {
      var dept = depts[i],
        key = dept.shortPinyin.substr(0, 1);
      if (!map[key]) {
        map[key] = [];
      }
      map[key].push(dept);
    }
    let array = [],
      keyArray = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R'
        , 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    for (let i = 0; i < keyArray.length; i++) {
      if (map[keyArray[i]]) {
        array.push({ key: keyArray[i], list: map[keyArray[i]] })
      }
    }
    return array;
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

  },


  toDetialView: function (e){
    getApp().cache.setData('deptDetial', e.currentTarget.dataset.id);
    wx.navigateTo({
      url: '../deptDetial/deptDetial',
    })
  }
})
