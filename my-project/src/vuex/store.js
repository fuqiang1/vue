import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  author: 'fuqiang',
  age: 18
}
export default new Vuex.Store({
  state
})
