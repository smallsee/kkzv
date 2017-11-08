<template>
  <div class="kkz-header ">
    <div class="w flex-row-between">
    <div class="flex-row">

      <a href="#" class="logo">
        <img src="./logo.png" alt="" height="40">
      </a>

      <a href="#" class="mascot">
        <img src="./icon64_maimeng1.png" alt="" height="40">
      </a>

      <span class="purpose">一个高逼格的
        <a href="">动漫社区</a>
      </span>
    </div>

    <div class="search">
      <Select v-model="searchTypeNow" style="width:60px" size="small">
        <Option v-for="item in searchType" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>

      <Input size="small" v-model="searchText" @on-enter="search" @on-click="search" icon="search" placeholder="请输入搜索内容..." style="width: 200px"></Input>
    </div>

    </div>
    <Modal
      v-model="isShowSearch"
      title="搜索结果"
      @on-ok="ok"
      @on-cancel="cancel">
      <p>搜索类型是{{searchTypeNow}},有{{searchData.length}}搜索结果,搜索关键词为{{searchText}}</p>
      <template v-for="(item,index) in searchData">
        <image-title-row
          :isBox="true"
          :isFlexEnd="true"
          :isShowText="false"
          :img="item.thumb"
          :title="item.title"
          :url="'/#/' + searchTypeNow + '/' + item.id"
        ></image-title-row>
      </template>

    </Modal>

  </div>
</template>

<script>
  import ImageTitleRow from 'base/image-title-row/image-title-row'
  import {getSearch} from 'api/common';
  import {ERR_OK} from 'api/config';

  export default {
    data() {
      return {
        searchData:[],
        searchText: '',
        isShowSearch: false,
        searchTypeNow: 'anime',
        searchType: [
          {
            value: 'anime',
            label: '动漫'
          },
          {
            value: 'movie',
            label: '电影'
          },
          {
            value: 'article',
            label: '文章'
          },
          {
            value: 'picture',
            label: '图片'
          },
          {
            value: 'tv',
            label: '电视剧'
          },
        ],
      }
    },
    methods: {
      search() {

        console.log(this.searchTypeNow);
        if (this.searchText){
          getSearch(this.searchTypeNow, this.searchText).then(res => {

            if (res.meta.errno === ERR_OK){
              this.searchData = res.data;
            }else{
              this.searchData = [];
            }

          });

          this.isShowSearch = true
        }else{
          this.$Message.info('请输入内容在提交吧');
        }

      },
      ok () {
        this.searchText = '';
      },
      cancel () {
        this.searchText = '';
      }
    },
    components: {
      ImageTitleRow
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  .kkz-header{
    background-color: #ffffff;
    box-sizing: border-box;
    padding: 10px 0;
    border-bottom: 1px solid rgba(0, 0, 0, 0.16);
    .logo{
      margin-right: 20px;
    }
    .mascot{
      margin-right: 50px;
    }
    .purpose{
      line-height: 40px;
      font-size: 14px;
    }
    .search{
      margin-top: 8px;
    }

  }
</style>