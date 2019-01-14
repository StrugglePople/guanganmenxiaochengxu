//弹出warn框

var showToast = (title, complete,icon,image) => {
  wx.showToast({
    title: title,
    complete: complete,
    icon: icon,
    image: image
  });
}



var toast = (title, complete, image) => {
  wx.showToast({
    title: title,
    image: '/style/image/warn.png',
    complete: complete
  });
}

var toastTxt = (title, complete) => {
  wx.showToast({
    title: title,
    icon: 'none',
    complete: complete,
    duration:2000
  });
}

var alert = (message, complete, title) => {
  wx.showModal({
    title: title ? title : '提示',
    showCancel: false,
    content: message,
    success: (res) => {
      if (res.confirm) {
        if (complete) {
          complete();
        }
      }
    }
  })
}

var confirm = (message, complete, title, buttonName) => {
  var trueTitle, cancelTitle;
  if (buttonName) {
    if (buttonName.length == 1) {
      trueTitle = buttonName[0];
    } else if (buttonName.length == 2) {
      trueTitle = buttonName[0];
      cancelTitle = buttonName[1];
    }
  }

  wx.showModal({
    title: title ? title : '提示',
    content: message,
    confirmText: trueTitle ? trueTitle : '确定',
    cancelTitle: cancelTitle ? cancelTitle : '取消',
    success: (res) => {
      if (res.confirm) {
        if (complete) {
          complete();
        }
      } else if (res.cancel) {
        // console.log('用户点击取消')
      }
    }
  })
}

var playVoiceWithText = (text)=> {
  if (getApp().globalData.innerAudioContext) {
    getApp().globalData.innerAudioContext.stop();
    // getApp().globalData.innerAudioContext.destroy();
  }
  if (!getApp().globalData.innerAudioContext) {
    getApp().globalData.innerAudioContext = wx.createInnerAudioContext();
  }
  var innerAudioContext = getApp().globalData.innerAudioContext;
  var src = 'http://tts.baidu.com/text2audio?lan=zh&ie=UTF-8&spd=45&text=' + encodeURIComponent(text);
  innerAudioContext.src = src;
  innerAudioContext.play();
  innerAudioContext.onPlay(() => {
    console.log('开始播放')
  })
  innerAudioContext.onError((res) => {
    console.log(res.errMsg)
    console.log(res.errCode)
  })
}
module.exports.playVoiceWithText = playVoiceWithText;
module.exports.toast = toast;
module.exports.toastTxt = toastTxt;
module.exports.alert = alert;
module.exports.confirm = confirm;