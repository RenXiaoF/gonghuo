// pages/shipping_management/shipping_management.js
//获取应用实例
var app = getApp();
var request = app.request;
var setting = app.globalData.setting;
var util = require("../../utils/util.js");
var dateTimePicker = require("../../utils/dateTimePicker.js");
var common = require("../../utils/common.js");
var base64 = require("../../utils/base64");
import LoadMore from "../../utils/LoadMore.js";
var load = new LoadMore();
// 选择图片
import { promisify } from "../../utils/promise.util";
import { $init, $digest } from "../../utils/common.util";

const wxUploadFile = promisify(wx.uploadFile);

Page({
  /** 页面的初始数据 */
  data: {
    //商品主页tab
    activeCategoryId: 0,
    categories: [
      { name: "待发货", id: 0, count: 10 },
      { name: "已发货", id: 1, count: 10 },
      { name: "全部", id: 2, count: 20 },
    ],
    authUserList: [
      { name: "广东省广州市衣链云科技公司" },
      { name: "广东省广州市衣链云科技公司1" },
    ],
    title3: "广东省广州市衣链云科技公司",
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

    /** 1. 选择图片 变量 */
    content: "",
    images: [],
    /** 扫描二维码 */
    scanCodeMsg: "", // 扫描二维码的信息
  },

  /** 生命周期函数--监听页面加载 */
  onLoad: function (options) {},

  /** 生命周期函数--监听页面显示 */
  onShow: function (options) {
    var that = this;
    // 1.1 选择图片 初始化
    $init(this);

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

  /** 1. tab 切换 按钮 */
  tabClick: function (e) {
    var typeId = e.currentTarget.id;
    this.setData({
      activeCategoryId: typeId,
    });
    if (typeId == 1) {
      this.tabMaterialContent();
    }
  },
  /** 2. tab 点击 第一个 */
  tabMaterialContent: function () {
    this.setData({ activeCategoryId: 1 });
  },

  /** 2. 选择图片 -- 选择本地图片 或者 调用相机 */
  chooseImage(e) {
    wx.chooseImage({
      sizeType: ["original", "compressed"], //可选择原图或压缩后的图片
      sourceType: ["album", "camera"], //可选择性开放访问相册、相机
      success: (res) => {
        const images = this.data.images.concat(res.tempFilePaths);
        // 限制最多只能留下5张照片
        this.data.images = images.length <= 2 ? images : images.slice(0, 2);
        $digest(this);
        if (this.data.images.length > 0) {
          // console.log('上传图片');
          this.updatePicture();
        }
      },
    });
  },
  /** 3. 选择图片-- 删除 */
  removeImage(e) {
    const idx = e.target.dataset.idx;
    this.data.images.splice(idx, 1);
    $digest(this);
  },
  /** 4. 选择图片 -- 预览图片 */
  handleImagePreview(e) {
    const idx = e.target.dataset.idx;
    const images = this.data.images;
    wx.previewImage({
      current: images[idx], //当前预览的图片
      urls: images, //所有要预览的图片
    });
  },

  /** 扫面二维码 */
  scanCode: function () {
    var that = this;
    wx.scanCode({
      // 扫描API
      onlyFromCamera: true,
      scanType: ["qrCode", "barCode", "datamatrix", "pdf417"],
      success: (res) => {
        // 扫描成功
        console.log(res); //输出回调信息
        that.setData({
          scanCodeMsg: res.result,
        });
        wx.showToast({
          title: "成功",
          duration: 1000,
        });
      },
      fail: () => {},
      complete: () => {},
    });
  },

  /** ===========================搜索 开始=========================== */
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
  /** ============================搜索  结束=========================== */

  /** 生命周期函数--监听页面隐藏 */
  onHide: function () {},

  /** 生命周期函数--监听页面卸载 */
  onUnload: function () {},

  /** 页面相关事件处理函数--监听用户下拉动作 */
  onPullDownRefresh: function () {},

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

  /** 用户点击右上角分享 */
  onShareAppMessage: function () {},


    /** 去到 搜索供应商 */
    goToSearchStore: function () {
      var that = this;
      wx.navigateTo({
        url:
          "/pages/search_store/search_store?goto1=2&store_id=" +
          that.data.store_id,
      });
    },
    /** 返回上一级页面 */
    onUnload: function (e) {
      wx.navigateBack({
        delta: 2, // 返回上一级页面。
      });
    },

});
