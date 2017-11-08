<template>
  <div  class="a-background" :style="{padding: padding}" @click.stop="_changeData">
    {{text}}
  </div>
</template>

<script>
  export default {
    props:{
      text:{
        type: String,
        default: "海贼王"
      },
      padding:{
        type: String,
        default: "6px 8px"
      }
    },
    methods:{
      _changeData(){
        this.$emit('select', this.text);
      }
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../common/sass/variable";
  .a-background{
    cursor: pointer;
    display: inline-block;
    letter-spacing: normal;
    margin: 5px 5px 0 0;
    background-color: $color-background-dd;
    -webkit-border-radius: 2px;
    font: 12px Helvetica,Arial,sans-serif;
    text-decoration: none;
    color: $color-text-blue-d;
    &:hover{
      background-color: $color-background-gray-l;
    }
  }
</style>