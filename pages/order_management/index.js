// pages/order_management/index.js
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
    //商品主页tab
    activeCategoryId: 0,
    categories: [
      { name: "待提交", id: 0, count: 10 },
      { name: "已提交", id: 1, count: 5 },
      { name: "全部", id: 2, count: 15 },
    ],
    pageidx: "1", // 页码

    Y: "", // 年
    M: "", // 月
    D: "", // 日

    // 时间选择器
    date: "",
    date1: "",
    time: "",
    dateTimeArray: null,
    dateTime: null,
    dateTimeArray1: null,
    dateTime1: null,
    startYear: 2000,
    endYear: 2050,

    // 1. 搜索
    addflag: true, //判断是否显示搜索框右侧部分
    addimg: "../../images/search.png",
    searchstr: "",
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
    // 年 月 日 时 分 秒
    var timpdate = new Date();
    that.data.Y = timpdate.getFullYear() + "-"; // 年
    that.data.M =
      (timpdate.getMonth() + 1 < 10
        ? "0" + (timpdate.getMonth() + 1)
        : timpdate.getMonth() + 1) + "-"; // 月
    that.data.D = timpdate.getDate() + " "; // 日
    that.setData({
      date: that.getBeforeDate(7),
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
  },
  /** 获取当前天数的前七天 @param n @returns {string|*} */
  getBeforeDate(n) {
    var n = n;
    var d = new Date();
    var year = d.getFullYear();
    var mon = d.getMonth() + 1;
    var day = d.getDate();
    if (day <= n) {
      if (mon > 1) {
        mon = mon - 1;
      } else {
        year = year - 1;
        mon = 12;
      }
    }
    d.setDate(d.getDate() - n);
    year = d.getFullYear();
    mon = d.getMonth() + 1;
    day = d.getDate();
    let s =
      year +
      "-" +
      (mon < 10 ? "0" + mon : mon) +
      "-" +
      (day < 10 ? "0" + day : day);
    return s;
  },

  /** ============================================搜索 开始================================ */
  // 搜索框右侧 事件
  addhandle(e) {
    var that = this;
    // console.log("触发搜索框右侧事件", e);
  },

  //搜索框输入时触发
  searchList(ev) {
    var that = this;
    var e = ev.detail.detail.value;

    that.setData({ searchstr: e });
  },
  //搜索回调
  endsearchList(e) {
    var that = this;
  },
  // 取消搜索
  cancelsearch() {
    var that = this;
    this.setData({ searchstr: "" });
  },
  //清空搜索框
  activity_clear(e) {
    // 获取 待送货列表
    var that = this;
    this.setData({ searchstr: "" });
  },
  /** ==============================================搜索  结束================================== */
  /** 1. tab  切换 按钮 */
  tabClick: function (e) {
    var typeId = e.currentTarget.id;
    this.setData({
      activeCategoryId: typeId,
    });
    if (typeId == 1) {
      this.tabMaterialContent();
    }
  },
  /** 2. tab  点击 第一个 */
  tabMaterialContent: function () {
    this.setData({ activeCategoryId: 1 });
  },
  /** ======================= 时间选择器 开始 ============================ */
  // 年  月  日
  changeDate(e) {
    var that = this;
    this.setData({ date: e.detail.value });
  },
  changeDate1(e) {
    var that = this;
    this.setData({ date1: e.detail.value });
  },

  /** ======================= 时间选择器  结束 ================================ */
  /** 页面上拉触底事件的处理函数 */
  onReachBottom: function () {
    var that = this;
    var num1 = Number(that.data.pageidx);
    num1 += num1;
    that.setData({
      pageidx: num1.toString(),
    });
    // if (load.canloadMore()) {

    // }
  },

  /** 取到商品添加  页面 */
  onGotoProductAdd: function () {
    wx.navigateTo({
      url: "/pages/order_management_add/index",
    });
  },
});
