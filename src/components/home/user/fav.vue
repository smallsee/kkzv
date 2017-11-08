<template>
  <div class="kkz-fav">
    <div class="clearfix">
    <template v-for="(item,index) in data">
      <div class="fav-item float-left " >
        <image-title-rate
                          :width="'180px'"
                          :imgHeight="'130px'"
                          :maxHeight="'26px'"
                          :isRate="false"
                          :titleMargin="'10px 0'"
                          :backgroundColor="'rgb(246, 246, 246);'"
                          :isNoMarginRight="(index+1)%4 === 0"
                          :title="item.title"
                          :lineHeight="'2'"
                          :img="item.thumb"
                          :url="/#/ + $route.params.type + '/' + item.id"
        ></image-title-rate>
      </div>
    </template>
    </div>
    <div style="float: right; margin-top: 20px">
      <Page  show-elevator show-sizer :total="total" :page-size="pageSize" :current="1" @on-change="_changePage" @on-page-size-change="_changePageSize"></Page>
    </div>
  </div>
</template>

<script>
  import {getUserFav} from 'api/common';
  import ImageTitleRate from 'base/image-title-rate/image-title-rate'
  export default {
    data() {
      return {
        data: [],
        dataTotal:[],
        total: 0,
        pageSize: 12,
      }
    },
    created(){
      this._getFavList();
    },
    methods:{
      _changePageSize(even){
        this.pageSize = even;
      },
      _changePage(even){
        this.data = this.dataTotal.slice( (even-1)*this.pageSize , even*this.pageSize);
      },
      _getFavList() {
        getUserFav(this.$route.params.id,this.$route.params.type).then(res => {
          this.dataTotal = res.data;
          this.data = this.dataTotal.slice(0,this.pageSize);
          this.total = this.dataTotal.length;
        })
      }
    },
    components:{
      ImageTitleRate
    },
    watch: {
      '$route': function (route) {
        this._getFavList();
      },
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  .kkz-fav{
    box-sizing: border-box;
    padding: 0 10px;
  }
</style>