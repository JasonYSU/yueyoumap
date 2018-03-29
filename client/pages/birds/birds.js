// pages/birds/birds.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    birds: [
      {
        ID: 1,
        name: "绿头鸭",
        picture: 'http://p0ob3mc5y.bkt.clouddn.com/yueyoumap/birdslvtouya.jpg',
        //{{birds.picture}}  data-id="{{birds.id}}" <view class="film-image"></view>
        sound: 'http://c.deyuedu.net/cloud/index.php?manditu/playsy-id_24858.html&open=new',
        //wx:for-items = {{birds.sound}}
        sounds:'http://p4oxvy8sc.bkt.clouddn.com/绿头鸭.mp3',
        play: false

      },
      {
        ID: 2,
        name: "灰喜鹊",
        picture: 'http://p0ob3mc5y.bkt.clouddn.com/yueyoumap/birds灰喜鹊.jpg',
        sound: 'http://c.deyuedu.net/cloud/index.php?manditu/playsy-id_24855.html&open=new',
        sounds: 'http://p4oxvy8sc.bkt.clouddn.com/灰喜鹊.mp3',
        play: false
      },
      {
        ID:3,
        name: "珠颈斑鸠",
        picture: 'http://p0ob3mc5y.bkt.clouddn.com/yueyoumap/birds珠颈斑鸠.jpg',
        sound: 'http://c.deyuedu.net/cloud/index.php?manditu/playsy-id_24855.html&open=new',
        sounds: 'http://p4oxvy8sc.bkt.clouddn.com/珠颈斑鸠.mp3',
        play: false
      },
      {
        ID: 4,
        name: "小䴙䴘",
        picture: 'http://p0ob3mc5y.bkt.clouddn.com/yueyoumap/birds小PT2.jpg',
        //{{birds.picture}}  data-id="{{birds.id}}" 
        sound: 'http://c.deyuedu.net/cloud/index.php?manditu/playsy-id_24858.html&open=new',
        sounds: 'http://p4oxvy8sc.bkt.clouddn.com/小䴙䴘.mp3',
        play: false
        //wx:for-items = {{birds.sound}}
      },
      {
        ID: 5,
        name: "四声杜鹃",
        picture: 'http://p0ob3mc5y.bkt.clouddn.com/yueyoumap/birds四声杜鹃.jpg',
        sound: 'http://c.deyuedu.net/cloud/index.php?manditu/playsy-id_24855.html&open=new',
        sounds: 'http://p4oxvy8sc.bkt.clouddn.com/四声杜鹃.mp3',
        play: false
      },
      {
        ID: 6,
        name: "家燕",
        picture: 'http://p0ob3mc5y.bkt.clouddn.com/yueyoumap/birds家燕.jpg',
        sound: 'http://c.deyuedu.net/cloud/index.php?manditu/playsy-id_24855.html&open=new',
        sounds: 'http://p4oxvy8sc.bkt.clouddn.com/家燕.mp3',
        play: false
      },
      {
        ID: 7,
        name: "灰椋鸟",
        picture: 'http://p0ob3mc5y.bkt.clouddn.com/yueyoumap/birds灰椋鸟.jpg',
        sound: 'http://c.deyuedu.net/cloud/index.php?manditu/playsy-id_24855.html&open=new',
        sounds: 'http://p4oxvy8sc.bkt.clouddn.com/灰椋鸟.mp3',
        play: false
      },
      {
        ID: 8,
        name: "白鹭",
        picture: 'http://p0ob3mc5y.bkt.clouddn.com/yueyoumap/birds白鹭2.jpg',
        sound: 'http://c.deyuedu.net/cloud/index.php?manditu/playsy-id_24855.html&open=new',
        sounds: 'http://p4oxvy8sc.bkt.clouddn.com/白鹭.mp3',
        play: false
      }
    ]

  },
  viewDetail: function (e) {
    var ds = e.currentTarget.dataset;
    wx.navigateTo({
      url: ds.sound
    })
  },
  onReady: function(){
      // 使用 wx.createAudioContext 获取 audio 上下文 context
      this.audioCtx = [
        wx.createAudioContext('1'),
        wx.createAudioContext('2'),
        wx.createAudioContext('3'),
        wx.createAudioContext('4'),
        wx.createAudioContext('5'),
        wx.createAudioContext('6'),
        wx.createAudioContext('7'),
        wx.createAudioContext('8'),        
      ];
      //this.audioCtx.setSrc('http://p4oxvy8sc.bkt.clouddn.com/绿头鸭.m4a')
      //this.audioCtx.play()
    },
  play: function (event) {
    var id = event.currentTarget.dataset.birdid;
    for (var i = 0; i < this.data.birds.length; i++) {
      if (id == this.data.birds[i].ID) {
        this.data.birds[i].play = true;
        break;
      }
    }
    this.setData({
      birds: this.data.birds
    })
    this.audioCtx[id-1].play()
    this.setData({
      flags: true,
      flagp: false
    })
  },
  pause: function (event) {
    var id = event.currentTarget.dataset.birdid;
    for (var i = 0; i < this.data.birds.length; i++) {
      if (id == this.data.birds[i].ID) {
        this.data.birds[i].play = false;
      }
    }
    this.setData({
      birds: this.data.birds
    })
    this.audioCtx[id-1].pause()
    this.setData({
      flags: false,
      flagp: true
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  /*
  onLoad: function (options) {

    wx.request({
      url: 'test.php', //仅为示例，并非真实的接口地址
      data: {
       image:""
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data)
      }
    })
  },*/
  //include using in it include
  //image :"www.yueyoumap.com"
  /**
   * 生命周期函数--监听页面初次渲染完成
   */

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})