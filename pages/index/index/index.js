const commonJs = require('../../../utils/common.js');
const loginExtentds = require('../../../utils/loginExtends.js');
Page(Object.assign({}, loginExtentds, {
  data: {
    isLoaded: false
  },
  onLoad(options) {
    this.loadBanners();
    wx.showShareMenu({
      withShareTicket: true
    })
    if (options.q !== undefined) {
      var scan_url = decodeURIComponent(options.q);
      getApp().cache.setData('account', scan_url.split('/wechat/')[1]);
      console.log(scan_url);
    } else {
      getApp().cache.setData('account', '');
    }
  },
  onShow() {

  },
  
  loadBanners() {
    var banners = getApp().cache.getData('banners') || [];
    if (this.data.isLoaded) {
      this.setData({
        banners: banners
      })
      return;
    }
    getApp().request.postHeadNoToast('getCarousel', {
      hospitalId: getApp().globalData.hospitalId
    }, [], (json) => {
      if (json.resultData.length > 0) {
        this.data.isLoaded = true;
        getApp().cache.setData('banners', json.resultData);
        banners = json.resultData;
        this.setData({
          banners: banners
        })
      }
    }, () => {
      this.setData({
        banners: banners
      })
    }, 'cms')
  },
  
  
  noOpen() {
    getApp().widget.alert('正在建设中..')
  },
  toDetialView(even) {
    var url = 'https://mng.zhicall.cn/news/index.html?newsId=' + even.currentTarget.dataset.newsId;
    getApp().cache.setData("sourceURL", url)
    wx.navigateTo({
      url: '/pages/more/web-view/web-view?title=' + even.currentTarget.dataset.name
    })
  },


}));