//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if (res.code) {
          var loginInfoUrl = getApp().globalData.serverUrl +'a/wx/getLoginInfo';
          console.log(loginInfoUrl)
          //发起网络请求，获取openId
          wx.request({
            url: loginInfoUrl,
            data: {
              code: res.code
            },
            method: 'GET',
            header: {
              'content-type': 'application/json' // 默认值
            },
            success: function (res) {
              console.log(res.data);
              console.log(res.data.t.isNeedLoging);
              var isNeedLoging = res.data.t.isNeedLoging;
              if (isNeedLoging == '1') {
                wx.setStorageSync("openid", res.data.t.openid)//可以把openid保存起来,以便后期需求的使用
                wx.navigateTo({
                  url: '../login/login'
                })
              } else {
                console.log('2');
                wx.navigateTo({
                  url: '../home/home'
                })
              }
            }
          })
        }
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
        //获取当前位置
        if (!res.authSetting['scope.userLocation']) {
          wx.authorize({
            scope: 'scope.userLocation'
          })
        }
        //微信运动
        if (!res.authSetting['scope.werun']) {
          wx.authorize({
            scope: 'scope.werun'
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    serverUrl:'http://localhost:8080/loitplat_roadmanager/'
  },
  scan: function (e) {
    console.log("扫一扫")
  },

})