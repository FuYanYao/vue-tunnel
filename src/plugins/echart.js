import * as echarts from "echarts"
import china from '../assets/json/china.json'

export default {
    // echart挂载至全局
    install: app => {
        app.config.globalProperties.$line = (element,data) => {
            // 加载echarts图表
            var myChart = echarts.init(document.getElementById(element))
            const option = {
                  tooltip: {
                    trigger: 'axis'
                  },
                  legend: {
                    data: ['隧道增加数量', '地质预测数量']
                  },
                  grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                  },
                  toolbox: {
                    feature: {
                      saveAsImage: {}
                    }
                  },
                  xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                  },
                  yAxis: {
                    type: 'value'
                  },
                  series: data
            }
            myChart.setOption(option)
        },
        app.config.globalProperties.$rada = (element,data) => {
          var myChart = echarts.init(document.getElementById(element))
          const option = {
            legend: {
              data: ['Allocated Budget', 'Actual Spending']
            },
            radar: {
              // shape: 'circle',
              indicator: [
                { name: 'Sales', max: 6500 },
                { name: 'Administration', max: 16000 },
                { name: 'Information Technology', max: 30000 },
                { name: 'Customer Support', max: 38000 },
                { name: 'Development', max: 52000 },
                { name: 'Marketing', max: 25000 }
              ]
            },
            series: [
              {
                name: 'Budget vs spending',
                type: 'radar',
                data: [
                  {
                    value: [4200, 3000, 20000, 35000, 50000, 18000],
                    name: 'Allocated Budget'
                  },
                  {
                    value: [5000, 14000, 28000, 26000, 42000, 21000],
                    name: 'Actual Spending'
                  }
                ]
              }
            ]
          }
          myChart.setOption(option)
        },
        app.config.globalProperties.$rose = (element,data) => {
          var myChart = echarts.init(document.getElementById(element))
          const option = {
            legend: {
              top: 'bottom'
            },
            series: [
              {
                name: 'Nightingale Chart',
                type: 'pie',
                radius: [30, 150],
                center: ['50%', '50%'],
                roseType: 'area',
                itemStyle: {
                  borderRadius: 8
                },
                data: [
                  { value: 40, name: 'rose 1' },
                  { value: 38, name: 'rose 2' },
                  { value: 32, name: 'rose 3' },
                  { value: 30, name: 'rose 4' },
                  { value: 28, name: 'rose 5' },
                  { value: 26, name: 'rose 6' },
                  { value: 22, name: 'rose 7' },
                  { value: 18, name: 'rose 8' }
                ]
              }
            ]
          }
          myChart.setOption(option)
        },
        app.config.globalProperties.$bar = (element,data) => {
          var myChart = echarts.init(document.getElementById(element))
          const option = {
            xAxis: {
              type: 'category',
              data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
              type: 'value'
            },
            series: [
              {
                data: [
                  120,
                  {
                    value: 200,
                    itemStyle: {
                      color: '#a90000'
                    }
                  },
                  150,
                  80,
                  70,
                  110,
                  130
                ],
                type: 'bar'
              }
            ]
          }
          myChart.setOption(option)
        },
        app.config.globalProperties.$china = (element,data) => {
          var myChart = echarts.init(document.getElementById(element))
          echarts.registerMap('china',china)
          const option = {
            tooltip: {
              ttiggerOn: "click", // 点击触发
              enterable: true
            },
            visualMap: { //渐变色
              origin: "vertical",
              type: "piecewise",
              pieces: [{
                min: 0,max:0,color: "#fff"
              },{
                min: 0,max:10,color: "#fdcf"
              },{
                min: 10,max:20,color: "#fe9e83"
              },{
                min: 20,max:50,color: "#e55a4e"
              },{
                min: 50,max:100,color: "#4f070d"
              },{
                min: 100,max:1000,color: "#ff0000"
              }]
            },
            series: [{
              name: "中国地图",
              type: "map",
              map: "china",
              roam: false, // 滚轮能否缩放
              zoom: 1.2,  // 默认地图配置
              label: {
                show: true, // 是否显示地图上的文本信息
                fontSize: 8
              },
              itemStyle: {
                areaColor: "rgba(255,255,255,1)",
                borderColor: "rgba(0,0,0,0.2)"
              },
              data: [{
                name: "内蒙古",value:10
              },{
                name: "黑龙江", value: 30
              },{
                name: "山东", value: 5
              },{
                name: "河南", value: 534
              },{
                name: "四川", value: 22
              }]
            }]
          }
          myChart.setOption(option)
        }
    }
}