<template>
  <div class="search-container">
    <form action="/">
        <van-search
            class="search_index"
            v-model="value"
            show-action
            background="#3296fa"
            placeholder="请输入搜索关键词"
            @search="onSearch"
            @cancel="onCancel"
        />
    </form>
    <!-- 结果 -->
    <!-- 第一次判断isshow是否为true  在按下搜索键后再等于true-->
    <container v-if="isShow" :q="value"></container>
    <!-- 结果 -->

    <!-- 联想 -->
    <!-- 第二次判断 value是否为空 -->
    <suggestion v-else-if="value" :keyword="value"></suggestion>
    <!-- 联想 -->

    <!-- 历史 -->
    <!-- 如果以上两个条件都不成立则 显示搜索历史 -->
    <history v-else :historyList="historyList" @skipFn="onSearch" @delArr="delArr"></history>
    <!-- 历史 -->

  </div>
</template>

<script>
import container from "./components/search-container.vue"//结果
import history from "./components/search-history.vue"//历史
import suggestion from "./components/search-suggestion.vue"//联想
import {subdata,dataFetch} from "../../utils/storage";//存储本地
export default {
    data() {
    return {
      value: '',
      isShow:false,
      historyList:dataFetch('TOUTIAO_LISHI')||[]//搜索历史数组 先从本地获取如果没数据定义空数组
    };
  },
  methods: {
    onSearch(val) {
        // 按下搜索时触发
        //历史搜索组件触发搜索方法 让value 等于 传过来的值
        this.value = val ;

        //val发生变化生 先判断数组中是否已经有了该元素
        const index = this.historyList.findIndex( i => i == val);//若没有找到对应元素则返回-1。
        if(index !== -1){
          this.historyList.splice(index,1);
        }
        // 把数据添加到 搜索历史数组中
        this.historyList.unshift(val);

        //每触发一次搜索/有新的数据存储到历史数组中 则把数组存入到本地
        subdata("TOUTIAO_LISHI",this.historyList);

        // console.log(this.value);
        // 显示搜索结果
        this.isShow = true ;
        // console.log(val);
    },
    onCancel() {
      // 点击取消时触发
        this.isShow = false ;
        this.$router.back();
        console.log("取消");
    },
    delArr(){//点击全部删除按钮触发
      //让数组等于空
      this.historyList = [];
      //再次存储覆盖
      subdata("TOUTIAO_LISHI",this.historyList);
    }
  },
  components:{
      container,
      history,
      suggestion
  },
  watch:{
    value:{
      //立即侦听 网页打开时侦听一次
      immediate:true,
      handler(newval){
        //最新值如果等于空 那么
        if(newval.length == 0){
          //隐藏搜索结果 显示 搜索历史
          this.isShow = false;
        }
        //输入框内容发生变化时让搜索结果隐藏
        // this.isShow = false; //影响 点击历史触发搜索 方法
      }

    }
  }
}
</script>

<style scoped lang="less">
.search-container{
  padding-top: 130px;
    .van-search__action{
        color: #fff;
    }
    .search_index{
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1;
    }
}

</style>