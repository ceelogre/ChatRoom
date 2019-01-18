<template>
<div class="messages">
    <ul class="list-group" v-if="msgsQueue.length > 0">
    <li class="list-group-item"  v-bind:class="[alignChats(msg.postedBy)? 'pull-left':'pull-right']" v-for="(msg, index) in msgsQueue" :key=index><span class="text text-info">{{ formatUser(msg.postedBy) }}:</span> <span class="text text-success"> {{ msg.text }} </span> <span class="text text-danger"> <small>{{ formatDate(msg.postedAt) }}</small> </span></li>
    </ul>
    <transition name="status" v-on:after-enter="statusVisible">
      <p v-if="leftUser">{{ leftUser}} has left</p>
      <p v-if="newUser">{{ newUser}} has joined</p>
    </transition>
</div>
</template>

<script>
import Moment from 'moment'
import  { getAllMessages } from '../utils/fetch.js'

export default {
  data(){
    return{
      msgsQueue: this.$store.state.msgs,
      time: null,
      text: null,
      postedBy: null,
      chat: '',
    }
  },
   created: function(){
     this.getAllChats()
  },
 props: {
    newUser: String,
    leftUser: String
  },
methods:{
      getAllChats(){
        getAllMessages().then( (response) => {
          let data = (Array.from(Object.values(response.serverResponse.chats)))
          data.forEach((msg) => {
            this.$store.dispatch('socket_updateMsg', msg)
          })
        })
      },
      resizeChatBox(){
        let chatBox = this.$refs.chatContainer;
        chatBox.scrollTop = chatBox.scrollHeight;
    },
    formatUser: function(user){
        return  (user == this.$store.getters.getLoggedInUser)? 'Me ': user
    },

    formatDate: function(dateInString){
        return Moment(dateInString).fromNow()
    },

    alignChats(user){
      let isItMe = this.formatUser(user)
      return isItMe == 'Me '? true: false
    },
    statusVisible(){
      this.newUser = null
      this.leftUser = null
    }

  },

}
</script>

<style>

.messages{
    margin-bottom: 2%
}
.pull-left{
  text-align: left;
}
.pull-right{
  text-align: right
}
.status-enter-active{
  transition: opacity 3s;
}
.status-enter{
  opacity: 0;
}
.list-group-item{
  border: 0
}
</style>
