<template>
    <div>

      <div class="search  margin-bottom-20">
        <Input size="small" v-model="searchText" @on-change="searchTitle" @on-enter="searchTitle" @on-click="searchTitle" icon="search" placeholder="请输入搜索标题..." style="width: 200px"></Input>
      </div>

            <Table  size="small" border :columns="columns7" :data="data" ref="table"></Table>
                <div style="margin: 10px;overflow: hidden">
                    <div style="float: right;">
                        <Page  show-elevator show-sizer :total="total" :page-size="pageSize" :current="1" @on-change="_changePage" @on-page-size-change="_changePageSize"></Page>
                    </div>
                </div>

      <Button type="primary" size="large" @click="exportData(1)"><Icon type="ios-download-outline"></Icon> 导出原始数据</Button>
      <Button type="primary" size="large" @click="exportData(2)"><Icon type="ios-download-outline"></Icon> 导出排序和过滤后的数据</Button>
      <Button type="primary" size="large" @click="exportData(3)"><Icon type="ios-download-outline"></Icon> 导出自定义数据</Button>


      <Modal v-model="delModel" width="360">
        <p slot="header" style="color:#f60;text-align:center">
          <Icon type="information-circled"></Icon>
          <span>删除确认</span>
        </p>
        <div style="text-align:center">
          <p>此任务删除后</p>
          <p>是否继续删除？</p>
        </div>
        <div slot="footer">
          <Button type="error" size="large"  @click="del">删除</Button>
        </div>
      </Modal>

      <Modal title="查看图片" v-model="visible">
        <img :src="imgName" v-if="visible" style="width: 100%">
      </Modal>

      <Back-top :height="50"></Back-top>
    </div>
</template>

<script>
  import {getTvList, deleteTv} from 'api/tv';
  import {ERR_OK} from 'api/config';

  export default {
    data () {
      return {
        delModel: false,
        readyDel: 0,
        visible: false,
        imgName: '',
        searchText: '',
        columns7: [
          {
            title: 'id',
            key: 'id',
            sortable: true
          },
          {
            title: '标题',
            key: 'title'
          },
          {
            title: '缩略图',
            key: 'thumb',
            width: 100,
            align: 'center',
            render: (h, params) => {
              return h('img', {
                style: {
                  width: '50px',
                  height: '50px',
                },
                attrs: {
                  src:  this.data[params.index].thumb
                },
                on: {
                  click: () => {
                    this.showImg(params.index)
                  }
                }
              });
            }
          },
          {
            title: '国家',
            key: 'country',
          },
          {
            title: '明星',
            key: 'star'
          },
          {
            title: '类型',
            key: 'tag'
          },
          {
            title: '集数',
            key: 'episodes'
          },
          {
            title: '观看人数',
            key: 'see',
            sortable: true,
            filters: [
              {
                label: '大于500',
                value: 1
              },
              {
                label: '小于500',
                value: 2
              }
            ],
            filterMultiple: false,
            filterMethod (value, row) {
              if (value === 1) {
                return row.see > 500;
              } else if (value === 2) {
                return row.see < 500;
              }
            }
          },
          {
            title: '操作',
            key: 'action',
            width: 200,
            align: 'center',
            render: (h, params) => {

              return h('div', [

                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.show(params.index)
                    }
                  }
                }, '查看'),
                h('Button', {
                  props: {
                    type: 'info',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.update(params.index)
                    }
                  }
                }, '修改'),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.openDelModel(params.index)
                    }
                  }
                }, '删除')



              ])}
          }
        ],
        data: [],
        dataTotal:[],
        searchTitleData: [],
        total: 0,
        pageSize: 10
      }
    },
    created() {
      this._getTvList()
    },
    methods: {
      _changePageSize(even){
        this.pageSize = even;
      },
      _changePage(even){
        this.data = this.dataTotal.slice( (even-1)*this.pageSize , even*this.pageSize);
      },
      _getTvList() {
        getTvList().then((res) => {
            if (res.meta.errno === ERR_OK){
              this.dataTotal = this.$_.orderBy(res.data, 'id', 'desc');
              this.data = this.dataTotal.slice(0,this.pageSize);
              this.total = res.data.length;
            }else{
              this.$Message.error(res.message);
            }

        })
      },
      search (data, argumentObj) {
        let res = data;
        let dataClone = data;
        for (let argu in argumentObj) {
          if (argumentObj[argu].length > 0) {
            res = dataClone.filter(d => {
              return d[argu].indexOf(argumentObj[argu]) > -1;
            });
            dataClone = res;
          }
        }
        return res;
      },
      searchTitle() {


        if (this.searchText.length >  0){
          this.data = [];
          this.dataTotal.forEach((item) => {
            var title = item.title;
            if (title.indexOf(this.searchText) > 0) {
              this.data.push(item);
            }
          });
        }else{
          this.data = this.dataTotal.slice(0,this.pageSize);
          this.total = this.dataTotal.length;
        }
      },
      show (index) {
        this.$router.push({ path: '/tv/' + this.data[index].id, })
      },
      update (index) {
        this.$router.push({ path: '/admin/tv/' + this.data[index].id, })
      },
      openDelModel (index) {
        this.delModel = true;
        this.readyDel = index;

      },
      del() {
        deleteTv(this.data[this.readyDel].id).then(res => {
          if (res.meta.errno === ERR_OK){
            this.$Message.success(res.data);
            this.delModel = false;
            this.data.splice(this.readyDel, 1);
          }else{
            this.$Message.error(res.message);
          }
        })
      },
      showImg(index) {
          this.imgName = this.data[index].thumb;
          this.visible = true;
      },
      exportData (type) {
        if (type === 1) {
          this.$refs.table.exportCsv({
            filename: '原始数据'
          });
        } else if (type === 2) {
          this.$refs.table.exportCsv({
            filename: '排序和过滤后的数据',
            original: false
          });
        } else if (type === 3) {
          this.$refs.table.exportCsv({
            filename: '自定义数据',
            columns: this.columns7.filter((col, index) => index < 4),
            data: this.data.filter((data, index) => index < 4)
          });
        }
      }
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">

</style>
