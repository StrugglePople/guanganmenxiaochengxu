// pages/index/diagnose/symptom/symptom.js
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
    this.sex = options.sex;
    this.age = options.age;
    this.item = JSON.parse(options.jsonStr);
    this.getData();
  },

  getData() {
    getApp().request.post('getSymptom', true, null, [this.item.id], (json) => {
      if (json.success) {
        var data = this.handleData(json.data)
        this.setData({
          item: this.item,
          list: data
        })
      }
    })
  },
  handleData(list) {
    let map = getApp().cache.getData('select.symptom') || {};
    for (let i = 0; i < list.length; i++) {
      list[i].checked = false;
      if (map[list[i].id]) {
        list[i].checked = true;
      }
    }
    return list;
  },
  checkboxChange(e) {
    var index = e.currentTarget.dataset.index;
    var item = this.data.list[index];
    item.checked = !item.checked;
    var key = 'list[' + index + '].checked';
    this.setData({
      [key]: item.checked
    })
    let map = getApp().cache.getData('select.symptom') || {};
    if (item.checked) {
      map[item.id] = item;
    } else {
      delete map[item.id];
    }
    getApp().cache.setData('select.symptom', map);
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (this.data.list) {
      var data = this.handleData(this.data.list);
      this.setData({
        list: data
      })
    }
  },
  showNext() {
    wx.navigateTo({
      url: '../symptom-select/symptom-select'
    })
  }
})