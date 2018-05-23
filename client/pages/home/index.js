//index.js
//获取应用实例
var app = getApp()

/*
Page({
  data: {
    url:'',
    /*indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 3000,
    duration: 1200,
    ListDatamarkers: [{
      id: 0,
      iconPath: "/resources/redPoint.png",
      name:"清河古汉城遗址",
      latitude: 40.0277171304,
      longitude: 116.3236445189,
      width: 10,
      height: 10
    }, {
      id: 1,
      iconPath: "/resources/redPoint.png",
      name:"清河广济桥",
      latitude: 40.0251292215,
      longitude: 116.3504880667,
      width: 10,
      height: 10
      }, {
        id: 2,
        iconPath: "/resources/redPoint.png",
        name:"清河清真寺",
        latitude: 40.0269161215,
        longitude: 116.3465076685,
        width: 10,
        height: 10
    }, {
      id: 3,
      iconPath: "/resources/redPoint.png",
      name:"清河制呢厂办公楼",
      latitude: 40.0283538231,
      longitude: 116.3341212273,
      width: 10,
      height: 10
    }
    ],
    polyline: [{
      points: [{
        longitude: 116.306633,
        latitude: 40.0171964
      }, {
        longitude: 116.306633,
        latitude: 40.0171964
      }],
      color: "#FF0000DD",
      width: 2,
      dottedLine: true
    }]
  },

  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  swiperchange: function (e) {
    //FIXME: 当前页码
    //console.log(e.detail.current)
  },

  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })

  },
  go: function (event) {
    wx.navigateTo({
      url: '../list/index?type=' + event.currentTarget.dataset.type
    })
  }
})
*/

//var app = getApp();

Page({
  data: {
    url: '',
    listData: [
      {
        "id": 1,
        "placeName": "清河广济桥",
        "placeImageUrl": "http://p52ap67fa.bkt.clouddn.com/广济桥.jpg",
        //"placeOpenTime": 1505854800,
        //"placeCloseTime": 1505919600,
        "placeAddress": "北京市海淀区",
        "placeLongitude": "116.3504880667",
        "placeLatitude": "40.0251292215"
      }, {
        "id": 2,
        "placeName": "清河清真寺",
        "placeImageUrl": "http://p52ap67fa.bkt.clouddn.com/清河清真寺.jpg",
        //"placeOpenTime": 1506286800,
        //"placeCloseTime": 1506258000,
        "placeAddress": "北京市海淀区",
        "placeLongitude": "116.3465076685",
        "placeLatitude": "40.0269161215"
      }, {
        "id": 3,
        "placeName": "清河制呢厂办公楼",
        "placeImageUrl": "http://p52ap67fa.bkt.clouddn.com/制呢厂办公楼.jpg",
        //"placeOpenTime": 1506200400,
        //"placeCloseTime": 1506265200,
        "placeAddress": "北京市海淀区",
        "placeLongitude": "116.3341212273",
        "placeLatitude": "40.0283538231"
      }, {
        "id": 4,
        "placeName": "清河古汉城遗址",
        "placeImageUrl": "http://p52ap67fa.bkt.clouddn.com/清河汉城遗址.jpg",
        //"placeOpenTime": 1506243600,
        //"placeCloseTime": 1506265200,
        "placeAddress": "北京市海淀区",
        "placeLongitude": "116.3236445189",
        "placeLatitude": "40.0277171304"
      }
    ],
    scale: '15',
    Height: '0',
    controls: '40',
    latitude: '40.0251292215',
    longitude: '116.3504880667',
    markers: [],
  },
  onReady: function (e) {
    // 使用 wx.createMapContext 获取 map 上下文 
    this.mapCtx = wx.createMapContext('myMap')
  },
  onLoad: function () {
    var that = this;

    that.setData({
      url: app.globalData.url
    })

    var data = JSON.stringify({
      page: 1,
      pageSize: 10,
      request: {
        placeLongitude: app.globalData.longitude,
        placeLatitude: app.globalData.latitude,
        userId: app.globalData.userId
      }
    })

    wx.getLocation({
      type: 'wgs84', //返回可以用于wx.openLocation的经纬度
      success: (res) => {
        that.setData({
          markers: that.getSchoolMarkers(),
          scale: 12,
          longitude: res.longitude,
          latitude: res.latitude
        })
      }
    });

    wx.getSystemInfo({
      success: function (res) {
        //设置map高度，根据当前设备宽高满屏显示
        that.setData({
          view: {
            Height: res.windowHeight
          },

        })
      }
    })
  },
  controltap(e) {
    this.moveToLocation()
  },
  getSchoolMarkers() {

    var market = [];

    for (let item of this.data.listData) {

      let marker1 = this.createMarker(item);

      market.push(marker1)
    }
    return market;
  },
  moveToLocation: function () {
    this.mapCtx.moveToLocation()
  },
  strSub: function (a) {
    var str = a.split(".")[1];
    str = str.substring(0, str.length - 1)
    return a.split(".")[0] + '.' + str;
  },
  createMarker(point) {

    let latitude = this.strSub(point.placeLatitude);
    let longitude = point.placeLongitude;
    let marker = {
      iconPath: "../resources/redPoint.png",//point.placeImageUrl,//"../../image/banner5.jpeg",
      id: point.id || 0,
      name: point.placeName || '',
      title: point.placeName || '',
      latitude: latitude,
      longitude: longitude,
      label: {
        x: -24,
        y: -26,
        content: point.placeName
      },
      width: 30,
      height: 30
    };
    return marker;
  },

  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  swiperchange: function (e) {
    //FIXME: 当前页码
    //console.log(e.detail.current)
  },

  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })

  },
  go: function (event) {
    wx.navigateTo({
      url: '../list/index?type=' + event.currentTarget.dataset.type
    })
  }
})