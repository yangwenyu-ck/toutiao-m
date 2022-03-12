<template>
  <div>
    <van-list
      v-model="loading"
      :finished="finished"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell v-for="(item,index) in list" :key="index" :title="item.title" />
    </van-list>
  </div>
</template>

<script>
import {getSearchAPI} from "../../../api";//获取搜索结果
export default {
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      error: false,//错误提示
      page:1,//页码
      perPage:20//每页加载的数据
    };
  },
  props:{
    q:{
      type:String,
      required:true
    }
  },
  methods: {
    async onLoad() {
      //当组件滚动到底部时 自动触发
      try{
        //先获取数据
        const res = await getSearchAPI({
          page: this.page, // 页码
          per_page: this.perPage, // 每页大小
          q: this.q // 搜索关键字
        })
        //把数据放到数组内
        const {results} = res.data.data
        if (results.length) {
          this.list.push(...results);
          this.page++;
        }else{
          this.finished = true
        }
        // console.log(this.list);
        //渲染到页面
        // 把loading加载状态改为false
        this.loading=false
        //让获取页码变量自加1
      }catch(err){
        // 出现错误时也要把loading改为false
        this.loading=false
        //出现错误时开启错误提醒
        this.error = true;
      }
    }
  },
  watch:{
    q:{
      //立即侦听 网页打开时侦听一次
      immediate:true,
      handler(newval){
          //当输入框内的值变化时 让页数变为1
          this.page = 1 ;
      }
    }
  },

}
</script>

<style>

</style>