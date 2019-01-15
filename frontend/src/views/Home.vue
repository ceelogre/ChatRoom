<template>
  <div class="home">
    <Signin msg="Welcome to FSE chat room "/>
  </div>
</template>

<script>
// @ is an alias to /src
import Signin from '@/components/Signin.vue'
export default {
  name: 'signin',
   components: {
    Signin
  },
}
</script>
