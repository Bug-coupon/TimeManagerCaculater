// pages/index/chart2/chart2.js
import * as echarts from '../../../ec-canvas/echarts';

var app = getApp();

// 饼图初始化方法
function initChart1(canvas, width, height, dpr) {
  console.log("开始饼图");
  // echart 设置固定模板
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // 像素
  });
  canvas.setChart(chart);

  // 准备data
  // 类型: 上课, 会议, 休闲, 睡眠, 饮食, 学习, 活动, 实习, 健身
  let items = [];
  items = app.globalData.itemList;
  var data = [
    {name:'上课', value:0},
    {name:'会议', value:0},
    {name:'休闲', value:0},
    {name:'睡眠', value:0},
    {name:'饮食', value:0},
    {name:'学习', value:0},
    {name:'活动', value:0},
    {name:'实习', value:0},
    {name:'健身', value:0}
  ];
  for (var item of items) {
    for (var obj of data) {
      if (obj.name == item.type) {
        obj.value += item.endTime - item.startTime;
      }
    }
  }
  console.log(data);
  // 去除时间为0的类别
  for (let i = data.length-1; i >=0; i--) {
    if (data[i].value == 0) {
      data.splice(i,1);
    }
  }

  // option设置
  var option = {
    series : [
      {
        title: {left: 'center', text: '事项时长占比'},
        name: '访问来源',
        type: 'pie',
        radius: '55%',
        data: data,
        roseType: 'angle'
      }
  ]
  };
  chart.setOption(option);
  return chart;
}

// 折线图初始化方法
function initChart2(canvas, width, height, dpr) {
  console.log("开始折线图");

  // echart 设置固定模板
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // 像素
  });
  canvas.setChart(chart);

  // 数据准备
  // 最近七天的日期
  let recent7 = [];
  // 三类事项在最近七天的分钟数
  let data1 = [0,0,0,0,0,0,0];
  let data2 = [0,0,0,0,0,0,0];
  let data3 = [0,0,0,0,0,0,0];
  let items = app.globalData.itemList;
  for (let i = 6; i >=0; i--) {
    let day = new Date();
    day.setDate((new Date().getDate()-i));
    for (let item of items) {
      if (item.endTime.toDateString() == day.toDateString()) {
        let t = item.type;
        let index = 6-i;
        let mins = (item.endTime.getTime() - item.startTime.getTime())/60000;
        if (t == '睡眠' || t == '吃喝') data3[index] += mins;
        else if (t == '活动' || t == '健身' || t == '休闲') data2[index] += mins;
        else data1[index] += mins;
      }
    }
    recent7.push((day.getMonth()+1) + "/" + day.getDate() );
  }

  // option 设置
  var option = {
    color: ["#37A2DA", "#67E0E3", "#9FE6B8"],
    legend: {
      data: ['专注', '休闲', '必要'],
      top: 50,
      left: 'center',
      backgroundColor: '#afb4db',
      z: 100
    },
    grid: {
      containLabel: true
    },
    tooltip: {
      show: true,
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: recent7,
    },
    yAxis: {
      x: 'center',
      type: 'value',
      splitLine: {
        lineStyle: {
          type: 'dashed'
        }
      }
    },
    series: [{
      name: '专注',
      type: 'line',
      smooth: true,
      data: data1
    }, {
      name: '休闲',
      type: 'line',
      smooth: true,
      data: data2
    }, {
      name: '必要',
      type: 'line',
      smooth: true,
      data: data3
    }]
  };

  chart.setOption(option);
  return chart;
}

Page({
  data: {
    ec: {
      onInit: initChart1
    },
    ecLine: {
      onInit: initChart2
    }
  },
})