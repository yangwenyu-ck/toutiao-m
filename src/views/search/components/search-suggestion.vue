<template>
  <div>
    <van-cell-group>
      <van-cell 
      v-for="(text,index) in suggestList" :key="index"
      icon="search">
        <div slot="title" v-html="highlight(text,keyword)"></div>
      </van-cell>
        
    </van-cell-group>
  </div>
</template>

<script>
import {getSuggestListAPI} from "../../../api"//获取联想建议
export default {
  data(){
    return {
      suggestList:[],//联想建议数组
      timerId: null//防抖定时器
    }
  },
  props:{
    keyword:{
      type:String,
      required:true
    },

  },
  watch:{
    keyword:{
      //立即侦听 网页打开时侦听一次
      immediate:true,
      handler(newval){
        // 2. 清除上次的延时器
        clearTimeout(this.timerId)
        // 1. 开启延时器，将延时器的 id 存储到 this.timerId 中
        this.timerId = setTimeout(() => {
          // console.log(newval);
          if (newval.length != 0) {
            this.searchResult(newval)
          }
        }, 500)
        
      }
    }
  },
  methods:{
     async searchResult(newval){
       const res = await getSuggestListAPI(newval)
       this.suggestList = res.data.data.options
      //  console.log(this.suggestList);
    },
    highlight (text, keyword) {
      // /searchContent/ 正则表达式中的一切内容都会当做字符串使用
      if(text){//先判断该值是否为空 再进行一下步骤
        // 这里可以 new RegExp 方式根据字符串创建一个正则表达式
        // RegExp 是原生 JavaScript 的内置构造函数
        // 参数1：字符串，注意，这里不要加 //
        // 参数2：匹配模式，g 全局，i 忽略大小写
        const reg = new RegExp(keyword, 'gi')//先定义正则表达式
        // 让每个推荐元素中的正则表达式中的(keyword)关键字都高亮
        return text.replace(reg, `<span style="color: #3296fa">${keyword}</span>`)
      }
        
    },
  }
}
</script>

<style>

</style>