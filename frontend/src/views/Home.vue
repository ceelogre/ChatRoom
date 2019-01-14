<template>
  <div class="home">
    <div v-on:cred="receiveCredentials">{{ cred }}</div>
    <Signin msg="Welcome to FSE chat room "/>
  </div>
</template>

<script>
// @ is an alias to /src
import Signin from '@/components/Signin.vue'
export default {
  name: 'signin',
  data() {
    return {

      cred: null
    }
  },
  components: {
    Signin
  },
  methods: {
receiveCredentials: function(creds){
      console.log(creds)
      this.cred = creds
    }
  },
}
</script>
