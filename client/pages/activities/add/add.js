//var app = getApp();
var config = require('../../../utils/config.js');
var bmap = require('../../../utils/bmap-wx.js');
var wxMarkerData = [];  
Page({
  data: {
    ak: config.baiduAk, 
    markers: [],    
    longitude:'',   
    latitude:'',     
    address:'获取中...',     
    openid: 0,
    imglist: [],
    item: '../../../resources/upic.png',
    loading: false,
    disabled: false,
    loadingHide: true,
    loadingText: "位置获取中",
    content:'',
    kdate: '2019-05-01',
    jdate: '2019-05-01'
  },

  kbindDateChange: function (e) {
    this.setData({
      kdate: e.detail.value
    })
  },

  jbindDateChange: function (e) {
    this.setData({
      jdate: e.detail.value
    })
  },

  formSubmit: function (e) {
    var that = this;
    var imglist = that.data.imglist;
    var formData = e.detail.value;
    var content = e.detail.value.content;
    var openid = that.data.openid;
    var kdate = that.data.kdate;
    var jdate = that.data.jdate;

    if (content.length === 0){
      wx.showToast({
        title: '内容不能为空',
        icon: 'loading',
        duration: 2000
      })
    }else{
      wx.showToast({
        title: '请稍后',
        icon: 'loading',
        duration: 4000
      })
      wx.request({
        url: config.requestUrl + 'addData/openid/' + openid + '/kdate/' + kdate + '/jdate/' + jdate,
        data: formData,
        header: {
          'Content-Type': 'application/json'
        },
        method: 'GET',
        success: function (res) {
            var aid = res.data;
            console.log(config.requestUrl + 'addData/openid/' + openid + '/kdate/' + kdate + '/jdate/' + jdate);
            if (imglist != '') {
              for (var i = 0; i < imglist.length; i++) {
                wx.uploadFile({
                  url: config.requestUrl + 'upload/pid/' + aid,
                  filePath: imglist[0],
                  name: 'files',
                  formData: {
                    'pid': aid
                  },
                  method: 'GET',
                  header: {
                    'Content-Type': 'application/json'
                  },
                  success: function (res) {
                    if (i >= imglist.length) {
                      wx.showToast({
                        title: '发布成功',
                        icon: 'success',
                        duration: 3000
                      })
                      that.setData({
                        imglist: [],
                        loading: true,
                        disabled: true
                      })
                      setTimeout(function () {
                        wx.switchTab({
                          url: '../index/index',
                        })
                      }, 2000) 
                    }
                  }
                })
              }
             
          }else {
              wx.showToast({
                title: '发布成功',
                icon: 'success',
                duration: 3000
              })
              that.setData({
                loading: true,
                disabled: true
              })
              setTimeout(function () {
                wx.switchTab({
                  url: '../index/index',
                })
              }, 2000) 
          }
        }
      })
    }
  }, 

  upsUid: function(e){
    var openid = e.data;
    wx.request({
      url: config.requestUrl + 'seachUser/openid/' + openid,
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if(res.data != 0){
          wx.navigateTo({
            url: '../mobile/mobile',
          })
        }
      }
    })
  },

  onLoad:function(){
    this.getBaiduMap(); 
  },

  onShow: function(){
    var that = this;
    that.setData({
      disabled: false,
      loading: false,
      content:''
    })
    wx.login({
      success: function (loginCode) {
        wx.request({
          url: config.requestUrl + 'GetOpenid/code/' + loginCode.code,
          header: {
            'content-type': 'application/json'
          },
          success: function (res) { 
            that.upsUid(res);
            that.setData({
              openid: res.data
            })
          }
        })
      }
    })
    
  },


  checkimg: function () {
    self = this
    wx.chooseImage({
      count: 1, 
      sizeType: ['original', 'compressed'], 
      sourceType: ['album', 'camera'], 
      success: function (res) {
        var tempFilePaths = res.tempFilePaths
        self.setData({
          imglist: tempFilePaths
        })
      }
    })
  },

  clearGps: function(){
    this.getBaiduMap();
  },
  getBaiduMap: function (){     
    var that = this;    
    that.setData({ loadingHide: false });
    var BMap = new bmap.BMapWX({     
        ak: that.data.ak     
    });    
    var fail = function(data) { 
        var errMsg = data.errMsg;
        if(errMsg == 'getLocation:fail auth deny'){
          that.setData({  
            latitude: 0,    
            longitude: 0,
            address:'冬瓜'
          })
        }else{
          that.setData({
            latitude: 0,    
            longitude: 0,
            address:'冬瓜'
          })
        }
        setTimeout(function () {
          that.setData({ loadingHide: true });
        }, 1000)  
    };     
    var success = function(data) {  
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