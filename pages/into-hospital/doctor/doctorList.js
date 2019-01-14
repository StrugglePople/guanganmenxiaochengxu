// pages/more/web-view.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    expertList: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData();
    wx.setNavigationBarTitle({
      title: '科室医生',
    })
  },


  getData() {
    var param = {
      hospitalId: getApp().globalData.hospitalId
    }
    var _this = this ;
    var request = require("../../../utils/request.js");
    request.postHeadNoToast('deptsList', {
      hospitalId: getApp().globalData.hospitalId,
    }, null, (json) => {
      if (json.success) {
        _this.data.depts = json.data;
        if (this.data.depts.length == 0) return;
        var t = _this.handleData(json.data);
        this.setData({
          selectDept: t[0].list[0],
          searchDepts: t
        })
        this.getDoctors();
      }
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
  getDoctors() {
    var param = {
      hospitalId: getApp().globalData.hospitalId,
      deptId: this.data.selectDept.id,
    }
    var request = require("../../../utils/request.js");
    request.postHeadNoToast('deptExperts', param, null, (json) => {
      if (json.success) {
        for (var item of json.data) {
          if (item.picName != undefined) {
            item.picName = item.picName + '?' + Date.parse(new Date()) ;
          }else{
            item.picName = '' ;
          }
        }
        this.setData({
          doctors: json.data
        })
      } else {
        this.data.setData({
          doctors: []
        })
      }
    }, null, 'mobile');
  },

  clickDept(e) {
    var id = e.currentTarget.dataset.dept;
    for (var i = 0; i < this.data.depts.length; i++) {
      if (this.data.depts[i].id == id) {
        this.setData({
          selectDept: this.data.depts[i]
        })
        this.getDoctors();
        break;
      }
    }
  },

  
  doctorDetial(e) {
    var id = e.currentTarget.dataset.id;
    var data = this.data.doctors;
    for (var i = 0; i < data.length; i++) {
      if (data[i].id == id - 0) {
        getApp().cache.setData('static.doctor', data[i]);
        break;
      }
    }
    wx.navigateTo({
      url: '../doctor-detial/doctor-detial'
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

  }
})
