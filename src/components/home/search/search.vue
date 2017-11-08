<template>
  <transition name="slide">
    <div class="kkz-search">
      <div class="w">
        <image-title-row
          :isBox="true"
          :isFlexEnd="true"
        ></image-title-row>
      </div>
    </div>
  </transition>
</template>

<script>
  import ImageTitleRow from 'base/image-title-row/image-title-row'
  export default {
    components:{
      ImageTitleRow
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  .slide-enter-active, .slide-leave-active{
    transition: all 0.3s
  }
  .slide-enter, .slide-leave-to{
    transform: translate3d(100%, 0, 0)
  }
  .kkz-search{
      position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    min-height: 500px;
    background-color: white;
    z-index: 100;
  }
</style>