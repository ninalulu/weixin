//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    newlist:{},//新闻列表
    thispage:1 ,//设置当前页数为第一页
    banner: [
      { image: "/img/banner1.jpg" },
      { image: "/img/banner2.jpg" },
      { image: "/img/banner3.jpg" }
    ],
    indicatorDots: true,
    autoplay: false,
    interval: 5000,
    duration: 1000
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log(1111);
    var that = this;
    var bannerImg =["../img/banner1.jpg","img/banner2.jpg","/img/banner3.jpg"];
     
    // 获取轮播图图片
    // wx.request({
      // url: "https://www.apiopen.top/satinApi?type=1&page=1",
      // data:{
         
      // }
      // success:function(e){
      //   console.log(e.data["data"]);
      //   that.setData({
      //     banners: e.data["data"]
      //   })
      // }
    // }),
    // 获取当前页的新闻列表
      wx.request({
        url: "https://www.apiopen.top/satinApi",
        data: {
        },
        success: function (e) {
          // console.log(e.data["data"]);
          that.setData({
            newlist: e.data["data"]
          })
        }
      })
  },
  // 上拉加载新页面
  onReachBottom:function(){
    var that = this
    // 上拉刷新进入下一页，当前页++
    that.setData({
      page:++that.data.thispage
    })
    console.log(that.data.thispage)
    wx.request({
      url: "https://www.apiopen.top/satinApi",
      data: {
        page:that.data.thispage
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
  onPullDownRefresh:function(){
    this.onLoad();
  },
  // 转发分享
  onShareAppMessage:function(){
    return{
      title:"生活乐趣",
      path:"page/index/index",

    }
  }
})
 