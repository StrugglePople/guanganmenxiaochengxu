// pages/index/diagnose/symptom-select/symptom-select.js
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
    var array = this.getData();
    this.setData({
      list: array
    })
  },

  getData() {
    let map = getApp().cache.getData('select.symptom'),
      array = [];
    for (let x in map) {
      array.push(map[x]);
    }
    return array;
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
   
  },
  showDiseaseView () {
    var list = this.getData();
    if (list.length == 0) {
      getApp().widget.toast('请选择病症');
      return;
    }
    let ids = '';
    for (let i = 0; i < list.length; i++) {
      ids += list[i].id + '+';
    }
    ids = ids.substr(0, ids.length - 1);
    wx.navigateTo({
      url: '../disease/disease?ids=' + ids,
    })
  }
})