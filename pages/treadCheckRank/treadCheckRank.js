// pages/treadCheckRank/treadCheckRank.js
const util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ranks:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // var that = this
    // wx.request({
    //   url: 'http://localhost:8080/loitplat_roadmanager/a/wx/getTreadCheckRank',
    //   success: function (res) {
    //     if (res.data.retCode=='0'){
    //       that.setData({ranks:res.data.tList})
    //     }else{
    //       wx.showToast({
    //         title: res.data.retMsg,
    //         icon: 'none',
    //         duration: 2000
    //       })
    //     }
    //   }
    // }) 
    //1、调用小程序API:wx.login获取code和sessionKey；
    var that = this;
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
                  console.info(resRun);
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
                      console.log("resDecrypt", resDecrypt.data.t);
                      var runData = JSON.parse(resDecrypt.data.t)
                      var currentStep;
                      if (runData.stepInfoList) {
                        runData.stepInfoList = runData.stepInfoList.reverse()
                        var currentDate = util.formatTime(new Date()).substring(0, 10)
                        var latitude, longitude;

                        for (var i in runData.stepInfoList) {
                          runData.stepInfoList[i].date = util.formatTime(new Date(runData.stepInfoList[i].timestamp * 1000))
                          console.log('获取用户登录态失败！' + runData.stepInfoList[i].date)
                          console.log("currentDate", currentDate)
                          if (runData.stepInfoList[i].date.substring(0, 10) == currentDate){
                            wx.getLocation({
                              type:'wgs84',
                              success: function(res) {
                                latitude = res.latitude
                                longitude = res.longitude
                                console.log("lat",latitude)
                                console.log("lon", longitude)
                              },
                            })
                            currentStep = runData.stepInfoList[i].step;
                            that.setData({ url: 'http://localhost:8080/loitplat_roadmanager/a/wx/startTreadCheck?currentStep=' + currentStep+'&lat='+latitude+'&lon='+longitude });
                            break;

                          }
                        }
                        // that.setData({ ranks: runData.stepInfoList });
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