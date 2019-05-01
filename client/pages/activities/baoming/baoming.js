var bmap = require('../../../utils/bmap-wx.js');
var config = require('../../../utils/config.js');
var wxMarkerData = [];  
Page({
  data: {
    ak: config.baiduAk, 
    markers: [],
    longitude: '',   
    latitude: '',    
    address: '获取中...',     
    openid: 0,
    loading: false,
    disabled: false,
    loadingHide: true,
    loadingText: "位置获取中",
    content: '',
    vid:0
  },

  formSubmit: function (e) {
    var that = this;
    var formData = e.detail.value;
    var openid = that.data.openid;
    var vid = that.data.vid;
      wx.showToast({
        title: '请稍后',
        icon: 'loading',
        duration: 4000
      })
      wx.request({
        url: config.requestUrl + 'baoMing/openid/' + openid,
        data: formData,
        header: {
          'Content-Type': 'application/json'
        },
        method: 'GET',
        success: function (res) {
          wx.showToast({
            title: '报名成功',
            icon: 'success',
            duration: 3000
          })
          that.setData({
            loading: true,
            disabled: true
          })
          setTimeout(function () {
            wx.navigateTo({
              url: '../view/view?id=' + vid
            })
          }, 2000)

        }
      })
  },

  onLoad: function (res) {
    this.setData({
      vid: res.vid
    })
    this.getBaiduMap(); 
  },

  onShow: function () {
    var that = this;
    that.setData({
      disabled: false,
      loading: false,
      content: ''
    })
    wx.login({
      success: function (loginCode) {
        wx.request({
          url: config.requestUrl + 'GetOpenid/code/' + loginCode.code,
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

  },

  clearGps: function () {
    this.getBaiduMap();
  },
  getBaiduMap: function () {
    var that = this;
    that.setData({ loadingHide: false });
    var BMap = new bmap.BMapWX({
      ak: that.data.ak
    });
    var fail = function (data) {
      var errMsg = data.errMsg;
      if (errMsg == 'getLocation:fail auth deny') {
        that.setData({
          latitude: 0,
          longitude: 0,
          address: '火星网友一枚'
        })
      } else {
        that.setData({
          latitude: 0,
          longitude: 0,
          address: '火星网友一枚'
        })
      }
      setTimeout(function () {
        that.setData({ loadingHide: true });
      }, 1000)
    };
    var success = function (data) {
      wxMarkerData = data.wxMarkerData;
      that.setData({
        markers: wxMarkerData,
        latitude: wxMarkerData[0].latitude,
        longitude: wxMarkerData[0].longitude,
        address: wxMarkerData[0].address,
      });
      setTimeout(function () {
        that.setData({ loadingHide: true });
      }, 1000)
    }; 
    BMap.regeocoding({
      fail: fail,
      success: success
    });
  }

})