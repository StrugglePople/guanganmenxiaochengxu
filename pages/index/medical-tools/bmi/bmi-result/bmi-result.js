// pages/index/medical-tools/bmi/bmi-result/bmi-result.js
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
    this.calculateResult(options.height, options.weight)
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

  calculateResult(height, weight) {
    var bmi = {
      sv: [[15, 18.5], [18.5, 24], [24, 28], [28, 36], [36, 45]],
      sn: ['偏瘦', '正常', '偏胖', '肥胖', '重度肥胖'],
      tips: ['您的体重状况为：偏瘦。根据本计算，您目前的体重低于正常范围，请适当调整饮食结构，增加富含营养的食物摄入（如蔬菜水果、鱼类等），加强锻炼。必要时请就医，检查有无患慢性全身性消耗性疾病（如贫血、慢性萎缩性胃炎、恶性肿瘤、糖尿病、结核病等）可能。',
        '您的体重状况为：正常。根据本计算，您目前的体重在健康范围内，患心血管疾病、糖尿病、高血压、高血脂等疾病风险较低，请继续保持。',
        '您的体重状况为：偏胖。根据本计算，您目前的体重稍高于正常范围，请适当运动，调整饮食结构，补充富含膳食纤维的食物（如蔬菜水果、粗粮杂粮、豆类及菌藻类食物），减少不必要的高热量食物（如蛋糕、饮料、酸奶等）摄入。同时，您患心血管疾病、糖尿病、高血压、高血脂等疾病的风险较高，请定期检查。',
        '您的体重状况为：肥胖。根据本计算，您目前属于肥胖，请定日定量运动，调整饮食结构，补充富含膳食纤维的食物（如蔬菜水果、粗粮杂粮、豆类及菌藻类食物），减少不必要的高热量食物（如蛋糕、饮料、酸奶等）摄入。必要时及时就医，检查有无心血管疾病、高血压、高胆固醇等疾病。',
        '您的体重状况为：重度肥胖。根据本计算，您目前属于重度肥胖，可能引起高血压、糖尿病、痛风等疾病，并发其他疾病的风险也高于非肥胖者。建议先去医院进行一次彻底的体检，然后寻求专业的减肥机构来减肥。健康无价，加油哦！']
    }
    let result = (weight / height / height * 10000).toFixed(0),
      index = 0;
    for (let i = 0; i < bmi.sv.length; i++) {
      if (result >= bmi.sv[i][0] && result < bmi.sv[i][1]) {
        index = i;
        break;
      }
    }
    let left = (result - 15) / 30 * 300;
    left = Number(left.toFixed(2));

    this.setData({
      result: result,
      sort: bmi.sn[index],
      tip: bmi.tips[index],
      weight: weight,
      height: height,
      left: left,
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