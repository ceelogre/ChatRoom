<template>
  <div>
    <h3> {{ serverMsg}} </h3>
    <button v-on:click="count">Call</button>
    <p> {{ count }}</p>
  </div>
</template>

<script>
import {talkToServer} from '../utils/fetch';
  export default {
      name: 'Handshake',
      data: function(){
          return {
              serverMsg: null,
              count: 0
          }
      },
      methods: {
          shakeHands(){
              talkToServer().then( (serverResponse) => {
                  this.serverMsg = serverResponse.data;
              });

          }
      },
      computed:{
          countDown(){
              return this.count + 1;
          }
      }
  }
</script>