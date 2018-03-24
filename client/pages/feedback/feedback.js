/*Page({

  /**
   * 页面的初始数据
   
  data: {
    getval: '',
    hello: 'hello',
    meslist: []
  },
  getval: function (e) {

    this.setData({
      getval: e.detail.value
    })
  },
  sbumit: function (options) {
    var that = this;
    console.log('-----设置前-------');
    console.log(that.data.getval);
    var list = that.data.meslist;
    if (that.data.getval) {
      list.push({
        mes: that.data.getval
      });
      that.setData({
        meslist: list,
        inputval: "",
        getval: ""
      });
    }
    else {
      wx.showModal({
        title: '提示',
        content: '请输入留言内容',
      })
    }
  },
  onLoad: function (options) {
    console.log('页面显示了');
    var that = this;
    wx.getStorage({
      key: 'meslist',
      success: function (res) {
        console.log(res.data)
        that.setData({
          meslist: res.data
        })
      }
    })

  },
  dellist: function (res) {
    var u = res.target.dataset.index;
    var newlist = this.data.meslist;
    newlist.splice(u, 1);
    // var newlist = this.data.meslist.splice(u,1);
    // 这样的方法是错误的，splice方法返回的是被删除的元素，
    this.setData({
      meslist: newlist
    });
  },
  onHide: function () {
    var res = this.data.meslist;
    console.log('页面隐藏了');
    wx.setStorage({
      key: "meslist",
      data: res,
      success: function (res) {
        console.log('存储缓存成功')
      }
    })
  }
})
*/

//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    inputVal: '',
    msgData: [],
    //storageContent:'',
    //storageSyncContent: ''
  },
  changeInputVal(e) {
    this.setData({
      inputVal: e.detail.value
    })
  },
  delMsg(ev) {
    var n = ev.target.dataset.index;
    var list = this.data.msgData;
    list.splice(n, 1);
    this.setData({
      msgData: list
    });
    // console.log(ev.target.dataset.index);//target指点击的元素，dataset指data-index属性的获取方式
  },
  addMsg() {
    // this.data.msgData.push({
    //   msg:this.data.inputVal
    // });
    var list = this.data.msgData;
    if (this.data.inputVal) {
      list.push({
        msg: this.data.inputVal
      });
      this.setData({
        msgData: list,
        inputval: "",
        //storageContent: ""
      });
    }
    else {
      wx.showModal({
        title: '提示',
        content: '请输入留言内容',
      })
    }
  },

  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this;
    wx.setStorage({
      key: "key",
      data: this.data.msgData
    })
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
  }
})