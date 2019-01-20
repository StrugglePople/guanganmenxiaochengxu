// pages/more/feed-back/feed-back.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mobile: getApp().cache.getData("app.session") ? getApp().cache.getData("app.session").mobile:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  formSubmit(e) {
    var content = e.detail.value.content;
    var mobile = e.detail.value.mobile;
    if (!content) {
      getApp().widget.toast("请填写反馈内容");
      return;
    }
    if (content.replace(/ /g, '').length === 0) {
      getApp().widget.toast("信息不能为空");
      return;
    }
    if (!mobile) {
      getApp().widget.toast("手机号不能为空");
      return;
    }
    if (!getApp().validate.isMobile(mobile)) {
      getApp().widget.toast("手机号格式错误");
      return;
    }
    var param = {
      content: content, 
      phoneNum: mobile 
    }
    getApp().request.post('submitFeedBack', true, { param },
    (data) => {
      getApp().widget.toast('反馈成功', () => {
        setTimeout(()=>{
          wx.navigateBack();
        },1000);
        
      })
    })
  }
 
})