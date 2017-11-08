<template>
    <div class="layout" :class="{'layout-hide-text': spanLeft < 5}">

        <div class="layout-ceiling">
            <div class="layout-ceiling-main">
                <a href="#">注册登录</a> |
                <a href="#">帮助中心</a> |
                <a href="#">安全中心</a> |
                <a href="#">服务大厅</a>
            </div>
        </div>
        <div class="layout-content">
            <Row type="flex">
            <i-col :xs="24" :sm="24" :md="4" :lg="4" class="layout-menu-left">
                <Menu active-name="1" theme="dark" width="auto">
                    <div class="layout-logo-left">

                    </div>
                    <template v-for="(item,index) in $router.options.routes">
                      <Submenu   :name="index+1" v-if="!item.hidden">
                        <template slot="title" >
                            <Icon type="ios-navigate"></Icon>
                            {{item.name}}
                        </template>
                        <template v-for="(child,mindex) in item.children" >
                          <Menu-item :name="child.index" v-if="!child.hidden">
                              <router-link tag="div" class="tab-item" :to="child.path">
                                  <div  @click="writeBreand(item.name, child.name)">{{child.name}}</div>
                              </router-link>
                          </Menu-item>
                        </template>
                    </Submenu>
                    </template>
                </Menu>
            </i-col>

            <i-col :xs="24" :sm="24" :md="20" :lg="20">
                <div class="layout-header">
                    <i-button type="text" @click="toggleClick">
                        <Icon type="navicon" size="32"></Icon>
                    </i-button>
                </div>
                <div class="layout-breadcrumb">
                    <Breadcrumb>
                        <Breadcrumb-item href="/admin">首页</Breadcrumb-item>
                        <Breadcrumb-item>{{$route.name}}</Breadcrumb-item>
                    </Breadcrumb>
                </div>
                <div class="layout-content">
                    <div class="layout-content-main">

                      <keep-alive>
                        <router-view v-if="!$route.meta.notKeepAlive"></router-view>
                      </keep-alive>
                      <router-view v-if="$route.meta.notKeepAlive"></router-view>

                    </div>
                </div>
            </i-col>

        </Row>
        </div>

        <div class="layout-copy">
            2011-2016 &copy; TalkingData
        </div>
    </div>
</template>

<script>
  export default {
    data () {
      return {
        spanLeft: 3,
        spanRight: 21,
        breadName: '',
        breadMName: ''
      }
    },
    computed: {
      iconSize () {
        return this.spanLeft === 5 ? 14 : 24;
      },
      mNmae (index, mindex) {
        return index + '-' + mindex
      }

    },
    methods: {
      writeBreand(name,mname) {
            this.breadName = name;
            this.breadMName = mname;
      },
      toggleClick () {
        if (this.spanLeft === 5) {
          this.spanLeft = 2;
          this.spanRight = 22;
        } else {
          this.spanLeft = 5;
          this.spanRight = 19;
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .layout{
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
    }
    .layout-logo{
        width: 100px;
        height: 30px;
        background: #5b6270;
        border-radius: 3px;
        float: left;
        position: relative;
        top: 15px;
        left: 20px;
    }
    .layout-header{
        height: 60px;
        background: #fff;
        box-shadow: 0 1px 1px rgba(0,0,0,.1);
    }
    .layout-copy{
        text-align: center;
        padding: 10px 0 20px;
        color: #9ea7b4;
    }
    .layout-ceiling{
        background: #464c5b;
        padding: 10px 0;
        overflow: hidden;
    }
    .layout-ceiling-main{
        float: right;
        margin-right: 15px;
    }
    .layout-ceiling-main a{
        color: #9ba7b5;
    }
    .layout-breadcrumb{
        padding: 10px 15px 0;
    }
    .layout-content{
        min-height: 200px;
        margin: 15px;
        overflow: hidden;
        background: #fff;
        border-radius: 4px;
    }
    .layout-content-main{
        padding: 10px;
    }
    .layout-copy{
        text-align: center;
        padding: 10px 0 20px;
        color: #9ea7b4;
    }
    .layout-menu-left{
        background: #464c5b;
    }
    .layout-header{
        height: 60px;
        background: #fff;
        box-shadow: 0 1px 1px rgba(0,0,0,.1);
    }
    .layout-logo-left{
        width: 90%;
        height: 30px;
        text-align: center;
      color: white;
      font-size: 20px;line-height: 30px;
        background: #5b6270;
        border-radius: 3px;
        margin: 15px auto;
    }
    .layout-ceiling-main a{
        color: #9ba7b5;
    }
    .layout-hide-text .layout-text{
        display: none;
    }
    .ivu-col{
        transition: width .2s ease-in-out;
    }
</style>
