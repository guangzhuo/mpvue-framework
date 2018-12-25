import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import state from './state'
import getters from './getters'
import actions from './actions'
import mutations from './mutation'

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  plugins: [
    createPersistedState({
      storage: {
        getItem: key => wx.getStorageSync(key),
        setItem: (key, value) => wx.setStorageSync(key, value),
        removeItem: key => {}
      }
    })
  ]
})
