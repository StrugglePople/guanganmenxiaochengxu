// pages/index/medical-tools/baby-blood/baby-blood.js
const toast = require('../../../../utils/toast/index.js');
Page(Object.assign({}, toast,{

  /**
   * 页面的初始数据
   */
  data: {
    faBlood:'',
    moBlood:'',
    faNumber:0,
    moNumber:0,
    babyBlood:false,
    array:[
      'A',
      'B',
      'AB',
      'O'
    ]
  },

  fatherBlood :function(){
    this.setData({
      faBlood: this.data.array[this.data.faNumber - 0]
    })
    if (this.data.faNumber  == 3){
      this.data.faNumber = 0 ;
    }else{
      this.data.faNumber++
    }
  },

  motherBlood: function () {
    this.setData({
      moBlood: this.data.array[this.data.moNumber - 0]
    })

    if (this.data.moNumber == 3) {
      this.data.moNumber = 0;
    } else {
      this.data.moNumber++
    }
  },

  submit: function(){

    let faNumber , moNumber;
    if (this.data.faBlood == "A"){
      faNumber = 1 ;
    } else if (this.data.faBlood == "B"){
       faNumber = 2;
    } else if (this.data.faBlood == "O") {
      faNumber = 3;
    } else if (this.data.faBlood == "AB") {
      faNumber = 4;
    }else{
      this.showZanToast('父亲和母亲的血型不能为空');
      return ;
    }
    if (this.data.moBlood == "A") {
      moNumber = 1;
    } else if (this.data.moBlood == "B") {
      moNumber = 2;
    } else if (this.data.moBlood == "O") {
      moNumber = 3;
    } else if (this.data.moBlood == "AB") {
      moNumber = 4;
    }else{
      this.showZanToast('父亲和母亲的血型不能为空');
      return;
    }

    getApp().request.postHeadNoToast('babyBlood', {
      hospitalId: getApp().globalData.hospitalIId,
      fatherBlood: faNumber,
      motherBlood: moNumber,
    }, null, (json) => {
      this.setData({
        babyBlood:true,
        resultData: json.resultData,
      })  
    }, null, 'cms');


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
}))