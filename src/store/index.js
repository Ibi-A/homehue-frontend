import Vue from 'vue'
import Vuex from 'vuex'

const config = require('../conf/local-config.json')

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    baseUrl: config.hueApiBaseUrl + '/' + config.hueUsername
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})

