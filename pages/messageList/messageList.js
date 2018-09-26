// pages/messageList/messageList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var messageUrl = getApp().globalData.messageUrl;
    console.log(messageUrl)
    // var openid = wx.getStorageSync('openid');
    var openid = getApp().globalData.openid;
    console.log(openid)
    wx.request({
      url: messageUrl,
      data: {
        messageState: '0',
        openId: openid
      },
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data);
        that.setData({ messageList: res.data.tList})
      },
      fail: function (res) {
        console.log(".....获取消息列表fail.....");
      }
    })
  },
  /**
   * 未读消息列表
   */
  unReadMessage: function () {
    var that = this;
    var messageUrl = getApp().globalData.messageUrl;
    console.log(messageUrl)
    var openid = wx.getStorageSync('openid');
    console.log(openid)
    wx.request({
      url: messageUrl,
      data: {
        messageState: '0',
        openId: openid
      },
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data);
        that.setData({ messageList: res.data.tList })
      },
      fail: function (res) {
        console.log(".....获取消息列表fail.....");
      }
    })
  },
  /**
   * 已读消息列表
   */
  readMessage: function () {
    var that = this;
    var messageUrl = getApp().globalData.messageUrl;
    console.log(messageUrl)
    var openid = wx.getStorageSync('openid');
    console.log(openid)
    wx.request({
      url: messageUrl,
      data: {
        messageState: '1',
        openId: openid
      },
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data);
        that.setData({ messageList: res.data.tList })
      },
      fail: function (res) {
        console.log(".....获取消息列表fail.....");
      }
    })
  },
  /**
   * 查看消息详情
   */
  checkMessage: function (e) {
    var that = this;
    var checkMessageUrl = getApp().globalData.checkMessageUrl;
    var id = e.currentTarget.id;
    console.log(id);
    console.log(checkMessageUrl)
    wx.request({
      url: checkMessageUrl,
      data: {
        id: id
      },
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data);
        wx.navigateTo({
          url: '../home/home'
        })
      },
      fail: function (res) {
        console.log(".....获取消息列表fail.....");
      }
    })
  }
})