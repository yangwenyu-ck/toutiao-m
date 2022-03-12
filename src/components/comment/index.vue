<template>
    <van-list
        v-model="loading"
        :finished="finished"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        finished-text="没有更多了"
        @load="onLoad"
        >
        <CommentsShow v-for="(obj,index) in list" :key="index" :list="obj"></CommentsShow>
    </van-list>
</template>

<script>
import {getCommentsAPI} from "../../api";//文章评论
import CommentsShow from "./CommentsShow";//引入评论展示组件
export default {
    data() {
        return {
        list: [],
        loading: false,
        finished: false,
        offset:null,
        error: false,//错误提示
        };
    },props:{
        articleId:{
            type:[Number,String],
            required:true
        }
    },
    created(){
        //进入页面就立即获取数据
        this.onLoad()
    },
    methods: {
        async onLoad() {
            try{
                //1.获取数据
                const res = await getCommentsAPI({
                    type: 'a', // 评论类型，a-对文章(article)的评论，c-对评论(comment)的回复
                    source: this.articleId, // 源id，文章id或评论id
                    offset: this.offset, // 获取评论数据的偏移量，值为评论id，表示从此id的数据向后取，不传表示从第一页开始读取数据
                    limit: 10 // 每页大小
                })
                // console.log(res);
                //添加数据
                const {results} = res.data.data
                this.list.push(...results)

                //添加数据成功后 往父元素传点赞评论总数
                this.$emit("linkall",res.data.data)
                //关闭loading加载状态
                this.loading = false;
                //判断是否还有数据
                if(results.length){
                    this.offset = res.data.data.last_id
                }else{
                    //如果没有就关闭finished
                    this.finished = true;
                }
                //如果有继续添加
                
            }catch(err){
                console.log(err);
                // this.$toast.success('取消点赞')
                this.error = true //开启错误提示
                //关闭loading加载状态
                this.loading = false;
            }
        },
    },
    components:{
        CommentsShow
    }
}
</script>

<style>

</style>