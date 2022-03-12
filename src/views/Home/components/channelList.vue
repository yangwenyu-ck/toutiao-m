<template>
  <div class="channelList">
    <van-cell title="我的频道" class="title" :border="false">
        <van-button type="danger" size="small" round class="btn" 
        @click="isHidden = !isHidden">
            {{isHidden? "完成" : "编辑" }}
        </van-button>
    </van-cell>
    <!-- 我的频道 -->
    <van-grid class="channel_name channel_name_my" :column-num="4">
         <van-grid-item  v-for="(obj,index) in myChannel" 
         :key="index" 
         @click="onchannel(obj,obj.name,index)"
         >
            <span slot="text" :class="{active : obj.name == active}">{{obj.name}}</span>
            <van-icon slot="icon" name="clear" 
            v-show="isHidden && !fiexchannel.includes(obj.id)"></van-icon>
         </van-grid-item>
    </van-grid>
    <!-- /我的频道 -->
    <!-- 频道推荐 -->
    <van-cell title="频道推荐" class="title" :border="false"/>
    <van-grid class="channel_name channel_name_1" :column-num="4">
         <van-grid-item direction="horizontal" v-for="obj in recommend" 
         :key="obj.id"  
         :text="obj.name" 
         @click="addChannel(obj)"
         icon="plus"
         />
    </van-grid>
    <!-- /频道推荐 -->
  </div>
</template>

<script>
import {getAllChannelsAPI,addUserChannelAPI,deleteUserChannellAPI} from "../../../api";
import {mapState} from "vuex";
import {subdata} from "../../../utils/storage";
export default {
    data(){
        return{
            allChannels:Array,//所有频道
            isHidden:false,
            fiexchannel:[0]//固定不可删除频道
        }
    },
    props:{
        myChannel:{//我的频道
            typr:Array,
            required: true,
        },
        active:{
            typr:String,
            required: true,
        }
    },
    created(){
        this.gainAllChannels();
        // console.log(this.recommendChannels);
    },
    computed:{//计算属性 由所有频道 我的频道 计算出 推荐频道
        recommend(){//推荐频道
            //把所有频道内 我的频道 清除 得到的就是 推荐频道
            const rendChannels = [] ;
            //先遍历allChannels
            const allChannels=Array.from(this.allChannels);//将数组中以及伪数组转换为 真正的数组
            allChannels.pop();//因为最后一个由伪数组转换成的元素 无id元素  所以删除最后一个 伪数组元素
            allChannels.forEach((apiece)  => {
                //遍历所有的频道
                //每遍历一遍数组都查询 我的频道中是否有和该元素 相同的 如果 返回结果为true
                // findIndex()方法返回数组中满足提供的测试函数的第一个元素的索引。若没有找到对应元素则返回-1。
                const bolu = this.myChannel.findIndex(obj => {
                        return obj.id == apiece.id
                    });
                if(bolu == -1){
                    //当bolu不等于true 时证明数组中没有与该元素 相同的  那么在推荐数组中 添加该元素
                    rendChannels.push(apiece)
                }
            });
            return rendChannels ;

        },
        ...mapState(['user'])
    },
    methods:{
        async gainAllChannels(){
            const res = await getAllChannelsAPI();
            const {channels} = res.data.data
            this.allChannels = channels ;
            // console.log(this.allChannels);
        },
        async addChannel(Channel){
            //点击框 会把该元素传参到此  直接添加到 我的频道内
            this.myChannel.push(Channel);
            // 判断 在元素 添加到我的频道列表之后
            try{
                //进行判断 是否登录 如果登录 则存到线上 如果未登录 存储到本地
                if(this.user){
                    //如果不为空 则 已登陆
                    await addUserChannelAPI([{
                        id: Channel.id , // 频道 id
                        seq: this.myChannel.length // 频道的 序号
                    }])
                }else{
                    //如果未登录 存储到本地
                    subdata("TOUTIAO_LIEBIAO",this.myChannel);
                }
            }catch(err){
                console.log(err);
                console.log('添加频道失败');
            }
            
            
        },
        async onchannel(obj,name,index){//控制我的频道内的频道
            //判定如果是编辑状态  也就是 isHidden等于false时呈现 点击 去往该元素页面
            if(this.isHidden == false){
                this.$emit("qie_huan",name);
            }else{
                //如果是完成状态 isHidden等于true时 点击在我的频道内删除该元素 添加至 频道推荐
                if(index == 0){
                    //判断是否点击的推荐频道  推荐频道 不可删除
                    // console.log("推荐列表不可删除");
                    return
                }
                this.myChannel.splice(index,1);
                //数据在我的频道列表内删除后 计算属性察觉内部监听元素发生变化则会自动 计算一遍  则自动添加到推荐频道列表内
                    try{
                        // 判断是否登录  已登录存储到线上 未登录 存储到本地
                        if(this.user){
                            //如果不为空 则 已登陆
                            await deleteUserChannellAPI(obj.id);
                        }else{
                            //未登录 直接存储到本地 覆盖原数组
                            subdata("TOUTIAO_LIEBIAO",this.myChannel);
                        }
                    }catch(err){
                        console.log(err);
                        console.log("删除数据失败请稍后重试");
                    }
            }
            
        }
    }
}
</script>

<style scoped lang="less">
.channelList{
    padding: 84px 0;
    .title{
        font-size: 32px;
        color: #333333;
        margin-top: 20px;
        // border: 0;加入行内:border="false"
        .btn{
            width: 104px;
            height: 48px;
            color: #f86363;
            background-color: #fff;
            border: 1px solid #f86363;
        }
    }
    /deep/.channel_name{///deep/ 在自定义类名上使用 会深度影响 组件内自带的后代类名容器样式
        
        .van-grid-item__content{
            white-space: nowrap;//内容禁止折行
            width: 160px;
            height: 86px;
            margin-top: 29px;
            margin-left: 29px;
            background-color: #f4f5f6;
            .van-grid-item__text{
                font-size: 28px;
                color: #222;
                margin-top: 2px;
            }
        }
        
    }
    /deep/.channel_name_1{//推荐列表图表样式
        .van-grid-item__content--center{
            flex-direction: row;
            .van-grid-item__icon {
                font-size: 24px;
                margin-right: 6px;
            }
        }
    }
    /deep/.channel_name_my{//我的频道列表
        .van-grid-item__content--center{ 
            .van-grid-item__icon-wrapper {
                    position: none;
                .van-icon-clear {
                    position: absolute;
                    right: -90px;
                    top: -30px;
                    font-size: 26px;
                    z-index: 2;
                }
            }
        }
        
    }
    .active{
        color: red;
    }
    
}
</style>