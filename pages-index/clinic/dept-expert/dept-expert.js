// pages/index/clinic/dept-expert/dept-expert.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showFare:false,
    searchDepts:[],
    btredisTotalLeftNum:-1,
    doctors:[],
    type:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      type: options.type
    });
   
    this.getData();
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  },
  getData() {
    var param = {
      hospitalId: getApp().globalData.selectHospitalId,
      regType:"RESERVATION"
    }
    var url = this.data.type == "yuyue" ? "getAppointDeptList" :"guideDepts";
    getApp().request.postNoToast(url, param, (data) => {
      this.data.depts = data;
      if (this.data.depts.length == 0) {
        this.setData({
          searchDepts: null
        })
        return;
      }
      // var t = this.handleData(data);
      this.setData({
        selectDept: data[0],
        searchDepts: data
      })
      this.getDoctors(false);
        // this.getPuTongHao();
    })
  },
  handleData(depts) {
    let map = {};
    for (let i = 0; i < depts.length; i++) {
      var dept = depts[i],
        key = dept.shortPinyin.substr(0, 1);
      if (!map[key]) {
        map[key] = [];
      }
      map[key].push(dept);
    }
    let array = [],
      keyArray = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R'
        , 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    for (let i = 0; i < keyArray.length; i++) {
      if (map[keyArray[i]]) {
        array.push({ key: keyArray[i], list: map[keyArray[i]] })
      }
    }
    return array;
  },
  getPuTongHao(){
    var param = {
      expertType: 'DEPT_COMMON'
    }
    getApp().request.postNoToast('cacheReg', param, [getApp().globalData.selectHospitalId, this.data.selectDept.id], (json) => {
      if(json.success){
        this.setData({
          btredisTotalLeftNum: json.data.redisTotalLeftNum
        })
      }
    })
  },

  getDoctors(hasLoading) {
    var param = {
      deptId: this.data.selectDept.id,
      regType: "RESERVATION"
    },
      url = this.data.type == "yuyue" ? "expertListBySchedule" : "expertListByDept";
    getApp().request.post(url, hasLoading, param, (data) => {
      for (var item of data) {
        if (!item.picName) {
          item.picName = item.id + '';
        }
        item.src = item.picName.indexOf('http') > -1 ? item.picName + '?' + new Date().getTime() : getApp().request.url.mobile + '/mobile/image/hospital/' + getApp().globalData.hospitalId + '/expert/' + item.picName;
      }
      this.setData({
        doctors: data
      })
    })
  },
  clickDept(e) {
    var id = e.currentTarget.dataset.dept;
    for(var i =0; i <this.data.depts.length; i++) {
      if (this.data.depts[i].id == id) {
        this.setData({
          selectDept: this.data.depts[i]
        })
        this.getDoctors(true);
        // this.getPuTongHao();
        break;
      }
    }
  },



  deptSchedule(e) {
    var param1 = {
      deptId: this.data.selectDept.id,
      regType: "RESERVATION"
    }
    getApp().request.postWithToast('getDeptDetailInfo', param1, (data) => {
      getApp().cache.setData('clinicInfo', data);
      wx.navigateTo({
        url: '/pages-index/clinic/dept-schedule/dept-schedule'
      })
    })
  },
  doctorSchedule(e) {
    var id = e.currentTarget.dataset.id, doctor;
    for (var i = 0; i < this.data.doctors.length; i++) {
      if (this.data.doctors[i].id == id) {
        doctor = this.data.doctors[i];
        break;
      }
    }
  
    var param1 = {
      deptId: this.data.selectDept.id,
      doctorId: id,
      regType: "RESERVATION"
    }
    if (this.data.type == "yuyue"){
      getApp().request.postWithToast('getScheduleForExpert', param1, (data) => {
        data.doctor.src = doctor.src;
        getApp().cache.setData('clinicInfo', data);
        wx.navigateTo({
          url: '/pages-index/clinic/expert-schedule/expert-schedule',
        })
      })
    }else{
      getApp().cache.setData('static.doctor', doctor);
      wx.navigateTo({
        url: '/pages/into-hospital/doctor-detial/doctor-detial'
      })
    }
    

  },


  imageError(e) {
    var index = e.currentTarget.dataset.index;
    var key = 'doctors[' + index +'].hiddenDefaultDoctor' ;
    this.setData({
      [key]: true
    })
  }

})