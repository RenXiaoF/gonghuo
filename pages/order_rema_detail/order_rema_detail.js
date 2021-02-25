// pages/order_rema_detail/order_rema_detail.js
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
      // { name: "更多", id: 2 },
    ],

    Y: "", // 年
    M: "", // 月
    D: "", // 日

    // 时间选择器
    date: "请选择>",
    date1: "",
    time: "",
    dateTimeArray: null,
    dateTime: null,
    dateTimeArray1: null,
    dateTime1: null,
    startYear: 2000,
    endYear: 2050,

    inputNumber: "", // 输入的数量
    inputDes: "", // 输入的描述
  },

  /** 生命周期函数--监听页面加载 */
  onLoad: function () {},

  /** 生命周期函数--监听页面显示 */
  onShow: function (options) {
    var that = this;
    // 年 月 日 时 分 秒
    var timpdate = new Date();
    that.data.Y = timpdate.getFullYear() + "-"; // 年
    that.data.M =
      (timpdate.getMonth() + 1 < 10
        ? "0" + (timpdate.getMonth() + 1)
        : timpdate.getMonth() + 1) + "-"; // 月
    that.data.D = timpdate.getDate() + " "; // 日
    that.setData({
      // date: that.getBeforeDate(7),
      date: that.data.Y + that.data.M + that.data.D,
      date1: that.data.Y + that.data.M + that.data.D,
    });
    // 1.获取完整的年月日 时分秒，以及默认显示的数组
    var obj = dateTimePicker.dateTimePicker(
      this.data.startYear,
      this.data.endYear
    );
    var obj1 = dateTimePicker.dateTimePicker(
      this.data.startYear,
      this.data.endYear
    );
    // 3.数据赋值
    this.setData({
      dateTime: obj.dateTime,
      dateTimeArray: obj.dateTimeArray,
      dateTimeArray1: obj1.dateTimeArray,
      dateTime1: obj1.dateTime,
    });

    // 获取当前小程序的页面栈
    let pages = getCurrentPages();
    // 数组中索引最大的页面--当前页面
    let currentPage = pages[pages.length - 1];
    // 打印出当前页面中的 options
    options = currentPage.options;

    console.log("ship_mane_detail:onshow", options);
    if (options.activeCategoryId == "0") {
      // 动态修改页面标题
      wx.setNavigationBarTitle({
        title: "待接单详情",
      });
    } else {
      // 动态修改页面标题
      wx.setNavigationBarTitle({
        title: "已接单详情",
      });
    }
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
   /** ======================= 时间选择器 开始 ============================ */
  // 年  月  日
  changeDate(e) {
    var that = this;
    this.setData({ date: e.detail.value });
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
