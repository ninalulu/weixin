const app = getApp()

Page({
  data: {
    newlist: {},//新闻列表
    thispage: 1,//设置当前页数为第一页
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    var that = this
    // 获取当前页新闻列表
    wx.request({
      url: "https://www.apiopen.top/satinApi",
      data: {
        type: 41 //获取type为10的新闻
      },
      success: function (e) {
        that.setData({
          newlist: e.data["data"]
        })
      }
    })
  },
  // 上拉加载新页面
  onReachBottom: function () {
    var that = this
    // 上拉刷新进入下一页，当前页++
    that.setData({
      page: ++that.data.thispage
    })
    console.log(that.data.thispage)
    wx.request({
      url: "https://www.apiopen.top/satinApi",
      data: {
        type: 41,//获取type为10的新闻
        page: that.data.thispage
      },
      success: function (e) {
        // console.log(e.data["data"]);
        //让当前页面的新闻列表+上拉加载的新闻列表
        that.setData({
          newlist: that.data["newlist"].concat(e.data["data"])
        })
      }
    })
  },
  // 下拉刷新调用Onload函数
  onPullDownRefresh: function () {
    this.onLoad();
  },
  // 转发分享
  onShareAppMessage: function () {
    return {
      title: "游戏",
      path: "page/listb/listb",

    }
  }
})