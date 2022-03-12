<template>
    <van-icon
        color="#777"
        :name=" isshow ? 'star' : 'star-o'"
        loading
        @click="onadd"
    />
</template>

<script>
import {addCollectAPI,deleteCollectAPI} from "../../api";//添加取消收藏接口
export default {
    data(){
        return {
            loading:false
        }
    },
    props:{
        isshow:{
            type:Boolean,
            required:true
        },
        id:{
            type:[Number,Object,String],
            required:true
        }
    },
    methods:{
        async onadd(){
            this.loading = true ;//开启加载状态
            try{
                //判断value 
                if(this.isshow){
                    //如果为true则取消收藏
                    await addCollectAPI(this.id)
                    this.$toast.success('取消收藏')
                }else{
                    //如果为false则添加收藏
                    await deleteCollectAPI(this.id)
                    this.$toast.success('收藏成功')
                }
                //在父元素让 collected 取反
                this.$emit('collectFn' , !this.isshow)
            }catch(err){
                console.log(err);
                this.$toast.success('操作失败 ，请稍后重试')
            }
            this.loading = false ;//关闭加载状态
        }
    }
}
</script>

<style>

</style>