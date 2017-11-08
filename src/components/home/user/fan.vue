<template>
  <div class="kkz-fan">

    <div v-if="data.length > 0">
      <template v-for="(item,index) in data" >
        <div class="user-item flex-row-between">
          <div class="user flex-row">
            <a :href="'/#/user/' + item.id">
            <div class="thumb">
              <img v-lazy="item.thumb" alt="">
            </div>
            </a>
            <a :href="'/#/user/' + item.id" class="name">
              {{item.name}}
            </a>
          </div>
          <div class="star-type">
            关注
          </div>
        </div>
      </template>
      <div style="float: right; margin-top: 20px">
        <Page  show-elevator show-sizer :total="total" :page-size="pageSize" :current="1" @on-change="_changePage" @on-page-size-change="_changePageSize"></Page>
      </div>
    </div>
    <div class="no_data" v-if="data.length === 0">
      暂时没有数据
    </div>
  </div>

</template>

<script>
  import {getUserFan} from 'api/common';
  import {ERR_OK} from 'api/config';
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
      this._getFanList();
    },
    methods:{
      _changePageSize(even){
        this.pageSize = even;
      },
      _changePage(even){
        this.data = this.dataTotal.slice( (even-1)*this.pageSize , even*this.pageSize);
      },
      _getFanList() {
        let type = this.$route.params.type === 'fan' ? 'star_id' : 'fan_id';

        getUserFan(this.$route.params.id,type).then(res => {
          if (res.meta.errno === ERR_OK){
            this.dataTotal = res.data;
            this.data = this.dataTotal.slice(0,this.pageSize);
            this.total = this.dataTotal.length;
          }
        })
      }
    },
    components:{

    },
    watch: {
      '$route': function (route) {
        this._getFanList();
      },
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  .kkz-fan{
    box-sizing: border-box;
    padding: 0 10px;
    .user-item{
      width: 100%;
      box-sizing: border-box;
      padding: 5px;
      border-bottom: 1px solid #eee;
      .user{
        box-sizing: border-box;
        padding: 10px 0;
        .thumb{
          width: 50px;
          height: 50px;
          border-radius: 50%;
          overflow: hidden;
          img{
            width: 100%;
            height: 100%;
          }
        }
        .name{
          margin-left: 10px;
          font-size: 18px;
          line-height: 25px;
        }

      }
      .star-type{
        margin-top: 30px;
        text-align: center;
        display: block;
        padding: 6px 10px;
        height: 24px;
        background: #F6697A;
        border-radius: 5px;
        font-size: 12px;
        color: white;
        cursor: pointer;
      }
    }
    .no_data{
      box-sizing: border-box;
      padding-top: 20px;
      font-size: 18px;
      line-height: 20px;
    }
  }
</style>