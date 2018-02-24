import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  author: 'fuqiang',
  age: 18,
  sex: 'woman'
}
const mutations = {
  changeName (state) {
    state.author = '哈哈哈哈'
    state.age -= 4
  }
}
/* eslint-disable no-return-assign */
const getters = {
  age: function (state) {
    return state.age += 100
  }
}
export default new Vuex.Store({
  state,
  mutations,
  getters
})
