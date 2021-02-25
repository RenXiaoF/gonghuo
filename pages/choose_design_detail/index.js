// pages/choose_design-detail/index.js
Page({

  /** 页面的初始数据 */
  data: {
    isShow: false,
    showReject: false,
    showReceive: false,
    activeCategoryId: 0,
    categories: [
      { name: "基础信息", id: 0 },
      { name: "更多信息", id: 1 },
    ]
  },
  /** 生命周期函数--监听页面加载 */
  onLoad: function (options) {
    var tabId = options.tabId
    var that = this
    if(tabId == 0){
      wx.setNavigationBarTitle({
        title: '待接收详情'
      })
      that.setData({ isShow:true}) 

    }else if(tabId == 1){
      wx.setNavigationBarTitle({
        title: '已通过详情'
      })
      that.setData({showReject: true, isShow:false}) 

    }else if(tabId == 2){
      wx.setNavigationBarTitle({
        title: '已拒绝详情'
      })
      that.setData({showReceive: true, isShow:false}) 
    }else{
      that.setData({showReject: false,showReceive: false,isShow:false}) 
    }
  },
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
   
})