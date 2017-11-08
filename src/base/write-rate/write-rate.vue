<template>
  <div class="write-rate">
    <header-title :headerTitle="'动漫评分'"></header-title>

    <Rate show-text  :disabled="disabled" v-model="rateValue">
      <span style="color: #f5a623">{{ rateValueText }}</span>
    </Rate>

    <div class="progress flex-row-around">

      <div class="progress-item">
        <div class="progress-item_show">
          <div class="progress-item_text">8.7</div>
        </div>
        <div class="progress-item_name">画风</div>
      </div>

      <div class="progress-item">
        <div class="progress-item_show">
          <div class="progress-item_text">8.7</div>
        </div>
        <div class="progress-item_name">剧情</div>
      </div>

      <div class="progress-item">
        <div class="progress-item_show">
          <div class="progress-item_text">8.7</div>
        </div>
        <div class="progress-item_name">音乐</div>
      </div>

      <div class="progress-item">
        <div class="progress-item_show">
          <div class="progress-item_text">8.7</div>
        </div>
        <div class="progress-item_name">人设</div>
      </div>


    </div>

    <div class="line"></div>


    <div class="write-rate_ing">
      评分：
      <Rate @on-change="_rateChange" show-text  >
      </Rate>
    </div>



  </div>
</template>

<script>
  import HeaderTitle from 'base/header-title/header-title'
  export default {
    props: {
      disabled: {
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
    },
    methods:{
      _rateChange() {
        console.log('sss');
      }
    },
    components:{
      HeaderTitle
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  .write-rate{
    .progress{
      padding-bottom: 25px;
      .progress-item{
        position: relative;
        margin-top: 20px;
        border: 1px solid rgba(204, 204, 204, 0.25);
        width: 30px;
        height: 100px;
      }
      .progress-item_text{
        margin-top: 5px;
        color: #ffffff;
        text-align: center;
        font-size: 12px;
      }
      .progress-item_name{
        position: absolute;
        bottom: -20px;
        left: 0;
        margin-top: 40px;
        font-size: 12px;
      }
      .progress-item_show{
        position: absolute;
        width: 100%;
        height: 50px;
        background-color: #F09199;
        bottom: 0;
        left: 0;
      }
    }
    .write-rate_ing{
      margin-top: 20px;
      font-size: 12px;
    }
  }
</style>