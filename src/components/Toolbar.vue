<template>
  <div ref="contierMo">
    <a-button type="primary" @click="showModal" class="btn">新增记录</a-button>
    <a-modal
      :visible="visible"
      title="添加记录"
      ok-text="确定"
      cancel-text="取消"
      @cancel="handleCancel"
      @ok="handleCreate"
      :getContainer = '()=>$refs.contierMo' :width="400"
    >
      <a-form :layout="horizontal" :form="form" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-form-item label="日期">
          <a-date-picker
            v-model="form.date"
            type="date"
            placeholder="请选择日期"
            :disabled-date="disabledDate"
            style="width: 100%"
          >
          </a-date-picker>
        </a-form-item>
        <a-form-item label="类别">
          <a-select v-model="form.type" placeholder="请选择类别">
            <a-select-option value="娱乐">娱乐</a-select-option>
            <a-select-option value="运动">运动</a-select-option>
            <a-select-option value="学习">学习</a-select-option>
            <a-select-option value="工作">工作</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="小时数">
          <a-input-number
            v-model="form.hour"
            :min="0.5"
            :max="24"
            :step="0.5"
            placeholder="请输入小时数"
          >
          </a-input-number>
        </a-form-item>
        <a-form-item label="说明">
          <a-input type="textarea" :maxLength="128" v-model="form.desc" placeholder="请输入说明"></a-input>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
/*
这个文件中主要编写添加新记录的按钮，以及点击按钮后弹出的新纪录填写Modal框，
新添加的数据，直接写入到store中，通过store让整个页面所有的组件都刷新数据
ant design ui可以参考： https://1x.antdv.com/docs/vue/introduce-cn/
*/
import { v4 as uuidv4 } from 'uuid'
export default {
  name: 'ToolBar',
  data () {
    return {
      visible: false,
      horizontal: 'horizontal',
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
      form: {
        date: undefined,
        type: undefined,
        hour: 0.5,
        desc: ''
      }
    }
  },
  methods: {
    disabledDate (current) {
      return current && current > new Date().getTime()
    },
    showModal () {
      this.visible = true
    },
    handleCancel () {
      this.visible = false
    },
    handleCreate () {
      const data = {
        // eslint-disable-next-line no-undef
        date: this.form.date.format('YYYY-MM-DD'),
        type: this.form.type,
        hour: this.form.hour,
        desc: this.form.desc,
        key: uuidv4()
      }
      this.$store.dispatch('saveList', data)
      this.visible = false
    }
  }
}
</script>

<style>
  .btn{
    margin-left: calc(100% - 100px);
  }
</style>
