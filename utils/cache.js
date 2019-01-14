// var globalData = getApp().globalData;
var config = require('../config.js');

var setData = (key, data) => {
  var key1 = config.hospitalId + '.' + config.mode + '.' + key;
  wx.setStorageSync(key1, data);
}

var getData = (key) => {
  var key1 = config.hospitalId + '.' + config.mode + '.' + key;
  return wx.getStorageSync(key1)
}

var removeKey = (key) => {
  var key1 = config.hospitalId + '.' + config.mode + '.' + key;
  wx.removeStorageSync(key1)
}
module.exports.setData = setData;
module.exports.getData = getData;
module.exports.removeKey = removeKey;