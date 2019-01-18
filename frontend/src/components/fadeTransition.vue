<template>
    <transition name="fade" >
        <slot></slot>
    </transition>
</template>

<script>
export default {

methods: {
afterEnter: function(el){
      this.errors = [];
    }
  }
}
</script>

<style>

.errors-enter-active, .accountToast-enter-active, .accountToast-enter-leave{
  transition: opacity 3s;
}
.errors-enter /* .fade-leave-active below version 2.1.8 */, .accountToast-enter, .accountToast-leave{
  opacity: 0;
}
</style>
