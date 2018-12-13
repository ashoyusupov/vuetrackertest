import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import * as Cookie from 'js-cookie'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
    token: null,
    user: null,
    isUserLoggedIn: false,
    groupId: null,
    permissions: null
  },
  plugins: [
    createPersistedState({
      paths: ['user', 'token', 'isUserLoggedIn', 'groupId', 'permissions'],
      getState: (key) => Cookie.getJSON(key),
      setState: (key, state) => Cookie.set(key, state, { expires: 1, secure: false })
    })
  ],
  mutations: {
    setToken (state, token) {
      state.token = token
      if (token) {
        state.isUserLoggedIn = true
      } else {
        state.isUserLoggedIn = false
      }
      console.log(Cookie.get('vuex'))
    },
    setUser (state, user) {
      state.user = user
    },
    setGroup (state, groupId) {
      state.groupId = groupId
    },
    setPerm (state, perm) {
      state.permissions = perm
    }
  },
  actions: {
    setToken ({commit}, token) {
      commit('setToken', token)
    },
    setUser ({commit}, user) {
      commit('setUser', user)
    },
    setGroup ({commit}, groupId) {
      commit('setGroup', groupId)
    },
    setPerm ({commit}, perm) {
      commit('setPerm', perm)
    }
  }
})
