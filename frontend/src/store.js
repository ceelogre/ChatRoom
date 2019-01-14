import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    msgs:[]
  },
  mutations: {
  SOCKET_UPDATE_MSG: function(state, newMsgArray){
       state.msgs.push( newMsgArray)
   },
  clearMsgs: function(){
    this.msgs = []
  }
  },
  actions: {
    socket_updateMsg: (context, msg) => {
      context.commit('SOCKET_UPDATE_MSG', msg)
    }
  }
  
})
