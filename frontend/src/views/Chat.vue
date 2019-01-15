<template>
  <div class="s">
    <messages />
    <new-message-form />
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