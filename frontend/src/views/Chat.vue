<template>
  <div class="s">
    <messages />
    <new-message-form />
    <button class="btn btn-lg btn-outline-danger"v-on:click="Signout" >LEAVE</button>
  </div>
</template>

<script>
import NewMessageForm from '@/components/NewMessage.vue'
import Messages from '@/components/Messages.vue'

export default {
  name: 'chat',
  components:{
    NewMessageForm,
    Messages
  },
  beforeCreate: function(){
if(localStorage.uid){
    }
    else{
      this.$router.push('/')

    }
  },
  created: function(){
    let username = this.$route.params.username
      this.$store.dispatch('setLoggedInUser', username)
  },
  socket:{
    events:{

    connect(){
      console.log('Connect to server.');
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
      this.$router.push('/')
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