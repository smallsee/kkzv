<template>

  <div class="kkz-user_info">
    <template v-if="isLogin">
      <template v-if="user.id == $route.params.id">
        <div class="user_info">
          xiaohai
        </div>
      </template>
      <template v-else>
        <div class="diff_user">
          = =你不可以这样哦
        </div>
      </template>
    </template>
  </div>

</template>

<script>
  export default {
    computed: {
      isLogin() {
        return this.$store.state.isLogin
      },
      user() {
        return this.$store.state.user
      }
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">

</style>