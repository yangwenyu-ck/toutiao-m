<template>
<!-- 文章详情页 -->
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      left-arrow
      left-text="返回"
      title="黑马头条"
      @click-left="fanhui"
    ></van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap">
      <!-- 加载中 -->
      <div class="loading-wrap" v-if="isShow">
        <van-loading
          color="#3296fa"
          vertical
        >加载中</van-loading>
      </div>
      <!-- /加载中 -->

      <!-- 加载完成-文章详情 -->
      <div class="article-detail" v-else-if="article.title">
        <!-- 文章标题 -->
        <h1 class="article-title">{{article.title}}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            :src="article.aut_photo"
          />
          <div slot="title" class="user-name">{{article.aut_name}}</div>
          <div slot="label" class="publish-date">{{article.pubdate | relativeTime}}</div>
          
          <!-- 关注按钮 组件挂载 -->
          <!-- 模板中的$event 是事件参数 -->
          <!-- 当我们传递给子组件的数据既要使用还要修改 
              传递 props
              :article="article.is_followed"
              修改 自定义事件
              @gaiFn="article.is_followed = $event"
              简单写法 v-model
              相当于写了
              value="article.is_followed"
              input="article.is_followed = $event"  子组件无需接受相当于直接 存在value 和 input 事件

          -->
          <attention
            :article="article"
            @gaiFn="article.is_followed = $event"
          ></attention>
          <!-- 关注按钮 组件挂载 -->

        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <div class="article-content" 
        v-html="article.content"
        ref="article-content"
        ></div>
        <van-divider>正文结束</van-divider>

        <!-- 评论组件挂载 -->
        <comment :articleId="articleId" @linkall="linkall = $event.total_count"></comment>
        <!-- 评论组件挂载 -->

        <!-- 底部区域 -->
        <div class="article-bottom">
          <van-button
            class="comment-btn"
            type="default"
            round
            size="small"
            @click="showPopup"
          >写评论</van-button>
          <van-icon
            name="comment-o"
            :badge="linkall"
            color="#777"
          />
          <!-- <van-icon
            color="#777"
            name="star-o"
          /> -->
          <!-- 收藏组件挂载 -->
          <collect :isshow="article.is_collected" 
          :id="article.art_id"
          @collectFn="article.is_collected = $event"
          ></collect>
          <!-- 收藏组件挂载 -->

          <!-- <van-icon
            color="#777"
            name="good-job-o"
          /> -->

          <!-- 点赞组件挂载地 -->
          <like :id="article.art_id" 
          :attitude="article.attitude"
          @addFn="article.attitude = $event"></like>
          <!-- 点赞组件挂载地 -->

          <van-icon name="share" color="#777777"></van-icon>
        </div>
        <!-- /底部区域 -->

        <!-- 评论弹出层 -->
        <van-popup 
        v-model="show"
        position="bottom"
        >
          <popups @guanbi="show = $event"></popups>
        </van-popup>
        
        <!-- 评论弹出层 -->
      </div>
      <!-- /加载完成-文章详情 -->

      <!-- 加载失败：404 -->
      <div class="error-wrap" v-else-if="required == 404">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div class="error-wrap" v-else>
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button class="retry-btn"
        @click="loadArticle"
        >点击重试</van-button>
      </div>
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
    </div>

    
  </div>
</template>

<script>
import {getArticleByIdAPI} from "../../api";//获取文章数据接口
import { ImagePreview } from 'vant';
import attention from "../../components/attention";//关注组件
import collect from "../../components/collect";//收藏组件
import like from "../../components/Like";//点赞
import comment from "../../components/comment";//评论组件
import popups from "../../components/popups"//弹出层
export default {
  name: 'ArticleIndex',
  components: {},
  props: {
    articleId: {
      type: [Number, String],
      required: true
    }
  },
  data () {
    return {
      article:Object,//文章内容数组
      isShow:true,//加载状态显示隐藏
      iselseShow:0, //加载状态显示隐藏
      is_show_loading: false,//关注按钮加载状态 默认为隐藏
      linkall:0,
      show: false,//控制评论弹出层显示隐藏
    }
  },created () {
    this.loadArticle()
  },
  mounted () {},
  methods: {
   async loadArticle () {
      //重新加载按钮 调用此方法
      //先让加载状态显示框显示
      this.isShow = true ;
      try {
        const { data } = await getArticleByIdAPI(this.articleId)
        //数据驱动视图这件事不是立即的
        this.article = data.data;

        //初始化图片点击预览  定义一个定时器
        setTimeout(() => {
          this.PreviewImage()
        }, 0);

        //再数据添加成功后 加载框隐藏
        this.isShow = false;
        // console.log(this.article);
      } catch (err) {
        //失败后查看返回的数据中是否存在404
        if(err.response && err.response.status === 404){
          this.iselseShow = 404 ;//开始错误提示
        }
        console.log(err)
      }
    },
    PreviewImage(){
      //得到所有的img节点
      const articleContent = this.$refs['article-content'];
      //类似于 const articleContent = document.querySelector('.类名')
      const imgs = articleContent.querySelectorAll('img');
      const images = [];
      imgs.forEach((img,index) => {
        images.push(img.src)
        img.onclick = () => {
          ImagePreview({
            //预览的图片地址数组
            images,
            //起始位置 从0开始
            startPosition: index,
          });
        }
      });
    },
    fanhui(){//退回页面
      // console.log(11);
      this.$router.back();
    },
    showPopup() {
      this.show = true;
    },
  },
  components:{
    attention,
    collect,
    like,
    comment,
    popups
  }
}
</script>

<style scoped lang="less">
.article-container {
  // max-width: 375px;
  /deep/.page-nav-bar{
    .van-nav-bar__left{
      .van-nav-bar__text{
        color: #fff9f9;
      }
      .van-icon{
        color: #f0ecec;
      }
    }
    
  }
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 32px;
      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 170px;
        height: 58px;
      }
    }

    .article-content {
      max-width: 100%;
      padding: 55px 32px;
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }
    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
    .van-icon {
      font-size: 40px;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
  }
}
</style>
