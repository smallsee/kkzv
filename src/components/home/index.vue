<template>
  <div>
    <div class="kkz-top">
      <tab></tab>
      <m-header></m-header>
    </div>

    <div class="kkz-search-box">



    </div>


    <div class="kkz-body">

      <keep-alive>
        <router-view v-if="!$route.meta.notKeepAlive"></router-view>
      </keep-alive>
      <router-view v-if="$route.meta.notKeepAlive"></router-view>

    </div>

    <m-footer></m-footer>
    <Back-top></Back-top>
  </div>
</template>

<script>
  import MHeader from 'home/m-header/m-header'
  import MFooter from 'home/m-footer/m-footer'
  import Tab from 'home/tab/tab'
  import Search from 'home/search/search'


  export default {
    data() {
      return {
        isShowSearch: false
      }
    },
    created() {
//      console.log(this.$route.meta.notKeepAlive)
    },
    components: {
      MHeader,
      Tab,
      MFooter,
      Search,
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">



  @media only screen and (min-width: 50em) {
    .kkz-top{
      position: relative;
    }
    .kkz-body{
      min-height: 660px;
    }
    .kkz-search-box{
      position: relative;
    }
  }

  @media only screen and (max-width: 50em) {
    .kkz-top{
      position: relative;
    }
    .kkz-body{
      min-height: 335px;
    }
    .kkz-search-box{
      position: relative;
    }
  }
</style>