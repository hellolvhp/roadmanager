// pages/treadCheck/treadCheck.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: 'http://localhost:8080/loitplat_roadmanager/a/wx/treadCheckView'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.type=='2'){
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
                        console.info(runData);
                        if (runData.stepInfoList) {
                          runData.stepInfoList = runData.stepInfoList.reverse()
                          for (var i in runData.stepInfoList) {
                            runData.stepInfoList[i].date = util.formatTime(new Date(runData.stepInfoList[i].timestamp * 1000))
                          }
                          that.setData({ ranks: runData.stepInfoList });
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
    }
    options.url ? this.setData({ url: options.url }) : wx.navigateBack({ delta: 2 });
   
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