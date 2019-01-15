<template>
<div class="messages">
    <ul class="list-group" v-if="msgsQueue.length > 0">
    <li class="list-group-item" v-for="(msg, index) in msgsQueue" :key=index><span class="text text-info">{{ formatUser(msg.postedBy) }}:</span> <span class="text text-success"> {{ msg.text }} </span> <span class="text text-danger"> <small>{{ formatDate(msg.postedAt) }}</small> </span></li>
    </ul>
</div>
</template>

<script>
import Moment from 'moment'
export default {
  data(){
    return{
      msgsQueue: this.$store.state.msgs,
      time: null,
      text: null,
      postedBy: null,
      chat: ''
    }
  },
  computed: {
    
  },
methods:{
        resizeChatBox(){
      let chatBox = this.$refs.chatContainer;
      chatBox.scrollTop = chatBox.scrollHeight;
    },
    formatUser: function(user){
        console.log('dd', this.$store.getters.getLoggedInUser)
        return  (user == this.$store.getters.getLoggedInUser)? 'Me ': user
    },

    formatDate: function(dateInString){
        return Moment(dateInString).fromNow()
    }

  },

}
</script>

<style>

.messages{
    margin-bottom: 2%
}

</style>
