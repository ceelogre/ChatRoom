<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div class="mx-auto" >
      <form @submit.prevent = "onSubmit">
        <transition name="errors" v-on:after-enter="errorsActive">
          <div v-if="errors.length">
            <ul>
              <li class="alert-warning" v-for="(error, index) in errors" :key="index"> {{ error }} </li>
            </ul>
          </div>
        </transition>
        <div class="form-group">
          <input type = "text" class="form-control" v-model="username" placeholder="Username">
        </div>
        <div class="form-group">
          <input type = "password" class="form-control" v-model="key" placeholder="Password">
        </div>
        <div class="form-group">
          <input type = "password" class="form-control" v-model="keyRepeat" placeholder="Repeat password">
        </div>
        <button type="submit" class="btn btn-success"> Register</button>
      </form>
      <router-link to="/">Login</router-link>
    </div>
  </div>
</template>

<script>
import { sendSignupCredentials } from '../utils/send.js'
export default {
  name: 'Signin',
  props: {
    msg: String,
  },
  data: function(){
    return {
      username: null,
      key: null,
      keyRepeat: null,
      errors: []
    }
  },
  methods: {
    onSubmit(){
      if(!this.username)
        this.errors.push("Username is required");
      if(!this.key)
        this.errors.push("Password is required");
      if(!this.keyRepeat || this.keyRepeat != this.key)
        this.errors.push("Passwords don't match.");
      if(this.errors.length == 0){
        let credentials = {
          handle: this.username,
          key: this.key
        }
        this.$emit('creds', credentials);
        sendSignupCredentials(credentials).then(
          (response) => {
            if(response.accountSuccessfullyCreated){
              this.$router.push('/')
            }
          }
        )
      }
    },
    submitData(data){
      console.log(data);
    },
    errorsActive(){
      this.errors = [];
    }

  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3{
  margin: 40px 0 0;
}
.mx-auto{
  width: 300px;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.errors-enter-active{
  transition: opacity 3s;
}
.errors-enter /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

</style>
