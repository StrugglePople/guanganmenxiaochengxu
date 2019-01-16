// pages/index/medical-tools/bmi/bmi-calculator/bmi-calculator.js
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
  formSubmit(e) {
    var height = e.detail.value.height;
    var weight = e.detail.value.weight;
    if (!height) {
      getApp().widget.toast('请输入身高');
      return;
    }
    if (!weight) {
      getApp().widget.toast('请输入体重');
      return;
    }
    var result = (weight / height / height * 10000);
    if (result < 15 || result > 45) {
      getApp().widget.toastTxt('BMI计算异常，请输入正确的身高和体重值');
      return;
   }

   wx.navigateTo({
     url: '../../bmi/bmi-result/bmi-result?weight=' + weight + '&height=' +height,
   })

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