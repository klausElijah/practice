<template>
  <div id="app">
    <Day-Filter></Day-Filter>
    <a-row class="row" style="padding-left: 16px;padding-right: 16px;" :gutter="16">
    <a-col :span="8">
        <Pie></Pie>
    </a-col>
    <a-col :span="16">
        <BarTrend></BarTrend>
    </a-col>
    </a-row>
    <Toolbar></Toolbar>
    <Record-Table></Record-Table>
  </div>
</template>
<script>
import Toolbar from './components/Toolbar.vue'
import RecordTable from './components/RecordTable.vue'
import Pie from './components/Pie.vue'
import BarTrend from './components/BarTrend.vue'
import DayFilter from './components/DayFilter.vue'
export default {
  components: {
    Toolbar,
    RecordTable,
    Pie,
    BarTrend,
    DayFilter
  }
}
</script>
<style lang="less">

</style>
