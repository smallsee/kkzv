<template>
  <div class="kkz-commit">
    <template v-if="data.length > 0">
      <template v-for="(item,index) in data">
        <div class="commit-box">
          <commit :time="''"
                  :imgSize="'50px'"
                  :img="item.user.thumb"
                  :userUrl="'#/user/' + item.user.id"
                  :videoTitle="item.commit_title"
                  :userName="item.user.name"
                  :commitText="item.content"
          ></commit>
        </div>
      </template>
      <div style="float: right; margin-top: 20px">
        <Page  show-elevator show-sizer :total="total" :page-size="pageSize" :current="1" @on-change="_changePage" @on-page-size-change="_changePageSize"></Page>
      </div>
    </template>
    <div class="no_data" v-if="data.length === 0">
      暂时没有数据
    </div>
  </div>
</template>

<script>
  import {getUserCommit} from 'api/common';
  import Commit from 'base/commit/commit'
  export default {
    data() {
      return {
        data: [],
        dataTotal:[],
        total: 0,
        pageSize: 5,
      }
    },
    created(){
      this._getCommitList();
    },
    methods:{
      _changePageSize(even){
        this.pageSize = even;
      },
      _changePage(even){
        this.data = this.dataTotal.slice( (even-1)*this.pageSize , even*this.pageSize);
      },
      _getCommitList() {
        getUserCommit(this.$route.params.id,this.$route.params.type).then(res => {
          this.dataTotal = res.data;
          this.data = this.dataTotal.slice(0,this.pageSize);
          this.total = this.dataTotal.length;
        })
      }
    },
    components:{
      Commit
    },
    watch: {
      '$route': function (route) {
//        console.log(route);
//        var query = route.query;
//        this.page = query.page;
        this._getCommitList();
      },
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  .kkz-commit{
    .commit-box{
      box-sizing: border-box;
    }
  }
</style>