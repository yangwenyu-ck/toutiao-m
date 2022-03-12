<template>
  <div class="comment-post">
    <van-field
      class="post-field"
      v-model.trim="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入留言"
      show-word-limit
    />
    <van-button
      class="post-btn"
      @click="addcritic"
    >发布</van-button>
  </div>
</template>

<script>
import {addCommentAPI} from "../../api";
export default {
  name: 'CommentPost',
  components: {},
  props: {
  },
  data () {
    return {
      message: ''
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
        addcritic(){
          //点击发布 调用接口上传数据//id 不可用 跳过此章节
          //输入框内容为空
          this.message = "" ;
          //点击发布关闭 弹出层
          this.$emit("guanbi",false)
      }
  }
}
</script>

<style scoped lang="less">
.comment-post {
  display: flex;
  align-items: center;
  padding: 32px 0 32px 32px;
  .post-field {
    background-color: #f5f7f9;
  }
  .post-btn {
    width: 150px;
    border: none;
    padding: 0;
    color: #6ba3d8;
    &::before {
      display: none;
    }
  }
}
</style>
