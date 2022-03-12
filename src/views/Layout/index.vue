<template>
  <div class="layout-container">
      <!-- <div>主题</div> -->
      <!-- 路由挂载 -->
      <router-view></router-view>
      <!-- /路由挂载 -->
      <!-- 底部导航 -->
      <van-tabbar class="layoutTabbar" route>
        <van-tabbar-item replace to="/" icon="home-o">
        <i slot="icon" class="iconfont icon-shouye"></i>
        <span>首页</span>
        </van-tabbar-item>
        <van-tabbar-item replace to="/qa" icon="search">
        <i slot="icon" class="iconfont icon-wenda"></i>
        <span>问答</span>
        </van-tabbar-item>
        <van-tabbar-item replace to="/video" icon="friends-o">
        <i slot="icon" class="iconfont icon-shipin"></i>
        <span>视频</span></van-tabbar-item>
        <van-tabbar-item replace to="/my" icon="setting-o">
        <i slot="icon" class="iconfont icon-wode"></i>
        <span>{{$store.state.user?'我的':'未登录'}}</span></van-tabbar-item>
      </van-tabbar>
      <!-- /底部导航 -->
  </div>
</template>

<script>
export default {
  data(){
    return {
    }
  }
}
</script>

<style scoped lang='less'>
.layout-container{
  .layoutTabbar{
    caret-color: rgba(0, 0, 0, 0);
  }
}
</style>