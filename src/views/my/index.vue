<template>
  <div class="my-container">
    <!-- 已登陆状态 -->
    <!-- 上头像区域 -->
    <div class="loginBox finish" v-if="user">
      <div class="finish-top">
        <div class="name-img">
            <van-image
              class="name-image"
              round
              width="70"
              height="70"
              src="https://img01.yzcdn.cn/vant/cat.jpeg"
            />
            <span>红眼兔子怪</span>
        </div>
        <van-button round type="info" class="btn">
          <span>编辑资料</span>
        </van-button>
      </div>
      <div class="finish-bottom">
        <div>
          <span>{{userObj.art_count}}</span>
          <div>头条</div>
        </div>
        <div>
          <span>{{userObj.follow_count}}</span>
          <div>关注</div>
        </div>
        <div>
          <span>{{userObj.fans_count}}</span>
          <div>粉丝</div>
        </div>
        <div>
          <span>{{userObj.like_count}}</span>
          <div>获赞</div>
        </div>
      </div>
    </div>
    <!-- /已登陆状态 -->
    <!-- 未登录状态 -->
    <div class="loginBox" v-else>
      <van-image
        round
        cover
        class="loginBox-img"
        src="../../assets/mobile.png"
        @click="$router.push('/login')"
      />
      <span>点击登录</span>
    </div>
    <!-- 未登录状态 -->
    <!-- /上头像区域 -->
    <!-- 宫格导航 -->
    <van-grid :column-num="2" clickable>
      <van-grid-item>
        <i slot="icon" class="iconfont icon-shoucang"></i>
        <span slot="text">收藏</span>
      </van-grid-item>
      <van-grid-item>
        <i slot="icon" class="iconfont icon-shouye"></i>
        <span slot="text">历史</span>
      </van-grid-item>
    </van-grid>
    <!-- /宫格导航 -->
    <!-- 消息通知 -->
    <van-cell-group >
      <van-cell title="消息通知" is-link  />
      <van-cell title="小兔同学" is-link  />
    </van-cell-group>
    <van-cell-group v-if="user">
      <van-cell title="退出登录" 
      class="esc" 
      center 
      clickable
      @click="quitFn"
      />
    </van-cell-group>
    <!-- /小智同学 -->
    <!-- <button @click="btn">222</button> -->
  </div>
</template>

<script>
import {mapState} from "vuex";//获取vuex共享数据
import {getUserInfoAPI} from "../../api"//获取用户基本数据
export default {
  data(){
    return {
      userObj:Object,
    }
  },
  created(){
    if(this.userObj){
      //在挂载阶段就 判断 该数据是否为空 如果为空就调用此方法
      this.loadUserInfo()
    }
  },
  computed:{
    ...mapState(['user'])
  },
  methods:{
    quitFn(){//推出按钮
      // 在函数内需要this.$调用
      this.$dialog.confirm({
        title: '退出提示',
        message: '确认退出吗？',
      })
        .then(() => {
          //退出 就清除 vuex内的共享 数据
          this.$store.commit('setUser',null);
          // 调用方法 让vuex数据等于null 然后方法内已经定义 同时让本地存储也等于空
        })
        .catch(() => {
          //这里填 点击取消按钮后的操作
        });
    },
    async loadUserInfo(){//获取用户信息方法 暂时不可用
      const res = await getUserInfoAPI();
      // console.log(res);
      this.userObj = res.data.data;
      console.log(this.userObj);
      console.log("用户信息");
      
    }
  },
  
}
</script>

<style scoped lang='less'>
.my-container{
  *{
    caret-color: rgba(0, 0, 0, 0);
  }
  .loginBox{
    height: 361px;
    background:url("~@/assets/banner.png") no-repeat;
    background-size: cover;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .loginBox-img{
      width: 132px;
      height: 132px;
      margin-bottom: 10px;
    }
    span{
      font-size: 12px;
      color: #fff;
    }
    
  }
  .finish{
    .finish-top{
      display: flex;
      width: 100%;
      height: 231px;
      justify-content: space-between;
      align-items: center;
      .btn{
        width: 190px;
        margin-right: 30px;
        height: 65px;
        background-color: rgb(245, 240, 240);
        span{
          color: rgb(22, 21, 21);
        }
      }
      .name-img{
        display: flex;
        justify-content: center;
        align-items: center;
        .name-image{
          border: 4px solid #fff;
          margin-left: 50px;
          margin-right: 23px;
        }
      }
    }
    .finish-bottom{
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      align-items: center;
      width: 100%;
      height: 130px;
      // background-color: rgb(124, 120, 121);
      div{
        text-align: center;
        color: #fff;
        span{
          font-size: 30px;
        }
        div{
          font-size: 30px;

        }
      }
    }
  }
  .icon-shoucang{
    color:#e77f7c;
    font-size: 50px;
  }
  .icon-shouye{
    color: #f2aa56;
    font-size: 50px;
  }
  .esc{
    text-align: center;
    margin-top: 9px;
    color: #e77f7c;
  }
}
</style>