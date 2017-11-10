<template>
  <div class="kkz-footer">
    <div class="w ">
<div class="flex-row-between">
      <div class="left">
        <h1>About Me</h1>
        <p>如果你有什么疑问或者交流，下面联系方式可以找到小海~.~</p>
        <p> Laravel 学习：735065832 邮件 735065832@qq.com</p>
      </div>

      <div class="right" >
        <p style="font-size: 14px;margin-top: 20px">当你的才华还撑不起你的野心时，就应该静下心来学习,当你的能力还驾驭不了你的目标时，就应该沉下心来历练.
        </p>
      </div>
</div>
      <div style="border-top: 1px solid #2f2f37;margin-top: 20px;padding-top: 20px ">
        <p>Copyright © 2017 kkzou. All Rights Reserved.</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {}
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../common/sass/variable";



  @media only screen and (min-width: 50em) {
    .kkz-footer{
      /*border-top: 1px solid rgba(0, 0, 0, 0.11);*/
      background-color: #34343c;
      box-sizing: border-box;
      margin-top: 20px;
      padding-top: 40px;
      min-height: 200px;
      h1{
        font-size: 20px;
        margin-bottom: 20px;
      }
      p{
        color: #ccc;
        font-size: 12px;
        line-height: 20px;
      }
      .left{
        color: white;
        width: 450px;
      }

      .right{
        color: white;
        width: 450px;
      }
    }
  }

  @media only screen and (max-width: 50em) {
    .kkz-footer{
      /*border-top: 1px solid rgba(0, 0, 0, 0.11);*/
      background-color: #34343c;
      box-sizing: border-box;
      margin-top: 20px;
      padding: 0 10px;
      padding-top: 40px;
      min-height: 200px;
      h1{
        font-size: 20px;
        margin-bottom: 20px;
      }
      p{
        color: #ccc;
        font-size: 12px;
        line-height: 20px;
      }
      .left{
        color: white;
        width: 100%;
      }

      .right{
        display: none;
        color: white;
        width: 450px;
      }
    }
  }
</style>