<template>
    <van-icon
        color="#777"
        loading
        :name="attitude == -1 ? 'good-job': 'good-job-o'"
        @click="addFn"
        :class="{ 'res' : attitude != 1}"
    />
</template>

<script>
import { addLikeAPI,deleteLikeAPI} from "../../api"
export default {
    data(){
        return{
            loading:false
        }
    },
    props:{
        attitude:{
            type:Number,
            required:true
        },
        id:{
            type:[Number,String],
            required:true
        }
    },
    methods:{
        async addFn(){
            this.loading = true;
            try{
                if(this.attitude == -1){
                    //如果等于-1证明没点赞
                    //那么点赞
                    await addLikeAPI(this.id);
                    this.$emit("addFn",1);
                    this.$toast.success('点赞成功')
                }else{
                    //如果不等于-1证明点赞了
                    //那么取消点赞
                    await deleteLikeAPI(this.id);
                    this.$emit("addFn",-1);  
                    this.$toast.success('取消点赞')

                }
            }catch(err){
                console.log(err);
                this.$toast.success('操作失败 请稍后重试')
            }
        }
    }
}
</script>

<style scoped lang="less">
    .res {
        color: rgb(235, 88, 20) !important;
    }
</style>