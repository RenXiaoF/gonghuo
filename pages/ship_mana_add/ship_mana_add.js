// pages/ship_mana_add/ship_mana_add.js
var app = getApp();
var request = app.request;
var setting = app.globalData.setting;
var util = require("../../utils/util.js");
var dateTimePicker = require("../../utils/dateTimePicker.js");
var common = require("../../utils/common.js");
var base64 = require("../../utils/base64");
import LoadMore from "../../utils/LoadMore.js";
var load = new LoadMore();

Page({
  /** 页面的初始数据 */
  data: {
    inputNumber: "", // 输入的数量
    inputDes: "", // 输入的描述
  },

  /** 生命周期函数--监听页面加载 */
  onLoad: function (options) {},

  /** 生命周期函数--监听页面显示 */
  onShow: function (options) {
    var that = this;
    // 获取当前小程序的页面栈
    let pages = getCurrentPages();
    // 数组中索引最大的页面--当前页面
    let currentPage = pages[pages.length - 1];
    // 打印出当前页面中的 options
    options = currentPage.options;

    // 3.1 本地取出临时缓存 输入的数量
    var inputNumber = wx.getStorageSync("inputNumber");
    if (inputNumber) {
      that.setData({ inputNumber: inputNumber });
    }
    // 3.1 本地取出临时缓存 输入的描述
    var inputDes = wx.getStorageSync("inputNumber");
    if (inputDes) {
      that.setData({ inputDes: inputDes });
    }
  },

  /**  2.1 本地临时缓存 输入的数量 */
  onInputNumber: function (e) {
    var value = e.detail.value;
    if (value) {
      wx.setStorageSync("inputNumber", value);
    }
  },
  /**  2.1 本地临时缓存 输入的描述 */
  onInputDes: function (e) {
    var value = e.detail.value;
    if (value) {
      wx.setStorageSync("inputDes", value);
    }
  },

  /** 生命周期函数--监听页面初次渲染完成 */
  onReady: function () {},

  /** 生命周期函数--监听页面隐藏 */
  onHide: function () {},

  /** 生命周期函数--监听页面卸载 */
  onUnload: function () {},

  /** 页面相关事件处理函数--监听用户下拉动作 */
  onPullDownRefresh: function () {},

  /** 页面上拉触底事件的处理函数 */
  onReachBottom: function () {},

  /** 用户点击右上角分享 */
  onShareAppMessage: function () {},
});
