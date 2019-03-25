
var format  = (format) =>{
  var n = format;
  var date = new Date(n);
  //年  
  var Y = date.getFullYear();
  //月  
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
  //日  
  var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
  //时  
  var h = date.getHours();
  //分  
  var m = date.getMinutes();
  //秒  
  var s = date.getSeconds();

  return Y +'-' + M + '-' +D  ;
}

var getWeek = (dateString) => {
  let date;
  let dateArray = dateString.split("-");
  date = new Date(dateArray[0], Number(dateArray[1]) - 1, dateArray[2]);
  return "星期" + "日一二三四五六".charAt(date.getDay());
}

var getMinutesFromSecond = (s) => {
  var t = '';
  if (s > -1) {
    var min = Math.floor(s / 60) % 60;
    var sec = s % 60;
    if (min < 10) { t += "0"; }
    t += min + ":";
    if (sec < 10) { t += "0"; }
    t += sec.toFixed(0);
  }
  return t;
}
var compare = (d1, d2) => {
  d1 = d1.replace(/\-/gi, "/");
  d2 = d2.replace(/\-/gi, "/");
  let time1 = new Date(d1).getTime();
  let time2 = new Date(d2).getTime();
  if (time1 > time2) {
    return 1;
  } else if (time1 == time2) {
    return 0;
  } else {
    return -1;
  }
}
var getPreMonth = (date,n=1) => {
  let arr = date.split('-');
  let year = arr[0]; //获取当前日期的年份
  let month = arr[1]; //获取当前日期的月份
  let year2 = year;
  let month2 = parseInt(month) - n;
  if (month2 <= 0) {
    year2 = parseInt(year2) - 1;
    month2 = month2 + 12;
  }
  let month2Str = month2.toString();
  if (month2 < 10) {
    month2Str = '0' + month2;
  }
  // let t2 = year2 + '-' + month2Str + "-" + arr[2];
  let t2 = year2 + '-' + month2Str + "-01";
  return t2;
}

/**
 * 获取下一个月
 *
 * @date 格式为yyyy-mm-dd的日期，如：2014-01-25
 */
var getNextMonth = (date) => {
  let arr = date.split('-');
  let year = arr[0]; //获取当前日期的年份
  let month = arr[1]; //获取当前日期的月份
  let year2 = year;
  let month2 = parseInt(month) + 1;
  if (month2 == 13) {
    year2 = parseInt(year2) + 1;
    month2 = 1;
  }
  let month2Str = month2.toString();
  if (month2 < 10) {
    month2Str = '0' + month2;
  }

  let t2 = year2 + '-' + month2Str;
  return t2;
}
var getWeekStr = (num) => {
  var transWeek = {
    1: '一',
    2: '二',
    3: '三',
    4: '四',
    5: '五',
    6: '六',
    7: '日'
  };
  return '星期' + transWeek[num];
}

module.exports.format = format;
module.exports.getWeek = getWeek;
module.exports.getMinutesFromSecond = getMinutesFromSecond;
module.exports.compare = compare;
module.exports.getPreMonth = getPreMonth;
module.exports.getNextMonth = getNextMonth;
module.exports.getWeekStr = getWeekStr;