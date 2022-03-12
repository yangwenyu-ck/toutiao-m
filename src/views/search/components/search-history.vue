<template>
  <div>
    <van-cell-group>
      <van-cell title="历史记录">
        <div slot="default">
          <div v-if="isShow">
            <!-- 手动触发父元素事件 -->
            <span @click="$emit('delArr')">全部删除</span>
            &nbsp;&nbsp;
            <span>完成</span>
          </div>
          <van-icon name="shop" v-else @click="isShow = true"/>
        </div>
      </van-cell>
      <van-cell :title="str" v-for="(str,index) in historyList" :key="index" @click="handleFn(str,index)">
        <template #right-icon>
          <van-icon name="cross" class="search-icon" v-show="isShow" />
        </template>
      </van-cell>

    </van-cell-group>
  </div>
</template>

<script>
import {subdata} from "../../../utils/storage";//存储本地
export default {
  data(){
    return{
      isShow:false,//控制删除按钮显示隐藏
    }
  },
  props:{
    historyList:{
      type:Array,
      required:true
    },//历史数据数组
  },
  methods:{
    handleFn(str,index){
      //先判断isShow在什么状态下的
      //如果是true 就删除该数组中的元素
      if(this.isShow){
        this.historyList.splice(index,1)
        //每次删除元素后再此存储到本地形成 覆盖
        subdata("TOUTIAO_LISHI",this.historyList);
      }else{
        //如果是false 那么就跳转页面 显示搜索结果
        // 让父元素操作
        this.$emit("skipFn",str);
      }
    },
  }
}
</script>

<style>

</style>