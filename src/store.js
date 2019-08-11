import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userIfo: {}
  },
  mutations: {
    login: function (state, data) {
      this.state.userIfo = data
    }
  },
  actions: {

  }
})
