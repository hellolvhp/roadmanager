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
    var that = this
    wx.request({
      url: 'http://localhost:8080/loitplat_roadmanager/a/wx/getTreadCheckRank',
      success: function (res) {
        if (res.data.retCode=='0'){
          that.setData({ranks:res.data.tList})
        }else{
          wx.showToast({
            title: res.data.retMsg,
            icon: 'none',
            duration: 2000
          })
        }
      }
    }) 
    //1、调用小程序API:wx.login获取code和sessionKey；
    
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