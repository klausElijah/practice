<template>
    <div class="rightShow">
      以下图表仅统计过去<a-select default-value="14" style="width: 60px" @change="handleChange">
      <a-select-option value="7">7</a-select-option>
      <a-select-option value="14">14</a-select-option>
    </a-select>的数据（包含今天）
    </div>
</template>

<script>
/*
这个文件用来实现针对图表的时间区间的选择逻辑，默认选择过去14天，也可以选择过去7天，
这个选中的时间区间的数据，可以通过store来保存，以达到其他的图表组件可以访问并及时更新的目的
ant design ui可以参考： https://1x.antdv.com/docs/vue/introduce-cn/
*/
export default {
  name: 'DayFilter',
  methods: {
    handleChange (value) {
      this.$store.commit('SAVE_DAYS', value)
    }
  }
  // created () {
  //   this.$store.commit('SAVE_DAYS', 14)
  // }
}
</script>

<style>
  .rightShow{
    display: flex;
    justify-content: flex-end;
  }
</style>
