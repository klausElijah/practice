import Vue from 'vue'
import Vuex from 'vuex'

/*
如何使用Vuex存储和使用数据，请参考: https://v3.vuex.vuejs.org/zh/
如何使用localstorage持久化保存数据，请参考: https://developer.mozilla.org/zh-CN/docs/Web/API/Window/localStorage
本文件用于实现存储数据的store业务逻辑，并在必要的时候，将数据保存到localstorage中，
以及在关闭然后重新打开页面的时候，从localstorage中加载数据，并初始化到store中
*/
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    days: 14,
    dayList: []
  },
  getters: {
  },
  mutations: {
    TO_VUX (state, list) {
      state.dayList = list || []
    },
    SAVE_DAYS (state, data) {
      state.days = data
    },
    SAVE_LIST (state, data) {
      state.dayList.unshift(data)
    }
  },
  actions: {
    saveList (context, value) {
      context.commit('SAVE_LIST', value)
    }
  },
  modules: {
  }
})
