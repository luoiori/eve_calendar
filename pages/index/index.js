//index.js
//获取应用实例
const app = getApp()
const MONTHS = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May.', 'June.', 'July.', 'Aug.', 'Sept.', 'Oct.', 'Nov.', 'Dec.'];
Page({

  saveConf: function (event){
    console.log("save conf")
    var _m = wx.getStorageSync("_firstDate_month")
    var _d = wx.getStorageSync("_firstDate_day")
    if(_m){
      wx.setStorageSync("firstDate_month", _m)
    }
    if(_d){
      wx.setStorageSync("firstDate_day", _d)
    }
    wx.showToast({
      title: '修改成功',
      icon: 'success',
      duration: 1500
    })
  },
  dayClick: function (event) {
    wx.setStorageSync("_firstDate_month", event.detail.month)
    wx.setStorageSync("_firstDate_day", event.detail.day)
    const fisrtDate = new Date(event.detail.year, event.detail.month-1, event.detail.day);
    console.log("firstdate="+fisrtDate)
    let demo5_days_style = new Array;
    const days_count = new Date(event.detail.year, event.detail.month - 1, 0).getDate();
    for (let i = 1; i <= days_count; i++) {
      const date = new Date(event.detail.year, event.detail.month - 1, i);
      console.log(date)
      var diff = (date - fisrtDate) / (1000 * 60 * 60 * 24);
      var mod = diff % 9
      console.log(mod+"->"+(mod+9))
      if (mod<0){
        mod += 9
      }
      if (mod >= 0 && mod <= 2) {
        // 早
        demo5_days_style.push({ month: 'current', day: i, color: 'white', background: '#FFCC66' });
      } else if (mod >= 3 && mod <= 5) {
        demo5_days_style.push({ month: 'current', day: i, color: 'white', background: '#777777' });
      } else if (mod >= 6 && mod <= 8) {
        demo5_days_style.push({ month: 'current', day: i, color: 'white', background: '#FF6600' });
      }

    }
    this.setData({
      demo5_days_style
    });
  },
  data: {
    year: new Date().getFullYear(),      // 年份
    month: new Date().getMonth() + 1,    // 月份
    day: new Date().getDate(),
    str: MONTHS[new Date().getMonth()],  // 月份字符串
    lunar: true,  

    demo1_days_style: [],
    demo2_days_style: [],
    demo4_days_style: [],
    demo5_days_style: [],
    demo6_days_style: [],
  },
  onLoad: function (options) {
    // 假设2019-1-1是第0天
    var _m = 0
    var _d = 1
    

    var __m = wx.getStorageSync("firstDate_month")
    if(__m){
      _m = __m - 1
    }

    var __d = wx.getStorageSync("firstDate_day")
    if (__d) {
      _d = __d
    }
   
    var fisrtDate = new Date(2019, _m, _d)
    
    const days_count = new Date(this.data.year, this.data.month-1, 0).getDate();

    let demo5_days_style = new Array;
    for (let i = 1; i <= days_count; i++) {
      const date = new Date(this.data.year, this.data.month - 1, i);
      var diff = (date - fisrtDate) / (1000 * 60 * 60 * 24);
      var mod = diff % 9
      if (mod < 0){
        mod = mod + 9
      }
      if (mod >= 0 && mod <= 2){
        // 早
        demo5_days_style.push({ month: 'current', day: i, color: 'white', background: '#FFCC66' });
      } else if (mod >= 3 && mod <= 5){
        demo5_days_style.push({ month: 'current', day: i, color: 'white', background: '#777777' });
      } else if (mod >= 6 && mod <= 8) {
        demo5_days_style.push({ month: 'current', day: i, color: 'white', background: '#FF6600' });
      }

    }

    this.setData({
      demo5_days_style
    });

    let demo6_days_style = new Array;
    for (let i = 1; i <= days_count; i++) {
      const date = new Date(this.data.year, this.data.month - 1, i);
      if (i == 12) {
        demo6_days_style.push({
          month: 'current', day: i, color: 'white', background: '#b49eeb'
        });
      } else if (i == 17) {
        demo6_days_style.push({
          month: 'current', day: i, color: 'white', background: '#f5a8f0'
        });
      } else if (i == 21) {
        demo6_days_style.push({
          month: 'current', day: i, color: 'white', background: '#aad4f5'
        });
      } else if (i == 25) {
        demo6_days_style.push({
          month: 'current', day: i, color: 'white', background: '#84e7d0'
        });
      } else {
        demo6_days_style.push({
          month: 'current', day: i, color: 'black'
        });
      }
    }

    this.setData({
      demo6_days_style
    });

  },
  
})
