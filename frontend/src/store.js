import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    msgs:[],
    loggedInUser: null,
    left: null
  },
  getters: {
    getLoggedInUser: function(state){
      return state.loggedInUser
    }
  },
  mutations: {
  SOCKET_UPDATE_MSG: function(state, newMsgArray){
       state.msgs.push( newMsgArray)
   },
  SET_LOGGED_IN_USER: function(state, username){
    state.loggedInUser = username
  }
  },
  actions: {
    socket_updateMsg: (context, msg) => {
      context.commit('SOCKET_UPDATE_MSG', msg)
    },
    setLoggedInUser: (context, username) => {
      context.commit('SET_LOGGED_IN_USER', username)
    }
  }
  
})
