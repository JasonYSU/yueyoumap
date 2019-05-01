var config = require('../../../utils/config.js');
var page = 0;
var page_size = 5; 
var GetList = function (that) {
  that.setData({
    hidden: false
  });
  wx.showNavigationBarLoading(); 
  wx.request({
    url: config.requestUrl + '/activities/index/',
    data: {
      page: page,
      page_size: page_size
    },
    header: {
      'Content-Type': 'application/json'
    },
    success: function (res) {
      var whdthNum = res.data;
      if (whdthNum == 0) {
        that.setData({
          ShdthNum: whdthNum
        });
      }
      if(res.data != 0){
        var listData = wx.getStorageSync('infoList') || []
        for (var i = 0; i < res.data.length; i++) {
          listData.push(res.data[i]);
        }
        wx.setStorageSync('infoList', listData)
        setTimeout(function () {
          that.setData({
            infoList: listData
          });
        }, 800)
        page++;
        setTimeout(function () {
          that.setData({
            hidden: true
          });
        }, 2000)
      }else{
        that.setData({
          hidden: true,
          display: false
        });
      }
      
    },
    complete: function () {
      wx.hideNavigationBarLoading(); 
      wx.stopPullDownRefresh();
    }
  })
}
// -------------------------------
Page({
  data: {
    picUrl: config.host,
    infoList:[],
    hidden: true,
    display: true,
    ShdthNum: 1
  },
  onLoad: function () {
    try {
      wx.removeStorageSync('infoList')
    } catch (e) {
    }
  },
  onShow: function () {
    var that = this;
    var ShdthNum = that.data.ShdthNum;
    if (ShdthNum == 1) {
      GetList(that);
    }else{
      setTimeout(function () {
        try {
          var value = wx.getStorageSync('infoList')
          if (value) {
            that.setData({
              infoList: value,
            })
          }
        } catch (e) {
          console.log('error');
        }
      }, 1000) 
    }
  },

  onPullDownRefresh: function () {
    page = 0;
    this.setData({
      display: true,
      infoList: []
    })
    wx.removeStorageSync('infoList')
    GetList(this)
  },
  onReachBottom: function () {
    var that = this;
    setTimeout(function () {
      GetList(that)
    }, 1000)
  },
  onShareAppMessage: function () {
    var that = this;
    var picUrl = that.data.picUrl;
    return {
      title: '【活动报名】请求各位朋友帮忙扩散',
      path: '/pages/activities/index/index'
    }
  }
})
