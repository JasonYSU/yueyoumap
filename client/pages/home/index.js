const Utils = require('../../resources/gis-poi.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    showMarkIcon: true, // 显示POI图标
    showRoute: true, // 显示路径标记图标
    latitude: '',
    longitude: '',
    markers: [],
    mapStyle: '',
    polyline: [],
  },

   /**
   * 获取当前位置
   */
  onReady: function (e) {
    this.mapCtx = wx.createMapContext('myMap');
    // 地图铺满屏幕
    this.getMapStyle();
    // 获取当前所在位置
    this.getLocation();
  },

  /**
   * 获取真机的窗口宽高,为地图样式赋初值
   */
  getMapStyle() {
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          mapStyle: `width:${res.windowWidth}px;height:${res.windowHeight}px;`
        })
      },
    });
  },

  /**
   * 获取当前位置
   */
  getLocation() {
    wx.getLocation({
      type: 'gcj02',
      success: (res) => {
        console.log(res);
        this.setData({
          latitude: res.latitude,
          longitude: res.longitude
        });
      },
      fail: res => {
        console.log(res);
      }
    })
  },

  /**
   * 连线
   */
  connectPoly: function (res) {
    let chooseMarkers = [].concat(this.data.markers);
    //连线
    let points = [];//points 取表单中信息
    let polyline = [].concat(this.data.polyline);//length值？？
    if (this.data.markers.length === 0) {
      points = [];
    } else {
      points = [{
        latitude: chooseMarkers[chooseMarkers.length - 1].latitude,
        longitude: chooseMarkers[chooseMarkers.length - 1].longitude,
      }, {
        latitude: res.latitude,
        longitude: res.longitude,
      }];
    }

    polyline.push({
      points: points,
      color: '#FF0000DD',
      width: 2,
      dottedLine: false
    });
    this.setData({
      polyline: polyline
    });
  },

  /**
   * 标记点
   */
  markLocation: function () {

    this.mapCtx.getCenterLocation({
      success: (res) => {
        if (this.data.showIpnutModal) {
          return;
        }
        let chooseMarkers = [].concat(this.data.markers);

        chooseMarkers.push({
          id: chooseMarkers.length + 1,
          latitude: res.latitude,
          longitude: res.longitude,
          iconPath: '../../resources/location-green.png'
        });

        //循环连线
        //标记下一个点前先划线
        this.connectPoly(res);

        this.setData({
          markers: chooseMarkers,
          showIpnutModal: true,
          inputInfo: '',
          showMarkIcon: false
        });
      }
    })
  },
})