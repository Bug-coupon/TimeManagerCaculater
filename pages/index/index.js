//index.js
//获取应用实例
import * as echarts from '../../ec-canvas/echarts';

var app = getApp();

Page({
  data: {
    motto: 'Hello World',
    active: 0, // 标签页选择
    activeName: '0', // 折叠面板
    show: false, // 弹出层控制
    
    // 类型: 上课, 会议, 休闲, 睡眠, 饮食, 学习, 活动, 实习, 健身
    option1: [
      { text: '事项类型', value: '事项' },
      { text: '会议', value: '会议' },
      { text: '上课', value: '上课' },
      { text: '休闲', value: '休闲' },
      { text: '睡眠', value: '睡眠'},
      { text: '饮食', value: '饮食'},
      { text: '学习', value: '学习'},
      { text: '活动', value: '活动'},
      { text: '实习', value: '实习'},
      { text: '健身', value: '健身'}
    ],
    value1: '事项',  // 上拉弹出框的选项
    value: "",   // 输入框具体事项的value
    minHour: 10,
    maxHour: 20,
    minDate: new Date(2018, 10, 1).getTime(),
    maxDate: new Date().getTime(),
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
    items: [],
    iconMap: {
      '会议': '/icons/meeting.png',
      '上课': '/icons/course.png',
      '休闲': '/icons/leisure.png',
      '睡眠': '/icons/sleep.png',
      '饮食': '/icons/meal.png',
      '学习': '/icons/study.png',
      '活动': '/icons/activity.png',
      '实习': '/icons/intern.png',
      '健身': '/icons/exercise.png'
    }
  },

  onShareAppMessage: function (res) {
    return {
      title: 'ECharts 可以在微信小程序中使用啦！',
      path: '/pages/index/index',
      success: function () { },
      fail: function () { }
    }
  },// 绘图

  onLoad() {
    
    // 饼图 测试代码 开始
    /*
    this.data.items.push({
      type: '上课',
      startTime: new Date(2020, 9, 14, 10, 0, 0, 0),
      endTime: new Date(2020, 9, 14, 15, 20, 0, 0),
    }, {
      type: '会议',
      startTime: new Date(2020, 9, 12, 15, 0, 0, 0),
      endTime: new Date(2020, 9, 12, 18, 20, 0, 0),
    }, {
      type: '睡眠',
      startTime: new Date(2020, 9, 12, 23, 0, 0, 0),
      endTime: new Date(2020, 9, 13, 10, 20, 0, 0),
    }, {
      type: '健身',
      startTime: new Date(2020, 9, 17, 21, 0, 0, 0),
      endTime: new Date(2020, 9, 17, 23, 20, 0, 0),
    }, {
      type: '睡眠',
      startTime: new Date(2020, 9, 14, 23, 0, 0, 0),
      endTime: new Date(2020, 9, 15, 10, 20, 0, 0),
    },{
      type: '休闲',
      startTime: new Date(2020, 9, 15, 20, 0, 0, 0),
      endTime: new Date(2020, 9, 17, 15, 20, 0, 0),
    }, {
      type: '上课',
      startTime: new Date(2020, 9, 14, 20, 0, 0, 0),
      endTime: new Date(2020, 9, 15, 20, 20, 0, 0),
    });
    this.setData({items: this.data.items});
    // 饼图测试代码 结束
      */
  },

  // 标签页切换
  onChart() {
    app.globalData.itemList = this.data.items;
    if (this.data.items.length == 0) {
      wx.showToast({
        title: '事项列表为空',
        icon: "none"
      });
    } else {
        wx.navigateTo({
          url: '/pages/index/chart2/chart2',
        });
    }
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
    console.log(this.data.activeName);
    var toDel = this.data.activeName;
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
    if (this.data.item.startTime.getTime() > this.data.item.endTime.getTime()) {
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
    console.log(this.data.items);
    this.onClose();
  },

  // 事项内容文本输入框
  onConfirm(value) {
    this.data.item.text = value.detail.value;
  },

  // 时间选择器
  onInput(event) {
    this.setData({
      currentDate: event.detail,
    })
  },
})


