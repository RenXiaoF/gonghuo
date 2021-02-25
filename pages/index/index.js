//index.js
import echarts from "../../ec-canvas/echarts.js";
//获取应用实例
const app = getApp();
var setting = app.globalData.setting;
var request = app.request;
var common = require("../../utils/common.js");
var base64 = require("../../utils/base64");
import websocket from "./../../utils/wechat-websocket.js";
import wxCharts from "../../utils/wxcharts-min.js";

// pie 并状图
function initChart(canvas, width, height, dpr) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr, // new
  });
  canvas.setChart(chart);

  var option = {
    backgroundColor: "#ffffff",
    color: ["#37A2DA", "#32C5E9", "#67E0E3", "#91F2DE", "#FFDB5C", "#FF9F7F"],
    // 提示工具
    tooltip: {
      trigger: "item",
      formatter: "{b} : {c} ({d}%)",
    },
    // 图例
    legend: {
      orient: "vertical",
      left: "top",
      data: ["标准订单", "延时订单", "杭州", "广州", "上海"],
    },
    series: [
      {
        label: {
          normal: {
            position: "inner", // 提示文字在内部
            // position:'external', // 提示文字在外部
            // show: false, // 隐藏 提示文字
            fontSize: 14,
          },
        },
        type: "pie",
        center: ["50%", "50%"],
        // radius: ["40%", "60%"],
        data: [
          {
            value: 55,
            name: "标准订单",
          },
          {
            value: 20,
            name: "延时订单",
          },
          {
            value: 10,
            name: "杭州",
          },
          {
            value: 20,
            name: "广州",
          },
          {
            value: 38,
            name: "上海",
          },
        ],
      },
    ],
  };

  chart.setOption(option);
  return chart;
}
// bar 柱状图
let chart = null;
function initChart1(canvas, width, height, dpr) {
  chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr, // new
  });
  canvas.setChart(chart);

  var option = {
    title: {
      text: "制式反单次数排行",
      subtext: "",
    },
    tooltip: {
      trigger: "axis",
    },
    legend: {
      x: "center",
      y: "bottom",
      data: ["返单数1", "返单数2"],
    },
    xAxis: [
      {
        type: "category",
        data: ["1月", "2月", "3月"],
      },
    ],
    yAxis: [
      {
        type: "value",
      },
    ],
    series: [
      {
        name: "返单数1",
        type: "bar",
        label: { normal: { show: true, position: "top", fontSize: 15 } },
        data: [20, 49, 70],
      },
      {
        name: "返单数2",
        type: "bar",
        label: { normal: { show: true, position: "top", fontSize: 15 } },
        data: [26, 59, 90],
      },
    ],
  };

  chart.setOption(option);
  return chart;
}

Page({
  data: {
    // swper
    imgUrls: [
      '../../images/swiper.png',
      '../../images/swiper.png',
      '../../images/swiper.png'
    ],
    //商品主页tab
    activeCategoryId: 0,
    categories: [
      { name: "订单排行", id: 0 },
      { name: "生产监控", id: 1 },
    ],

    pie1: {
      onInit: initChart,
    },
    bar: {
      onInit: initChart1,
    },

    // 登陆类型
    // loginType: "自主下单",
    loginType: "集团工厂",
  },

  onLoad: function () {
    // 环状图 1
    new wxCharts({
      animation: true,
      canvasId: "ringCanvas1",
      type: "ring",
      extra: {
        ringWidth: 2,
        pie: {
          offsetAngle: -45,
        },
      },
      title: {
        name: "35%",
        color: "#333333",
        fontSize: 15,
      },
      subtitle: {
        name: "",
        color: "#",
        fontSize: 0,
      },
      series: [
        {
          name: "成交量1",
          data: 15,
          stroke: false,
        },
        {
          name: "成交量2",
          data: 35,
          stroke: false,
        },
      ],
      disablePieStroke: true,
      width: 100,
      height: 100,
      dataLabel: false,
      legend: false,
      padding: 0,
    });
    // 环状图 2
    new wxCharts({
      animation: true,
      canvasId: "ringCanvas2",
      type: "ring",
      extra: {
        ringWidth: 2,
        pie: {
          offsetAngle: -45,
        },
      },
      title: {
        name: "40%",
        color: "#333333",
        fontSize: 15,
      },
      subtitle: {
        name: "",
        color: "",
        fontSize: 0,
      },
      series: [
        {
          name: "成交量1",
          data: 15,
          stroke: false,
        },
        {
          name: "成交量2",
          data: 35,
          stroke: false,
        },
      ],
      disablePieStroke: true,
      width: 100,
      height: 100,
      dataLabel: false,
      legend: false,
      padding: 0,
    });
    // 环状图 3
    new wxCharts({
      animation: true,
      canvasId: "ringCanvas3",
      type: "ring",
      extra: {
        ringWidth: 2,
        pie: {
          offsetAngle: -45,
        },
      },
      title: {
        name: "20%",
        color: "#333333",
        fontSize: 15,
      },
      subtitle: {
        name: "",
        color: "",
        fontSize: 0,
      },
      series: [
        {
          name: "成交量1",
          data: 15,
          stroke: false,
        },
        {
          name: "成交量2",
          data: 35,
          stroke: false,
        },
      ],
      disablePieStroke: true,
      width: 100,
      height: 100,
      dataLabel: false,
      legend: false,
      padding: 0,
    });
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

  onReady() {},
});
