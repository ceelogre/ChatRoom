<template>
  <div class="s">
  <messages :left-user="leftUser" :new-user = "newUser"></messages>
    <new-message-form />
    <button class="btn btn-lg btn-outline-danger" v-on:click="Signout" >LEAVE</button>
  </div>
</template>

<script>
import NewMessageForm from '@/components/NewMessage.vue'
import Messages from '@/components/Messages.vue'
import Vue from 'vue'
import VueSocketIO from 'vue-socket-io'
Vue.use(VueSocketIO, 'http://localhost:3001')

export default {
  name: 'chat',
  data(){
    return {
      join: null,
      newUser: null,
      leftUser: null
    }
  },
  components:{
    NewMessageForm,
    Messages
  },
  beforeCreate: function(){
if(!localStorage.uid){
      this.$router.push('/')
    }
  },
  created: function(){
    let username = this.$route.params.username
      this.$store.dispatch('setLoggedInUser', username)
      this.$socket.emit('connection', this.$store.getters.getLoggedInUser)
  },
  socket:{
    events:{

    connect(){
    },
    join(data){
      this.newUser = data
    },
    left(data){
      this.leftUser = data
      this.$store.state.left = data
    },
    disconnect(){
    },
    receivedMsg: function(data){
      this.$socket.emit('newMessage', data)
      this.$store.dispatch('socket_updateMsg', data)
        }
    }
  },
  methods:{
    Signout(){
      delete localStorage.uid
      this.leaveChat()
      this.$router.go(-1)
    },
    async leaveChat(){
      await this.$socket.emit('disconnection', this.$store.getters.getLoggedInUser)
    }
  }
}
</script>
<style>
.s{
  text-align: center;
  width: 400px;
  margin-left: auto;
  margin-right: auto;
}
</style>