<template>
    <form @submit.prevent="addNewMessage">
        <input v-model="msg" autocomplete="off" />
        <button>Send</button>
    </form>
</template>

<script>
export default {

    data(){
        return  {
        msg: null,
        }
    },
      methods:{
        addNewMessage(){
            if(this.msg){
                let newMsg ={
                    text: this.msg,
                    postedBy: this.$route.params.username
                }
                this.$socket.emit('newMsg', newMsg)
                this.msg = null;
            }
        }
    },

}
</script>

<style>

</style>
