const commonJs = require('../../../utils/common.js');
const loginExtentds = require('../../../utils/loginExtends.js');
Page(Object.assign({}, loginExtentds, {
  data: {
    isLoaded: false,
    banners:[],
    showNote:false
  },
  onLoad(options) {
    this.loadBanners();
    this.loadNote();
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
  
  
  noOpen(e) {
    getApp().widget.alert(e.currentTarget.dataset.msg);
  },
  toDetialView(even) {
    var url = 'https://mng.zhicall.cn/news/index.html?newsId=' + even.currentTarget.dataset.newsId;
    getApp().cache.setData("sourceURL", url)
    wx.navigateTo({
      url: '/pages/more/web-view/web-view?title=' + even.currentTarget.dataset.name
    })
  },
  loadNote() {
    getApp().request.postHeadNoToast("getByCatalog", {
      pageNum: 1,
      pageSize: 1
    }, [169], (data) => {
      if (data.length > 0) {
        let note = getApp().cache.getData('note.publishTime');
        if (!note || note - 0 < data.addTime - 0) {
          getApp().cache.setData('note.publishTime', data[0].addTime);
          this.loadNoteDetail(data[0].id);
        } else {
          let notShow = getApp().cache.getData('note.notShow');
          if (!notShow) {
            this.loadNoteDetail(data[0].id);
          }
        }
      }
    }, null, "zixun")

  },
  loadNoteDetail(id) {
    getApp().request.postHeadNoToast("getNewDetail", { familyId: 0 }, [id], (data) => {
      this.setData({
        showNote: true,
        noteTitle: data.title
      })
      var WxParse = require('../../../utils/wxParse/wxParse.js');
      WxParse.wxParse('article', 'html', data.newsDetail, this, 5);
    }, null, "zixun");
  },
  clickCancel() {
    this.setData({
      showNote: false
    })
    getApp().cache.setData('note.notShow', true);
  },
  clickConfirm() {
    this.setData({
      showNote: false
    })
    getApp().cache.setData('note.notShow', false);
  }

}));