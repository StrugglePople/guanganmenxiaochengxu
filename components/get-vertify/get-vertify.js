// components/get-vertify/get-vertify.js
const toastTxt = getApp().widget.toastTxt;
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    mobile: {
      type: String,
      value: '',
    },
    imgValue: {
      type: String,
      value: '',
    },
    urlId: {
      type: String,
      value: '',
    },
    businessNo: {
      type: String,
      value: '',
    }

  },

  /**
   * 组件的初始数据
   */
  data: {
    getVertiValue:"获取验证码"

  },
  ready: function () {
    var lastime = getApp().cache.getData('lastGetVerTime'),
      now = (new Date()).getTime();
    if (lastime && now - lastime < 60000) {
      var time = 60 - Math.ceil((now - lastime) / 1000);
      this.changeVertify(time);

    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    getVertify: function (e) {
      if (this.data.getVertiValue != "获取验证码") {
        return;
      }
      // if(1){
      //   toastTxt("获取验证码成功");
      //   getApp().cache.setData('lastGetVerTime', new Date().getTime());
      //   this.changeVertify(60);
      //   return;
      // }
      if (!this.properties.mobile) {
        toastTxt("请输入手机号");
        // this.triggerEvent('tost', { title: '请输入手机号' });
        return;
      }
      if (this.properties.urlId == 'getRegisterSecCode' && !this.properties.imgValue) {
        toastTxt('请输入图片验证码');
        return;
      }
      var param = {};
      param.mobile = this.properties.mobile;
      if (this.properties.urlId == 'getRegisterSecCode'){
        param.picVCode = this.properties.imgValue;
        param.deviceId = getApp().globalData.deviceId;
      } else if (this.properties.urlId == 'cancelAppointVerCode'){
        param.accountId = getApp().globalData.session.id;
        param.businessNo = this.properties.businessNo;
      }
      getApp().request.post(this.properties.urlId, true, param, (json) => {
        toastTxt("获取验证码成功");
        // this.triggerEvent('tost', { title: json.errMsg })
        getApp().cache.setData('lastGetVerTime', new Date().getTime());
        this.changeVertify(60);
      });
    },
    changeVertify: function (time) {
      this.setData({
        getVertiValue: time + " 秒"
      });
      var interval = setInterval(() => {
        time--;
        if (time == 0) {
          clearInterval(interval);
          this.setData({
            getVertiValue: "获取验证码"
          });
        } else {
          this.setData({
            getVertiValue: time + " 秒"
          });
        }

      }, 1000);
    }

  }
})
