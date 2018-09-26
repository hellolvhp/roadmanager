// pages/problemDispatch/problemDispatch.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    problemtitle: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    app.scan();
    wx.login({
      success:function (resLogin){
        if (resLogin.code) {
          wx.getLocation({
            type: 'wgs84',
            success: function(res) {
              wx.request({
                url: app.globalData.serviceUrl + '/a/wx/problemDispatchPre',
                data: {
                  code: resLogin.code,
                  lat: res.latitude,
                  lon: res.longitude
                },
                success:function(ret){
                  if (ret.data.retCode=='0'){
                    that.setData({ problemtitle: ret.data.t })
                    console("ret.data.t", ret.data.t)
                  }else if(ret.data.retCode=='1'){
                    //需要重新获取openId
                    wx.request({
                      url: 'http://localhost:8080/loitplat_roadmanager/a/wx/getLoginInfo',
                      data: {
                        code: resLogin.code
                      }
                    })
                  }
                }
              })
            },
          })
        }
      }
    })
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