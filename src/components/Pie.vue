<template>
  <div id="pieMain" class="pieEchart"></div>
</template>

<script>
/*
这个文件实现用饼图，显示当前选中的时间区间内的所有记录的统计信息，
饼图以类别作为分组，同一个类别的所有日期的小数时都累加在一起，
时间区间在14天和7天之间切换时，图表数据会自动更新
ant design ui可以参考： https://1x.antdv.com/docs/vue/introduce-cn/
*/
import * as echarts from 'echarts/core'
import { PieChart } from 'echarts/charts'
import { mapState } from 'vuex'
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent
} from 'echarts/components'
import { LabelLayout } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'
import moment from 'moment'

echarts.use([
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  LabelLayout,
  PieChart,
  CanvasRenderer
])
export default {
  name: 'PieChart',
  data () {
    return {
      // day: 14,
      reDate: [],
      newPieList: []
    }
  },
  computed: {
    ...mapState(['days', 'dayList'])
  },
  watch: {
    days () {
      // this.day = this.days
      this.init()
    },
    dayList () {
      this.init()
    }
  },
  methods: {
    init () {
      // console.log('dayList----->', this.dayList)
      const showData = this.compare(this.dateList(this.dayList))
      // console.log(showData)
      const myPieChart = echarts.init(document.getElementById('pieMain'))
      myPieChart.setOption({
        backgroundColor: 'rgba(234,234,234,.8)',
        title: {
          text: `过去${this.days}天的分类用时`,
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        series: [
          {
            name: '时间的分配',
            type: 'pie',
            radius: '50%',
            data: showData,
            label: {
              normal: {
                show: true,
                formatter: '{b}: {c}({d}%)'
              }
            },
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      })
      if (!showData.length) {
        myPieChart.showLoading({
          text: '无分类总用时数据可显示',
          showSpinner: false,
          textColor: 'black',
          maskColor: 'rgba(234,234,234,1)',
          fontSize: '20px'
        })
      } else {
        myPieChart.hideLoading()
      }
    },
    // 过滤最近7天或14天的日期
    dateList (arr) {
      return arr.filter(item => {
        return item.date > moment().subtract(this.days, 'day').format('YYYY-MM-DD')
      })
    },
    compare (arr) {
      // console.log(arr)
      const showArray = []
      arr.forEach(item => {
        // eslint-disable-next-line array-callback-return
        const isFind = showArray.find(newItem => {
          if (newItem.name === item.type) {
            newItem.value += item.hour
            return newItem
          }
        })
        if (isFind) {
          console.log('找到了！！！')
        } else {
          const newObj = {
            name: item.type,
            value: item.hour
          }
          showArray.unshift(newObj)
        }
      })
      return showArray
    }

  },
  mounted () {
    this.init()
  }
}
</script>

<style>
  .pieEchart{
    height: 300px;
    width: 100%;
  }
</style>
