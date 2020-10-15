//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    active: 0, // 标签页选择
    activeName: '1', // 折叠面板
    show: false, // 弹出层控制
    option1: [
      { text: '事项类型', value: '事项' },
      { text: '会议', value: '会议' },
      { text: '课程', value: '课程' },
      { text: '娱乐', value: '娱乐' },
    ],
    value1: '事项',  // 上拉弹出框的选项
    value: "",   // 输入框具体事项的value
    minHour: 10,
    maxHour: 20,
    minDate: new Date(2018, 10, 1).getTime(),
    maxDate: new Date(2022, 10, 1).getTime(),
    currentDate: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 
            new Date().getHours(), new Date().getMinutes(), 0, 0).getTime(), // 时间选择器
    item: {
      type: '',
      startTime: new Date(),
      endTime: new Date(),
      startString: '',
      endString: '',
      text: ''
    },
    items: []
  },

  onLoad() {
    console.log("Index loading...");
    console.log(this.data.item.currentDate);
  },

  // 标签页切换
  onChangeTabs(event) {
    wx.showToast({
      title: `切换到标签 ${event.detail.name}`,
      icon: 'none',
    });
  },

  // 构建手风琴式折叠面板
  onCollapseChange(event) {
    this.setData({
      activeName: event.detail,
    });
  },

  // 删除事项按钮
  deleteItem() {
    if (this.data.items.length == 0) return false;
    var toDel = this.data.activeName-1;
    this.data.items.splice(toDel, 1);
    this.setData({items: this.data.items});
  },

  // 新增事项按钮, 打开底部弹出层
  showPopup() {
    this.setData({ show: true });
  },

  // 关闭底部弹出层
  onClose() {
    this.setData({ show: false });
  },

  // 以下是事项排序功能
  // 按照类型排序
  sortByType() {
    this.data.items.sort((a, b) => a.type.localeCompare(b.type,'zh-CN'));
    this.setData({items: this.data.items});
  },

  // 按照时间先后排序
  sortByEarly() {
    this.data.items.sort((a, b) => a.startTime.getTime()-b.startTime.getTime());
    this.setData({items: this.data.items});
  },

  // 按照时长排序
  sortByDuration() {
    this.data.items.sort( (a, b) => 
      (a.endTime.getTime()-a.startTime.getTime())-(b.endTime.getTime()-b.startTime.getTime())
    );
    this.setData({items: this.data.items});
  },

  // 以下为弹出层内的功能
  // 下拉菜单选择事项类型
  onChange(value) {
    this.data.item.type = value.detail;
  },

  // 事项起始时间
  onConfirmStart(value) {
    this.data.item.startTime = new Date(value.detail);
    console.log(this.data.item.startTime);
  },

  // 事项结束时间
  onConfirmEnd(value) {
    this.data.item.endTime = new Date(value.detail);
  },

  // 事项新增确认按钮
  onSubmit(value) {
    if (this.data.item.startTime.getTime() > this.data.item.startTime.getTime()) {
      wx.showToast({title:'时间输入有误', icon:'none'});
      return false;
    }
    this.setData({item: this.data.item});
    var startTimeString = this.data.item.startTime.toTimeString();
    var endTimeString = this.data.item.endTime.toTimeString();
    var pos1 = startTimeString.search("GMT");
    var pos2 = endTimeString.search("GMT");
    startTimeString = startTimeString.substring(0,pos1-4);
    endTimeString = endTimeString.substring(0,pos2-4);
    this.data.items.push({
      type: this.data.item.type,
      startTime: this.data.item.startTime,
      endTime: this.data.item.endTime,
      startString: startTimeString,
      endString: endTimeString,
      text: this.data.item.text
    });
    this.setData({items: this.data.items});
    this.onClose();
  },

  // 事项内容文本输入框
  onConfirm(value) {
    this.data.item.text = value.detail;
  },

  // 时间选择器
  onInput(event) {
    this.setData({
      currentDate: event.detail,
    })
  }
})
