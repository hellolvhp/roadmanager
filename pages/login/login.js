Page({
  data: {
    phone: '',
    password: ''
  },

  // 获取输入账号 
  phoneInput: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },

  // 获取输入密码 
  passwordInput: function (e) {
    this.setData({
      password: e.detail.value
    })
  },

  // 登录 
  login: function () {
    if (this.data.phone.length == 0 || this.data.password.length == 0) {
      wx.showToast({
        title: '用户名或密码空',
        icon: 'loading',
        duration: 2000
      })
    } else {
      var that = this;
      var loginUrl = getApp().globalData.loginUrl;
      console.log(loginUrl)
      var openid = wx.getStorageSync('openid');
      console.log(openid);
      wx.request({
        url: loginUrl,
        data: {
          loginName: this.data.phone,
          passWord: this.data.password,
          openid: openid
        },
        method: 'GET',
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          console.log(res.data);
          if (res.data == 'userNameError') {
            wx.showToast({
              title: '用户名错误',
              icon: 'loading',
              duration: 2000

            })
          } else if (res.data == 'passWordError') {
            wx.showToast({
              title: '密码错误',
              icon: 'loading',
              duration: 2000

            })
          } else {
            wx.showToast({
              title: '登录成功',
              icon: 'success',
              duration: 2000
            })
            //
            wx.setStorageSync('userId', res.data)
            // 这里登录成功后跳转的页面
            wx.navigateTo({
              url: '../home/home'
            })
          }
        },
        fail: function (res) {
          console.log(".....登录fail.....");
        }
      })
    }
  }
})