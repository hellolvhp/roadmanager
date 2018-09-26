// pages/treadCheck/treadCheck.js
const util = require('../../utils/util.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: 'http://localhost:8080/loitplat_roadmanager/a/wx/treadCheckView',
    startTreadCheckId:'',
    userInfo: {},
    hasUserInfo: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    console.log("options.type", options.type);

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
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
    if (options.type=='1'){
      this.setData({ url: 'http://localhost:8080/loitplat_roadmanager/a/wx/treadCheckView?flag=0'     })
      wx.login({
        success: function (resLogin) {
          if (resLogin.code) {
            wx.request({
              url: 'http://localhost:8080/loitplat_roadmanager/a/wx/getLoginInfo',
              data: {
                code: resLogin.code
              },
              success: function (resSession) {
                //2、调用小程序API: wx.getWeRunData获取微信运动数据（加密的）；
                wx.getWeRunData({
                  success(resRun) {
                    const encryptedData = resRun
                    //3、解密步骤2的数据；
                    wx.request({
                      url: 'http://localhost:8080/loitplat_roadmanager/a/wx/decrypt',
                      data: {
                        encryptedData: resRun.encryptedData,
                        iv: resRun.iv,
                        code: resLogin.code
                      },
                      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
                      // header: {}, // 设置请求的 header
                      success: function (resDecrypt) {
                        var runData = JSON.parse(resDecrypt.data.t)
                        var currentStep, lat, lon
                        if (runData.stepInfoList) {
                          runData.stepInfoList = runData.stepInfoList.reverse()
                          var currentDate = util.formatTime(new Date()).substring(0, 10)
                          for (var i in runData.stepInfoList) {
                            runData.stepInfoList[i].date = util.formatTime(new Date(runData.stepInfoList[i].timestamp * 1000))
                            if (runData.stepInfoList[i].date.substring(0, 10) == currentDate) {
                              wx.getLocation({
                                type: 'wgs84',
                                success: function (res) {
                                  lat = res.latitude
                                  lon = res.longitude
                                  currentStep = runData.stepInfoList[i].step;
                                  wx.request({
                                    url: 'http://localhost:8080/loitplat_roadmanager/a/wx/startTreadCheck',
                                    data: {
                                      currentStep: currentStep,
                                      lat: lat,
                                      lon: lon,
                                      code: resLogin.code
                                    },
                                    method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
                                    header: {
                                      'content-type': 'application/json' // 默认值
                                    },                    
                                    success:function(startRes){
                                      if (startRes.data.retCode=="1003"){
                                        wx.showModal({
                                          title: '开始踏查失败',
                                          content: '当前用户没有进行登录操作，请先登录',
                                          showCancel:false,
                                          success: function (res) {
                                            if (res.confirm) {//跳转到登录界面
                                              wx.navigateTo({
                                                url: '../index/index',
                                              })
                                            } 
                                          }
                                        })
                                      } else if (startRes.data.retCode=='0'){
                                        that.setData({startTreadCheckId: startRes.data.t})
                                        console.log("startTreadCheckId",that.data.startTreadCheckId)

                                      }else{
                                        wx.showModal({
                                          title: '开始踏查失败',
                                          content: startRes.data.retMsg,
                                          showCancel: false,
                                          success: function (res) {
                                            if (res.confirm) {//
                                              that.setData({ url: 'http://localhost:8080/loitplat_roadmanager/a/wx/treadCheckView?flag=1' })
                                            }
                                          }
                                        })
                                      }
                                    }
                                  })
                                }
                              })
                              break;
                            }
                          }
                        }
                      }
                    });
                  }
                })
              }
            })
          } else {
            console.log('获取用户登录态失败！' + res.errMsg)
          }
        }
      });
    } else if (options.type == '0'){//结束踏查
      this.setData({ url: 'http://localhost:8080/loitplat_roadmanager/a/wx/treadCheckView?flag=1' })
      wx.login({
        success: function (resLogin) {
          if (resLogin.code) {
            wx.request({
              url: 'http://localhost:8080/loitplat_roadmanager/a/wx/getLoginInfo',
              data: {
                code: resLogin.code
              },
              success: function (resSession) {
                //2、调用小程序API: wx.getWeRunData获取微信运动数据（加密的）；
                wx.getWeRunData({
                  success(resRun) {
                    const encryptedData = resRun
                    //3、解密步骤2的数据；
                    wx.request({
                      url: 'http://localhost:8080/loitplat_roadmanager/a/wx/decrypt',
                      data: {
                        encryptedData: resRun.encryptedData,
                        iv: resRun.iv,
                        code: resLogin.code
                      },
                      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
                      // header: {}, // 设置请求的 header
                      success: function (resDecrypt) {
                        var runData = JSON.parse(resDecrypt.data.t)
                        var currentStep, lat, lon
                        if (runData.stepInfoList) {
                          runData.stepInfoList = runData.stepInfoList.reverse()
                          var currentDate = util.formatTime(new Date()).substring(0, 10)
                          for (var i in runData.stepInfoList) {
                            runData.stepInfoList[i].date = util.formatTime(new Date(runData.stepInfoList[i].timestamp * 1000))
                            if (runData.stepInfoList[i].date.substring(0, 10) == currentDate) {
                                  currentStep = runData.stepInfoList[i].step;
                                  wx.request({
                                    url: 'http://localhost:8080/loitplat_roadmanager/a/wx/endTreadCheck',
                                    data: {
                                      currentStep: currentStep,
                                      code: resLogin.code
                                    },
                                    method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
                                    header: {
                                      'content-type': 'application/json' // 默认值
                                    },
                                    success: function (endRes) {
                                      if (endRes.data.retCode == "1003") {
                                        wx.showModal({
                                          title: '结束踏查失败',
                                          content: '当前用户没有进行登录操作，请先登录',
                                          showCancel: false,
                                          success: function (res) {
                                            if (res.confirm) {//跳转到登录界面
                                              wx.navigateTo({
                                                url: '../index/index',
                                              })
                                            }
                                          }
                                        })
                                      } else if (endRes.data.retCode == '0') {

                                      }
                                    }
                                  })
                            
                              break;
                            }
                          }
                        }
                      }
                    });
                  }
                })
              }
            })
          } else {
            console.log('获取用户登录态失败！' + res.errMsg)
          }
        }
      });
    }else{//初次进入
      this.setData({ url: 'http://localhost:8080/loitplat_roadmanager/a/wx/treadCheckView?flag=1' })

    }
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

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