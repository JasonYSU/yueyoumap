var app = getApp();
var util = require("../../../utils/util.js");
var network = require('../../../utils/network.js');
var config = require('../../../utils/config.js');
Page({
  data: {
    views:'',
    picUrl: config.host,
    openid:'',
    vid:'',
    view_id: 0,
    userInfo: {},
    tel: '0123456789',
    gzList: []  
  },

  onShow: function () {
  },


  onLoad: function (params) {
    var that = this;
    wx.showNavigationBarLoading(); 
    wx.request({
      url: config.requestUrl + '/activities/view/id/' + params.id,
      data: {},
      method: 'GET',
      success: function (res) {
        that.setData({
          views: res.data,
          vid: res.data.id,
          view_id: params.id,
          tel: res.data.tel,
          gzList: res.data.gzlist
        })
        wx.showLoading({
          title: '加载中'
        })
      },
      complete: function () {
        setTimeout(function () {
          wx.hideLoading()
        }, 1000)
        wx.hideNavigationBarLoading() 
      }
    })
    wx.login({
      success: function (loginCode) {
        wx.request({
          url: config.requestUrl + '/GetOpenid/code/' + loginCode.code,
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            that.setData({
              openid: res.data
            })
          }
        })
      }
    })

    app.getUserInfo(function (userInfo) {
      that.setData({
        userInfo: userInfo
      })
    })
  },

  callmeTap: function () {
    wx.makePhoneCall({
      phoneNumber: this.data.tel
    })
  },


  bMingBtn:function(){
    wx.navigateTo({
      url: '../baoming/baoming?vid=' + this.data.vid,
    })
  },


  openMaps:function(e){
    var lat = e.currentTarget.dataset.lat;
    var long = e.currentTarget.dataset.long;
    var address = e.currentTarget.dataset.address;
    wx.openLocation({
      latitude: Number(lat),
      longitude: Number(long),
      scale: 28,
      name:'信息发出位置',
      address: address
    })
  },

onShareAppMessage: function (res) {
  var that = this;
  return {
    title: '【活动报名】请求各位朋友帮忙扩散',
    path: '/pages/view/view?id=' + that.data.vid
  }
}

})