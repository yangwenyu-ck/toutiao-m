<template>
  <div class="article-list">
    <van-pull-refresh 
        v-model="isLoading" 
        @refresh="onRefresh"
        :success-text="suggest"
        :success-duration="1000"
    >
        <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            :error.sync="error"
            error-text="请求失败，点击重新加载"
            @load="onLoad"
            >
            <van-cell-group v-for="(item,index) in artlist" 
            :key="index" 
            class="itme"
            >
                <van-cell :to="{ 
                    //根据路由名称（name）进行跳转
                    name: 'article', 
                    params: { 
                        //路由设置的参数名称传参
                        articleId: item.art_id
                    }}">
                    <div slot="title" class="item_title van-multi-ellipsis--l2">{{item.title}}</div>
                    <div slot="title" v-if="item.cover.type == 3" class="item_3">
                        <van-image
                        fit="cover"
                        :src="item.cover.images[0]"
                        />
                        <van-image
                        fit="cover"
                        :src="item.cover.images[1]"
                        />
                        <van-image
                        fit="cover"
                        :src="item.cover.images[2]"
                        />
                    </div>
                    <div slot="label" class="item_span">
                        <span>{{item.aut_name}}</span>
                        <span>{{item.comm_count}}评论</span>
                        <span>{{item.pubdate | relativeTime}}</span>
                    </div>
                    <div slot="default" v-if="item.cover.type == 1" class="item_1">
                        <van-image
                        fit="cover"
                        :src="item.cover.images[0]"
                        />
                    </div>
                </van-cell>
            </van-cell-group>
        </van-list>
    </van-pull-refresh>
      
  </div>
</template>

<script>
import {getArticlesAPI} from "../../../api"
export default {
    data(){
        return{
            error: false,//加载数据失败后的提示
            loading: false,
            finished: false,
            // 文章列表的数组
            artlist: [],
            timestamp:null,//时间截
            isLoading: false,
            suggest:"刷新成功"
        }
    },
    props: {
        //频道内容数据条件
        channel: {
            type: Object,
            required: true
        }
    },
    methods: {
        async onLoad(){//触底时触发
            //1.获取数据
            const res = await getArticlesAPI({
                // 传入获取数据时所需要的参数
                channel_id:this.channel.id,//获取的频道id
                timestamp: this.timestamp || Date.now(),//时间戳，请求新的推荐数据传当前的时间戳，请求历史推荐传指定的时间戳
                with_top:1//顶部置顶 1为有指定内容 0为没有
            })
            // console.log(res+"单频道内容数据");
            try{
                 // 2. 把数据添加到 list 数组中
                const { results } = res.data.data
                this.artlist.push(...results)//...相当于把数据results[0],results[1] 一个一个push到数组尾部
                //3添加数据成功后关闭加载阀门  触底会自动开启,
                // 设置本次加载中 loading 状态结束
                this.loading = false
                //4当获取数据没有变化时 提示开关开启
                if (results.length) {
                    // 更新获取下一页数据的时间戳
                    this.timestamp = res.data.data.pre_timestamp
                } else {
                    // 没有数据了，设置加载状态结束，不再触发上拉加载更多了
                    this.finished = true
                }

            }catch(err){
            //5失败后 在底部提醒用户 加载失败
                console.log(err)
                this.loading = false // 关闭 loading 效果
                this.error = true // 开启错误提示
            }
        },
        async onRefresh() {//下拉触发
            //1获取最新数据
            const res = await getArticlesAPI({
                // 传入获取数据时所需要的参数
                channel_id:this.channel.id,//获取的频道id
                timestamp:this.timestamp,//这里传入最新时间 获取最新数据 Date.now() `传入返回的时间截
                with_top:1//顶部置顶 1为有指定内容 0为没有
            })
            try{
                //2.把数据放到数组中最前面
                // console.log(res);
                const {results} = res.data.data
                this.artlist.unshift(...results);
                console.log(this.artlist);
                //3.关闭下拉刷新效果
                //成功了提示
                this.suggest = "刷新成功" + results.length + "条数据"
                this.isLoading = false ; //触发时会自动设为true
            }catch{
                //失败了提示
                this.suggest = "刷新失败"

            }
        },
    },

}
</script>

<style scoped lang="less">
.article-list{
    //因为现在每个组件滑动的时候都是用home的body的盒子储存盒子的上下偏移量
    //这样导致我们的每个组件都会停在上一个组件停留的偏移位置 所以
    //要给这个组件内设置一个单独的高度 就可以让每个被调用的组件都可以储存自己的偏移量
    //vw/vh计算单位 分别是把屏幕的宽高取百分之一 作为计算单位
    //例 屏幕为750宽 那个1vw就是7.5px
    height: 79vh;
    overflow-y: auto;
    .item_title{
        font-size: 32px;
        color: #3a3a3a;
    }
    .van-cell__value{
        flex: unset;
            width: 233px;
            height: 147px;
        .item_1{
            width: 233px;
            height: 147px;
        }
    }
    .item_span{
        font-size: 23px;
        color: #b4b4b4;
        :nth-child(1){
            margin-right: 25px;
        }
        :nth-child(2){
            margin-right: 25px;
        }
    }
    .item_3{
        display: flex;
        margin: 23px 0;
        :nth-child(1){
            margin-right: 4px;
        }
        :nth-child(2){
            margin-right: 4px;
        }
        .van-image{
            flex: 1;
            width: 233px;
            height: 147px;
        }
    }

}
</style>