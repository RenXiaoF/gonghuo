// pages/order_management_add/index.js
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
    // 是否隐藏 modal
    empty_group_hiddenmodalput: true,
    store_id: "", // 供应商id

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

  // 年  月  日
  changeDate(e) {
    var that = this;
    this.setData({ date: e.detail.value });
  },
  changeDate1(e) {
    var that = this;
    this.setData({ date1: e.detail.value });
  },

  /** 打开弹窗  选择角色 */
  empty_group_modalinput: function () {
    var that = this;
    that.setData({
      empty_group_hiddenmodalput: !this.data.empty_group_hiddenmodalput,
    });
    return;
  },
  /** 取消按钮 选择角色 */
  empty_group_cancel: function () {
    this.setData({
      empty_group_hiddenmodalput: true,
    });
  },

  /** 切换 redioGroup 里面的 radio */
  radioChange: function (e) {
    this.data.store_id = e.detail.value;
  },
});
