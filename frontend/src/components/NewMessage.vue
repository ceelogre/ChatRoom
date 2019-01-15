<template>
    <div class="form-group" >
        <form @submit.prevent="addNewMessage">
            <div class="form-group">
            <input class="form-control" v-model="msg" autocomplete="off" />
            </div>
            <button class="btn btn-lg btn-outline-success">POST</button>
        </form>
    </div>
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
