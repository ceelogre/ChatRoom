<template>
  <div class="about">

    <p v-if="msgsQueue.length > 0">
      <p v-for="(msg, index) in msgsQueue" :key=index>{{ msg}}</p>
    <new-message-form />
  </div>
</template>

<script>
import NewMessageForm from '@/components/NewMessage.vue'
export default {
  name: 'chat',
  data(){
    return{
      msgsQueue: this.$store.state.msgs
    }
  },
  components:{
    NewMessageForm
  },
  methods:{
        resizeChatBox(){
      let chatBox = this.$refs.chatContainer;
      chatBox.scrollTop = chatBox.scrollHeight;
    },
  },
  socket:{
    events:{

    connect(){
      console.log('Connect to server.');
    },
    hi(data){
      console.log(data)
    },
    receivedMsg: function(data){
      this.$socket.emit('newMessage', data)
      console.log('data', data);
      this.$store.dispatch('socket_updateMsg', data)
        }
    }
  }
}
</script>
