<template>
<!-- 关注按钮组件 -->
    <van-button
        v-if="article.is_followed"
        class="follow-btn"
        round
        :loading="is_show_loading"
        size="small"
        @click="attention"
    >已关注</van-button>
    <van-button
        v-else
        class="follow-btn"
        type="info"
        color="#3296fa"
        round
        :loading="is_show_loading"
        size="small"
        icon="plus"
        @click="attention"
    >关注</van-button>
</template>

<script>
import {addFollowAPI,deleteFollowAPI} from "../../api";//关注 取消接口
export default {
    data(){
        return{
            is_show_loading: false//关注按钮加载状态 默认为隐藏
        }
    },
    props:{
        article:{
            type:Object,
            required:true
        }
    },
    methods:{
        async attention(){
      //当点击操作开始时 显示
      this.is_show_loading = true ;
      try{
        if(this.article.is_followed){
          //判断如果是true 证明已关注
          //取消关注
          await deleteFollowAPI(this.article.aut_id)
        }else{
          //未关注 
          //关注
          await addFollowAPI(this.article.aut_id)
        }
        //让显示状态取反
        // this.article.is_followed = !this.article.is_followed ;
        // 子传夫 改变 该值 
        this.$emit("gaiFn",!this.article.is_followed)
      }catch(err){
        console.log(err)
        this.$toast.fail('操作失败')
      }
      //操作结束后隐藏
      this.is_show_loading = false ;
    }
    }
}
</script>

<style>

</style>