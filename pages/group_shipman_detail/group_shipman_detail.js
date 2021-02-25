// pages/group_shipman_detail/group_shipman_detail.js
//获取应用实例
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
    //商品主页tab
    activeCategoryId: 0,
    categories: [
      { name: "基本信息", id: 0 },
      { name: "订单明细", id: 1 },
    ],
    types: 0, // 从group_ship_managment跳转过来的通道号
  },

  /** 生命周期函数--监听页面显示 */
  onShow: function (options) {
    var that = this;
    // 获取当前小程序的页面栈
    let pages = getCurrentPages();
    // 数组中索引最大的页面--当前页面
    let currentPage = pages[pages.length - 1];
    // 打印出当前页面中的 options
    options = currentPage.options;
    console.log("group_shipman_detail:onshow", options);
    that.setData({types: options.types});
    if (options.types == '0') {
      // 动态修改页面标题
      wx.setNavigationBarTitle({
        title: "待发货详情",
      });
    }
    if(options.types == '1') {
      // 动态修改页面标题
      wx.setNavigationBarTitle({
        title: "待收货详情",
      });
    }
    if(options.types == '2') {
      // 动态修改页面标题
      wx.setNavigationBarTitle({
        title: "已收货详情",
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

  /** 去到 新建发货单 */
  gotoAddDispachNew: function () {
    wx.navigateTo({
      url: "/pages/ship_mana_add/ship_mana_add",
    });
  },
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
