const commonJs = require('../../../utils/common.js');
var format = require("../../../utils/date.js");
Page({
  data: {},
  onLoad() {
    this.showNews();
    this.loadDoctors();
    // this.loadDepts();
    // commonJs.shareMenu();
  },
  onShow() {
    
  },
  showNews() {
    var param = {
      hospitalId: getApp().globalData.hospitalId
    }
    getApp().request.postHeadNoToast('cmsGetByType', param, [], (data) => {
      var typeId = "";
      for (var i = 0; i < data.length; i++) {
        if (data[i].name == "最新消息") {
          typeId = data[i].id;
          break;
        }
        
      }
      getApp().request.postHeadNoToast('getByCatalog', {
        hospitalId: getApp().globalData.hospitalId,
        pageNum: 1,
        pageSize: 3
      }, [typeId], listData => {
        var list = listData;
        for (var i = 0; i < list.length; i++) {
          if (list[i].picName) {
            list[i].picURL = "http://venus.zhicall.cn:9090/venus-web/image/news/" + list[i].picName
          }
          list[i].publishTime = format.format(list[i].addTime);
        }
        this.setData({
          hosptialNew: list
        })
        }, null, 'zixun');
    }, null, 'zixun');
  },
  loadDepts() {
    getApp().request.post('getAllDepts2',false, {
      hospitalId: getApp().globalData.hospitalId,
    }, null, (json) => {
      var array = [];
      for (var i = 0; i < 8; i++) {
        array.push(json.data[i]);
      }
      this.setData({
        deptList: array
      })
    }, null, 'mobile');
  },
  loadDoctors() {
    getApp().request.post('expertList', false, { unit:8 },
      (data) => {
        this.setData({
          expertList: data
        })

      });
  },
  toDetialView(e) {
    wx.navigateTo({
      url: '/pages/more/html-view/html-view?type=gonggao&newsId=' + e.currentTarget.dataset.newsId
    })
  },
  moreView(even) {
    wx.navigateTo({
      url: '/pages/into-hospital/moreInfo?name=' + even.currentTarget.dataset.name
    })
  },
  toDeptDetialView(even) {
    getApp().cache.setData('deptDetial', even.currentTarget.dataset.id);
    wx.navigateTo({
      url: '/pages/into-hospital/deptDetial/deptDetial',
    })
  },
  toHospitalView(e) {
    wx.navigateTo({
      url: '/pages/into-hospital/hospital-view/hospital-view?type=' + e.currentTarget.dataset.type
    })
  },
  toDoctorDetialView(even) {
    var id = even.currentTarget.dataset.id;
    var data = this.data.expertList;
    for (var i = 0; i < data.length; i++) {
      if (data[i].id == id - 0) {
        getApp().cache.setData('static.doctor', data[i]);
        break;
      }
    }
    wx.navigateTo({
      url: '/pages/into-hospital/doctor-detial/doctor-detial'
    })
  },
 
});
