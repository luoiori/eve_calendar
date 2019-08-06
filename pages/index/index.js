//index.js
//获取应用实例
const app = getApp()
const MONTHS = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May.', 'June.', 'July.', 'Aug.', 'Sept.', 'Oct.', 'Nov.', 'Dec.'];
Page({
  saveConf: function (e){
    console.log("save conf")
    var _m = wx.getStorageSync("_firstDate_month")
    var _d = wx.getStorageSync("_firstDate_day")
    var _y = wx.getStorageSync("_firstDate_year")
    var key = _y+"_"+_m+"_"+_d
    // 保存到服务器
    var openid = wx.getStorageSync("openid")
    if(openid){
      wx.request({
        url: 'https://redis.eveve.cc/set/' + openid + "/" + key,
        success: function (res){
          console.log(res.data)
        }
      })
    }
    
    if(_m){
      wx.setStorageSync("firstDate_month", _m)
    }
    if(_d){
      wx.setStorageSync("firstDate_day", _d)
    }
    if (_y) {
      wx.setStorageSync("firstDate_year", _y)
    }
    wx.showToast({
      title: '修改成功',
      icon: 'success',
      duration: 1500
    })
  },
  dayClick: function (event) {
    console.log(event.detail)
    wx.setStorageSync("_firstDate_month", event.detail.month)
    wx.setStorageSync("_firstDate_day", event.detail.day)
    wx.setStorageSync("_firstDate_year", event.detail.year)
    const fisrtDate = new Date(event.detail.year, event.detail.month-1, event.detail.day);
    console.log("firstdate="+fisrtDate)
    let demo5_days_style = new Array;
    const days_count = new Date(event.detail.year, event.detail.month - 1, 0).getDate();
    for (let i = 1; i <= days_count; i++) {
      const date = new Date(event.detail.year, event.detail.month - 1, i);
      var diff = (date - fisrtDate) / (1000 * 60 * 60 * 24);
      var mod = diff % 9
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
    // 判断有没有openid
    var openid = wx.getStorageSync("openid")
    if(!openid){
      wx.login({
        success(res) {
          console.log(res.code)
          if (res.code) {
            wx.request({
              url: 'https://redis.eveve.cc/openid',
              data: { code: res.code },
              method: 'POST',
              header: {
                'content-type': 'application/json'
              },
              success: function (res) {
                if (res.statusCode == 200) {
                  console.log("openid="+res.date)
                  wx.setStorageSync('openid', res.data)
                } else {
                  console.log(res.errMsg)
                }
              },
            })
          } else {
            console.log('登录失败！' + res.errMsg)
          }
        }
      })
    }

    // 假设2019-1-1是第0天
    var _m = 0
    var _d = 1
    var _y = 2019
    var reqSuccess = false;
    if(openid){
      wx.request({
        url: 'https://redis.eveve.cc/get/' + openid,
        success: function(res){
          if (res.data!=""){
            console.log(res.data)
            var datas=res.data.split("_")
            _y = datas[0]
            _m = datas[1]
            _d = datas[2]
            reqSuccess = true
          }
        }
      })
    }

    if(!reqSuccess){
      var __m = wx.getStorageSync("firstDate_month")
      if(__m){
        _m = __m - 1
      }

      var __d = wx.getStorageSync("firstDate_day")
      if (__d) {
        _d = __d
      }

      var __y = wx.getStorageSync("firstDate_year")
      if (__y) {
        _y = __y
      }
    }
    var fisrtDate = new Date(_y, _m, _d)
    
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
