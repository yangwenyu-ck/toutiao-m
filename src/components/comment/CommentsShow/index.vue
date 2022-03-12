<template>
  <van-cell class="comment-item">
    <van-image
      slot="icon"
      class="avatar"
      round
      fit="cover"
      :src="list.aut_photo"
    />
    <div slot="title" class="title-wrap">
      <div class="user-name">{{list.aut_name}}</div>
      <van-button
        class="like-btn"
        @click="addlikeFn"
        :icon="list.is_liking ? 'good-job': 'good-job-o'"
      >{{list.like_count || "赞"}}</van-button>
    </div>

    <div slot="label">
      <p class="comment-content">{{list.content}}</p>
      <div class="bottom-info">
        <span class="comment-pubdate">{{list.pubdate | relativeTime}}</span>
        <van-button
          class="reply-btn"
          round
        >回复 {{list.reply_count}}</van-button>
      </div>
    </div>
  </van-cell>
</template>

<script>
import {addCommentLikeAPI,deleteCommentLikeAPI} from "../../../api"
export default {
  name: 'CommentItem',
  components: {},
  props: {
      list:{
          type:Object,
          required:true
      }
  },
  data () {
    return {}
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
        async addlikeFn(){
          try{
                if(this.list.like_liking){
                    //1.判断是否为true 如果为true 则取消
                    await deleteCommentLikeAPI(this.list.aut_id)
                }else{
                    //否则 链接添加接口
                    await addCommentLikeAPI(this.list.aut_id)
                }
                this.list.is_liking = !this.list.is_liking
          }catch(err){
              console.log(err);
          }
          

      }
  }
}
</script>

<style scoped lang="less">
.comment-item {
  .avatar {
    width: 72px;
    height: 72px;
    margin-right: 25px;
  }
  .title-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .user-name {
      color: #406599;
      font-size: 26px;
    }
  }
  .comment-content {
    font-size: 32px;
    color: #222222;
    word-break: break-all;
    text-align: justify;
  }
  .comment-pubdate {
    font-size: 19px;
    color: #222;
    margin-right: 25px;
  }
  .bottom-info {
    display: flex;
    align-items: center;
  }
  .reply-btn {
    width: 160px;
    height: 48px;
    line-height: 48px;
    font-size: 21px;
    color: #222;
  }
  .like-btn {
    height: 30px;
    padding: 0;
    border: none;
    font-size: 19px;
    line-height: 30px;
    margin-right: 7px;
    .van-icon {
      font-size: 30px;
    }
  }
}
</style>
