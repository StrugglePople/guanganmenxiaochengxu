// pages/index/medical-tools/hepatitis-b/hepatitis-b-self-test/hepatitis-b-self-test.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hBsAg:'1',
    antiHBs:'1',
    hBeAg:'1',
    antiHBe:'1',
    antiHBc:'1',  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
  var hepatitisB = [
      {
        title: '乙肝表面抗原（HBsAg）',
        property: 'hBsAg',
        value:100
      },
      {
        title: '乙肝表面抗体（抗-HBs）',
        property: 'antiHBs',
        value: 200
      },
      {
        title: '乙肝e抗原（HBeAg）',
        property: 'hBeAg',
        value: 300
      },
      {
        title: '乙肝e抗体（抗-HBe）',
        property: 'antiHBe',
        value: 400
      },
      {
        title: '乙肝核心抗体（抗-HBc）',
        property: 'antiHBc',
        value: 500
      }
    ]

     this.setData({
      hepatitisB: hepatitisB
    })

  },


radioChange: function (e) {

    if (e.currentTarget.dataset.type == "hBsAg"){
      this.setData({
        hBsAg :e.detail.value 
      })
    }
    if (e.currentTarget.dataset.type == "antiHBs") {
      this.setData({
        antiHBs: e.detail.value
      })
    }
    if (e.currentTarget.dataset.type == "hBeAg") {
      this.setData({
        hBeAg: e.detail.value
      })
    }
    if (e.currentTarget.dataset.type == "antiHBe") {
      this.setData({
        antiHBe: e.detail.value
      })
    }
    if (e.currentTarget.dataset.type == "antiHBc") {
      this.setData({
        antiHBc: e.detail.value
      })
    }
  },



submit:function(){
  getApp().request.postHeadNoToast('hbselftest', {
    hBsAg: this.data.hBsAg,
    antiHBs: this.data.antiHBs,
    hBeAg: this.data.hBeAg,
    antiHBe: this.data.antiHBe,
    antiHBc: this.data.antiHBc,
    hospitalId: getApp().globalData.hospitalIId,
  }, null, (json) => {
    wx.navigateTo({
      url: '../../hepatitis-b/hepatitis-b-self-test-result/hepatitis-b-self-test-result?str=' + json.successMsg,
    })

  }, null, 'cms');
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

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  }
})