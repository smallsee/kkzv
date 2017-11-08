<template>
  <div class="image-title-rate clearfix" :class="{ 'no-margin-right': isNoMarginRight }"  :style="{ width:  width, 'background-color' : backgroundColor}">


    <a class="thumb"   :href="url" :style="{width:width,height:imgHeight}">
      <img  v-lazy="img" alt="" @click.stop="_changeData">
    </a>

    <a @click.stop="_changeData" class="title word-break" :style="{ 'max-width':  width+ 'px', 'max-height': maxHeight,margin: titleMargin , 'line-height' : lineHeight}" :href="url">{{title}}</a>

    <div v-if="isRate"  id="rate" :style="{ width:  width}">
      <Rate show-text  :disabled="disabled" v-model="rateValue">
          <span style="color: #f5a623">{{ rateValueText }}</span>
      </Rate>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      disabled: {
        type: Boolean,
        default: true
      },
      titleMargin:{
        type: String,
        default: '10px 0'
      },
      isRate: {
        type: Boolean,
        default: true
      },
      rateValue: {
        type: Number,
        default: 4
      },
      rateValueText: {
        type: String,
        default: '8星'
      },
      width: {
        type: String,
        default: '135px'
      },
      maxHeight: {
        type: String,
        default: '13px'
      },
      title:{
        type: String,
        default: '萨达UI我的期望和iasdasdaasdsadassdasd'
      },
      imgHeight: {
        type: String,
        default: '170px'
      },
      lineHeight: {
        type: String,
        default: '14px'
      },
      backgroundColor: {
        type: String,
        default: '#ffffff'
      },
      url:{
        type: String,
        default: '#'
      },
      img:{
        type: String,
        default: 'http://ohadc19qz.bkt.clouddn.com/0c7082896db3c52df84561990c00d824'
      },
      isNoMarginRight:{
        type: Boolean,
        default: false
      },
      id:{
        type: Number,
        default: 0
      }

    },
    methods:{
      _changeData() {
        this.$emit('select', this.id);
      }
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">


  .image-title-rate{
    margin-right: 10px;
    margin-top: 10px;
    .thumb{
      overflow: hidden;
      display: block;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .title{
      text-align: center;
      display: block;
      margin: 10px 0;
      box-sizing: border-box;
      padding: 0 10px;
      font-size: 14px;
      overflow: hidden;
    }
    #rate{
      text-align: center;
      .ivu-rate{
        font-size: 12px;
      }
    }

  }
</style>