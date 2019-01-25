// pages/into-hospital/yuannei-daohang/yuannei-daohang.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      options: {
          areamap: [
              {
                  id: '门诊综合楼',
                  name: '门诊综合楼',
                  coords: [385, 699, 180, 229]
              },
              {
                  id: '住院楼',
                  name: '住院楼',
                  coords: [114, 854, 265, 64]
              },
              {
                  id: '行政楼',
                  name: '行政楼',
                  coords: [111, 587, 122, 184]
              },
              {
                  id: '老门诊楼',
                  name: '老门诊楼',
                  coords: [387, 421, 168, 219]
              },
              {
                  id: '血透室',
                  name: '血透室',
                  coords: [300, 330, 148, 90]
              }
          ],
          mapWidth: 850,
          mapHeight: 1034,
          scaledWidth: 0,
          scaledHeight: 0,
          zoomMax: 2
      }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.fixNavPicAndMapCoords();
    this.setData({
        options:this.data.options
    });

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
  fixNavPicAndMapCoords : function() {
    var device = wx.getSystemInfoSync();
    if (this.data.options.scaledWidth && this.data.options.scaledHeight)
        return;  // already done
    var devicePixelRatio = device.pixelRatio,
        mapWidth = this.data.options.mapWidth,
        mapHeight = this.data.options.mapHeight,
        oWidth = Math.round(mapWidth / devicePixelRatio),
        oHeight = Math.round(mapHeight / devicePixelRatio),
        ratio,
        areamap = this.data.options.areamap;
    this.data.options.scaledHeight = device.windowHeight - 30;
    ratio = oHeight / this.data.options.scaledHeight;
    this.data.options.scaledWidth = Math.round(oWidth / ratio);
    this.data.options.zoomMax = Math.max(ratio, devicePixelRatio);

    ratio = this.data.options.scaledWidth / mapWidth;
    for (var i = 0; i < areamap.length; ++i) {
        var coords = areamap[i].coords;
        for (var j = 0; j < coords.length; ++j) {
            coords[j] = Math.round(coords[j] * ratio);
        }
    }
  },
  showDetail: function (e) {
    getApp().request.post("getBuildingDetail", true, {building: e.target.dataset.id},
      (data)=>{
        getApp().cache.setData("floorDetail",data);
        wx.navigateTo({
          url: '/pages-hospital/floor-detail/floor-detail?name=' + e.target.dataset.id
        })
      });

  }

});