// pages/order_management_detail/index.js
const app = getApp();
var setting = app.globalData.setting;
var request = app.request;
var common = require("../../utils/common.js");
var base64 = require("../../utils/base64");

Page({
  /**
   * 页面的初始数据
   */
  data: {
    // swper
    current: 0, // sw[er 的角标
    imgUrls: [
      "../../images/img1.png",
      "../../images/img1.png",
      "../../images/img1.png",
    ],
    //商品主页tab
    activeCategoryId: 0,
    categories: [
      { name: "基本信息", id: 0 },
      { name: "详情", id: 1 },
    ],
    inputNumber: "", // 输入的数量
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

    // if (options.activeCategoryId == "0") {
    //   // 动态修改页面标题
    //   wx.setNavigationBarTitle({
    //     title: "待发货详情",
    //   });
    // } else {
    //   // 动态修改页面标题
    //   wx.setNavigationBarTitle({
    //     title: "已发货详情",
    //   });
    // }

    // 3.1 本地取出临时缓存 输入的数量
    var inputNumber = wx.getStorageSync("inputNumber");
    if (inputNumber) {
      that.setData({ inputNumber: inputNumber });
    }
  },
  /**  2.1 本地临时缓存 输入的数量 */
  onInputNumber: function (e) {
    var value = e.detail.value;
    if (value) {
      wx.setStorageSync("inputNumber", value);
    }
  },
  /** swper 改变 */
  swperChange: function (e) {
    var that = this;
    if (e.detail.source == "touch") {
      that.setData({
        current: e.detail.current,
      });
    }
  },
  /** 切换 按钮 */
  tabClick: function (e) {
    var typeId = e.currentTarget.id;
    this.setData({
      activeCategoryId: typeId,
    });
    if (typeId == 1) {
      this.tabMaterialContent();
    }
  },
  /** 点击 第一个 */
  tabMaterialContent: function () {
    this.setData({ activeCategoryId: 1 });
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
