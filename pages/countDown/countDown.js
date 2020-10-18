// pages/base/base.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: false,
    currentDate: '12:00',
    minHour: 0,
    maxHour: 24,
    hours:0,
    minutes:0,
    seconds:0,
    h:0,
    m:0,
    timer:"time",
    countDownNum: "0",
    currentValue: "100",     
    value:0,
    tmp:0,
    step:10,
    stepcount:0
  },
  useradd(){
    var step=this.data.step;

    if (this.data.tmp<100){
      this.setData({
      tmp:this.data.tmp+step,
      
    });
    this.setData({
      value:this.data.tmp.toFixed(0)
    })
    }
    console.log(this.data.value)
  },
  showstep(){
    if (this.data.value>0){
      this.setData({
        value:0,
        tmp:0
      })
    }
  },
  onChangestep(event){
    this.setData({
      step:(100/event.detail)
    })
  },
  showPopup() {
    this.setData({ show: true });
  },
  onClose() {
    this.setData({ show: false });
  },
  onInput(event) {
    this.setData({
      currentDate: event.detail,
    });
  },
  onChange(picker){
    this.setData({
      h:picker.detail.getColumnValue(0),
      m:picker.detail.getColumnValue(1)
    });
  },
  onConfirm(event){
    
    this.setData({
      hours:this.data.h,
      minutes:this.data.m
    });
    this.onClose();
  },
   onDrag(event) {
    this.setData({
      currentValue: countDownNum ,
    });
  },  
   nonDrag(event) {
    this.setData({
      currentValue: event.detail.value ,
    });
  }, 
  
  startbut:function(options){
   
    if (this.data.countDownNum ==0 && (this.data.minutes>0 || this.data.hours>0)){
      this.countDown();
    }
    
  },
  endbut:function(options){
    clearInterval(this.data.timer);
    this.setData({
      hours:0,
      minutes:0,
      seconds:0,
      countDownNum:0,
      currentValue:100
    })
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
   
  },
  
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
    
  },
  countDown:function(){
    let that = this;
    let num=that.data.hours*60*60+that.data.minutes*60;
    let countDownNum = that.data.hours*60*60+that.data.minutes*60;
    let seconds=that.data.seconds;
    let minutes=that.data.minutes;
    let hours=that.data.hours;
    that.setData({
      timer: setInterval(function () {
        countDownNum--;
        
        if (seconds!=0) {
          seconds--;
        } else {
          if (minutes!=0) {
            minutes--;
            seconds=59;
          }else{
            hours--;
            minutes=59;
            seconds=59;
          }
        }
        that.setData({
          countDownNum: countDownNum,
          seconds:seconds,
          minutes:minutes,
          hours:hours,
          currentValue: (countDownNum/num*100).toFixed(1)
        })
        if (countDownNum <= 0) {
          clearInterval(that.data.timer);
        }
      }, 1000)
    })
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})