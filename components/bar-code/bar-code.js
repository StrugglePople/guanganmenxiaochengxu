// components/bar-code.js
var wxbarcode = require('../../utils/barCode/index');
Component({
  /**
   * 组件的属性列表
   */
  properties: {
      cardNo:{
          type: String,
          value: '',
      },

  },

  /**
   * 组件的初始数据
   */
  data: {

  },
  ready: function(){
      wxbarcode.barcode('barcode', this.properties.cardNo, 256, 60,this);

  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
