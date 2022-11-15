<template>
  <div id="barMain" class="barEchart">
  </div>
</template>

<script>
/*
这个文件实现用堆叠柱状图，显示当前选中的时间区间内的所有记录的统计信息，
堆叠柱状图有两个维度，一个维度是日期维度，以每一天为单位显示区间内的连续日期，
对于同一个日期的不同记录，再按照另一个维度类别来分组，同一组的小时数累加在一起，
时间区间在14天和7天之间切换时，图表数据会自动更新
ant design ui可以参考： https://1x.antdv.com/docs/vue/introduce-cn/
*/
import * as echarts from 'echarts/core'
import { BarChart } from 'echarts/charts'
import { mapState } from 'vuex'
import moment from 'moment'
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent
} from 'echarts/components'
import { LabelLayout, UniversalTransition } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'

echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  BarChart,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer
])

export default {
  name: 'BarTrend',
  data () {
    return {
      // day: 14,
      recentDate: []
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
    // 获取最近7天或14天的日期
    receDate () {
      const dates = this.days - 1
      this.recentDate = []
      for (let i = 0; i <= dates; i++) {
        this.recentDate.unshift(moment().subtract(i, 'day').format('MM-DD'))
      }
    },
    // 数据格式化，传给柱状图的data
    barList (arr) {
      const barData = [['time', '娱乐', '工作', '学习', '运动']]
      const dateBar = {}
      // eslint-disable-next-line array-callback-return
      arr.map(item => {
        dateBar[item.date] = dateBar[item.date] || []
        dateBar[item.date].push(item)
      })
      // console.log('#####dateBar', dateBar)
      // console.log('#####dateBar', Object.keys(dateBar))
      for (const key of Object.keys(dateBar)) {
        const inBarData = []
        inBarData[0] = key.substr(5)
        // console.log(key, dateBar[key])
        const typeData = barData[0]
        for (let i = 1; i < typeData.length; i++) {
          let sum = 0
          dateBar[key].forEach(item => {
            if (item.type === typeData[i]) {
              sum += item.hour
            }
          })
          if (sum !== 0) {
            inBarData[i] = sum
          }
        }
        barData.push(inBarData)
      }
      return barData
    },
    // 过滤最近7天或14天的日期
    dateList (arr) {
      return arr.filter(item => {
        return item.date > moment().subtract(this.days, 'day').format('YYYY-MM-DD')
      })
    },
    init () {
      const newBarData = this.barList(this.dateList(this.dayList))
      console.log('newBarData ----->', newBarData)
      this.receDate()
      const myBarChart = echarts.init(document.getElementById('barMain'))
      myBarChart.setOption({
        backgroundColor: 'rgba(234,234,234,.8)',
        title: {
          // eslint-disable-next-line no-template-curly-in-string
          text: `过去${this.days}天的用时趋势`,
          left: 'center'
        },
        legend: {
          top: 'bottom'
        },
        tooltip: {},
        xAxis: {
          data: this.recentDate,
          type: 'category',
          name: '日期'
        },
        yAxis: {},
        label: {
          show: true
        },
        dataset: {
          source: newBarData
        },
        series: [
          { type: 'bar', stack: 'x' },
          { type: 'bar', stack: 'x' },
          { type: 'bar', stack: 'x' },
          { type: 'bar', stack: 'x' }
        ]
      })
      if (newBarData.length === 1) {
        myBarChart.showLoading({
          text: '无用时趋势数据可显示',
          showSpinner: false,
          textColor: 'black',
          maskColor: 'rgba(234,234,234,1)',
          fontSize: '20px'
        })
      } else {
        myBarChart.hideLoading()
      }
    }
  },
  mounted () {
    this.init()
  }
}
</script>

<style>
  .barEchart{
    height: 300px;
    width: 100%;
  }
</style>
