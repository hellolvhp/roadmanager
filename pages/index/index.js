//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: '路长责任制',
    tread_check_message_button:'消息',
    tread_check_rank_button: '踏查排行',
    tread_check_button: '踏查',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  bindViewTap1: function () {
    wx.request({
      url: 'http://localhost:8080/loitplat_roadmanager/a/wx/getTreadCheckRank',
      success:function(res){
        console.log(res.data)
      }
    })
  },
  bindViewTap2: function () {
    wx.navigateTo({
      url: '../treadCheckRank/treadCheckRank'
    })
  },
  bindViewTap3: function () {
    wx.navigateTo({
      url: '../treadCheck/treadCheck'
    })
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
