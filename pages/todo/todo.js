
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date:'',
    array:[],
    show: false,
    pro:[],
    ptime:[],
    ntime:[],
    positiveSum:0,
    nagetiveSum:0,
    count:1,
    persentage:0,
    totalday:100,
    activeNames: ['1'],
  },
  add(){
    this.data.array.push(this.data.count);
    this.data.ptime.push(0);
    this.data.ntime.push(0)
    this.setData({
      array: this.data.array,
      count:this.data.count+1
    });

  },
  onBlur1(event){
    if (event.detail.value=="") {
      this.data.ptime[parseInt(event.target.id)-1]= "0"
    } else {
      this.data.ptime[parseInt(event.target.id)-1]= event.detail.value;
    }
    console.log(this.data.ptime)
  },
  onBlur2(event){
    if (event.detail.value=="") {
      this.data.ntime[parseInt(event.target.id)-1]= "0"
    } else {
      this.data.ntime[parseInt(event.target.id)-1]= event.detail.value;
    }
    
    console.log(this.data.ntime)
  },
  onBlur3(event){
    this.setData({totalday:event.detail.value})
  },
  cal(){
    let nagetiveSum=this.data.nagetiveSum;
    let positiveSum=this.data.positiveSum;
    let totalday=this.data.totalday;
   for (let i of this.data.ntime) {
     nagetiveSum=nagetiveSum+parseInt(i)
   }
   for (let i of this.data.ptime) {
     positiveSum=positiveSum+parseInt(i)
   }
   var ntmp=nagetiveSum-totalday;
   var ptmp=totalday-positiveSum;
   if (ntmp<=0 ) {
     this.setData({persentage:100})
   } else {
     if (ptmp<=0) {
       this.setData({persentage:0})
     } else {
       this.setData({
       persentage:  ((totalday/nagetiveSum+(ntmp/nagetiveSum)*ptmp/totalday)*100).toFixed(0)
       })
     }
   }

  },
  onChange(event) {
    this.setData({
      activeNames: event.detail,
    });
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