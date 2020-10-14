//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    show: false,
    option1: [
      { text: '事项类型', value: '事项' },
      { text: '会议', value: '会议' },
      { text: '课程', value: '课程' },
      { text: '娱乐', value: '娱乐' },
    ],
    value1: '事项',  // 上拉弹出框的选项value
    value: "",   // 输入框具体事项的value
    minHour: 10,
    maxHour: 20,
    minDate: new Date().getTime(),
    maxDate: new Date(2022, 10, 1).getTime(),
    currentDate: new Date().getTime(), // 时间选择器
    item: {
      type: '',
      deadline: '',
      text: ''
    },
    items: []
  },
  onLoad() {
    console.log("hello");
  },
  showPopup() {
    this.setData({ show: true });
  },

  onClose() {
    this.setData({ show: false });
  },

  // 下拉菜单选择事项类型
  onChange(value) {
    console.log(value)
    this.data.item.type = value.detail;
  },

  // 事项新增确认按钮
  onSubmit(value) {
    console.log(this.data.item.text + " 类型: " + this.data.item.type);
    this.data.items.push(this.data.item);
  },

  // 事项内容文本输入框
  onConfirm(value) {
    console.log("已确认");
    console.log(value.detail);
    this.data.item.text = value.detail;
  },

  // 时间选择器
  onInput(event) {
    this.setData({
      currentDate: event.detail,
    })
  }
})
