<template>
  <div class="home-container">
    <!-- 搜索按钮 -->
    <van-nav-bar class="page-nav-bar" fixed>
      <van-button type="info" slot="title" class="search-btn" round to="/search">
        <van-icon name="search" class="icon"/>
        搜索
      </van-button>
    </van-nav-bar>
    <!-- /搜索按钮 -->
    <!-- 频道列表 -->
    <!-- 通过 animated 属性可以开启切换标签内容时的转场动画。 -->
    <!-- 通过 swipeable 属性可以开启滑动切换标签页。 -->
    <van-tabs v-model="activeName" class="channel" 
    animated swipeable
     >
      <van-tab :title="obj.name" v-for="obj in channelUser" 
      :key="obj.id"
      :name="obj.name"
      >
        <!-- 频道内容组件挂载地 -->
        <netcaster :channel="obj"></netcaster>
      </van-tab >
      <van-tab title="将夜">“模拟数据”---将夜</van-tab>
      <van-tab title="怨气撞铃">“模拟数据”---怨气撞铃</van-tab>
      <van-tab title="三线轮回">“模拟数据”---三线轮回</van-tab>
      <van-tab title="七根凶筒">“模拟数据”---七根凶筒</van-tab>
      <van-tab title="龙骨焚箱">“模拟数据”---龙骨焚箱</van-tab>
      <div slot="nav-right" class="gengduo" @click="showPopup">
        <i class="iconfont icon-gengduo"></i>
      </div>
      <div slot="nav-right" class="zhanwei"></div>
    </van-tabs>
    <!-- /频道列表 -->

    <!-- 更多频道列表 -->
    <van-popup v-model="show"  
    position="bottom" 
    :style="{ height: '100%' }"
    closeable
    close-icon-position="top-left"
    >
      <channelList :myChannel="channelUser" :active="activeName" @qie_huan="qie_huan"></channelList>
    </van-popup>
    <!-- /更多频道列表 -->
  </div>
</template>

<script>
import {getUserChannelsAPI} from "../../api";//该接口
import netcaster from "./components/netcaster.vue"//频道内容组件
import channelList from "./components/channelList.vue"//引入频道列表展示组件
import {mapState} from "vuex";
import {dataFetch} from "../../utils/storage";//取本地数据

export default {
  data(){
    return {
      activeName:"推荐",//控制频道tab栏切换
      channelUser:Array,//我的频道数组
      show:false,//控制频道列表显示与隐藏
    }
  },
  created(){
    this.loadChannels()
  },
  methods:{
    async loadChannels() { //获取频道列表数据
      //获取数据前先判断是否登录 
      if(this.user){
        //是 获取用户频道 
        const res = await getUserChannelsAPI();
        console.log(res);
        console.log("获取频道列表成功");
        this.channelUser = res.data.data.channels
        console.log(this.channelUser);
      }else{
        //查看是否有本地储存频道列表 是 获取本地
        let channel = dataFetch("TOUTIAO_LIEBIAO");
        if(channel){
          //如果有数据让this.channelUser 等于该本地数据
          this.channelUser = channel ;
        }else{
          //否 获取推荐频道数据 获取默认推荐的频道列表
          const { data } = await getUserChannelsAPI()
          this.channelUser = data.data.channels
        }
      }
      


    },
    showPopup(){//控制频道列表显示隐藏
      this.show = true ;
    },
    qie_huan(name){
      // console.log(index);
      //根据名字切换 列表内容页 
      this.activeName=name;
      this.show = false ;
      // console.log(this.activeName);
    }
  },
  components:{
    netcaster,
    channelList
  },
  computed:{
    ...mapState(['user'])
  }
}
</script>

<style scoped lang="less">
.home-container{
  padding-bottom: 100px;//看到组件 加载状态
  .page-nav-bar{//顶部搜索框
      /deep/ div.van-nav-bar__title{
        max-width: 100%!important;//控制按钮最大宽度
        min-width: 100%;
        .search-btn{
          width: 555px;
          height: 64px; 
          background-color: #5babfb;
          border: none;
          font-size: 28px;
          .icon{
            color: #fff;
            font-size: 32px;
          }
        }
      }
  }
  /deep/.channel{// /deep/ 深度影响 所有的后代节点
    padding-top: 210px;
    padding-bottom: 100px;
    // .van-tabs__nav{
    //   border-bottom: 1px solid #edeff3;
    // }
    .van-tabs__wrap{
      position: fixed;
      top: 107px;
      z-index: 1;
      left: 0;//必须加
      right: 0;//必须加
    }
    .van-tabs__nav--line{
      padding-bottom: 0;
      .van-tab{
        min-width: 200px;
        // height: 82px;暂时不加
        border-right: 1px solid #edeff3;
        .van-tab__text{
          font-size: 30px;
          color: #777777;
        }
      }
      .van-tab--active{//选中的盒子字体颜色
        .van-tab__text{
          color: #333333;
        }
      }
      .van-tabs__line{
        bottom: 9px;
        width: 31px;
        height: 6px;
        background-color: #3296fa;
      }
      .gengduo{//更多
        position: fixed;
        right: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 70px;
        height: 102px;
        background-color: #fff;
        opacity: 0.902;
        i{
          font-size: 34px;
        }
        &::before{
          content: "";
          position: absolute;
          left: 0;
          width: 1px;
          height: 100%;
          background-image: url(~@/assets/gradient-gray-line.png);
          background-size: contain;
        }
      }
      .zhanwei{//占位盒子
        flex-shrink: 0;//不加入到flex布局计算中
        width: 53px;
        height: 82px;
      }
    }
  }
}
</style>