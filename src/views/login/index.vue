<template>
    <div class="login">
        <!-- 导航栏 -->
        <van-nav-bar
        title="登录"
        class="page-nav-bar"
        >
        <i slot="left" class="iconfont icon-zuojiantou" @click="$router.back()" style="color:#fff"></i>
        </van-nav-bar>
        <!-- /导航栏 -->
        <!-- 手机号 -->
        <!-- !-- 通过 ref 属性将组件绑定到 this.$refs.checkbox 上 --> 
        <van-form @submit="onSubmit" ref="fromLongin">
            <van-field
                v-model="user.mobile"
                name="mobile"
                placeholder="手机号"
                :rules="CheckThe.mobile"
                maxlength=11
                type=number
            >
                <i slot="left-icon" class="iconfont icon-shouji"></i>
            </van-field>
            <van-field
                v-model="user.code"
                name="code"
                placeholder="验证码"
                maxlength=6
                type=number
                :rules="CheckThe.verify"
            >
                <i slot="left-icon" class="iconfont icon-yanzhengma"></i>
                <template #button>
                    <van-button 
                    class="send-sms-btn" 
                    size="small" 
                    type="primary"
                    native-type="button"
                    @click="onSendSms"
                    v-if="showHidden"
                    >发送验证码</van-button>
                    <van-count-down millisecond 
                    :time="1000 * 5" 
                    format="ss 秒" 
                    v-else
                    @finish="showFn"
                    />
                </template>
            </van-field>
            <div class="login-btn">
                <van-button square block type="info" native-type="submit">提交</van-button>
            </div>
        </van-form>
        <!-- /验证码 -->
    </div>
</template>

<script>
import { ref } from 'vue';
import {loginAuthAPI,verificationAPI} from "../../api/index.js"
export default {
    data() {
        return {
            user: {
                mobile: '13811111111',
                code: '246810'
            },
            CheckThe:{//校验输入框规则
                mobile:[{
                    required: true,
                    message: '请输入手机号',
                },{
                    pattern:/^1[3456789]\d{9}$/,
                    message: '手机号格式错误',
                }],
                verify:[{
                    required: true,
                    message: '请输入验证码',
                },{
                    pattern:/^\d{6}$/,
                    message: '验证码格式错误',
                    
                }]
            },
            showHidden:true,//倒计时开关
        }
  },
  methods: {
    async onSubmit() {
        this.$toast.loading({
            message: '登陆中...',
            forbidClick: true,//当效果出现时 禁用背景点击
            duration: 0 //展示时长 默认为2秒  将他改为0 意思就是如过不显示登录的结果则一直显示该效果
        });
        //表单提交
        try {
            const {data} = await loginAuthAPI(this.user);
            // Toast.success展示成功的提示
            this.$toast.success("登陆成功");//当有结果 提示出现 上面的 加载效果自动停止
            // //把数据储存到本地
            this.$store.commit('setUser',data.data)
            console.log("成功了");
            this.$router.back();
        } catch(err){
            if(err.response.status === 400){
                // console.log("手机或验证码错误");
                // Toast.fail展示失败的提示
                this.$toast.fail('手机或验证码错误');
            }else{
                this.$toast.fail('登陆失败');
            }
        }
        //登陆成功后
        //调用vuex中matation的newest方法
    },
    async onSendSms(){
        //校验手机号
        //native-type="button" 需要设置成button才不触发提交事件
        try{
            const res = await this.$refs.fromLongin.validate('mobile')
            this.showHidden= false;//显示倒计时
        }catch(err){//当try中的代码提示错误时 catch执行
            //err是错误返回的信息
            // 加一个return 失败时终止接下来的代码
            return console.log("手机号错误",err);
        }
        
        //请求发送验证码
        try{
            const verification = await verificationAPI(this.user.mobile);//参数是保存手机号的变量
            console.log("验证码发送成功");
        }catch(err){//当try中的代码提示错误时 catch执行
            //err是错误返回的信息
            return console.log("错误");
        }
    },
    showFn(){
            this.showHidden= true;//显示发送验证
    }
  }
}
</script>

<style scoped lang="less">
.login {
    .send-sms-btn {
        width: 152px;
        height: 46px;
        background-color: #ededed;
        color: #333;
        border:none;
    }
    .send-sms-btn{
        //发送验证码
        width: 100%;
    }
    .login-btn{
        margin: 53px 33px;
        .van-button{
            background-color: #3296fa;
        }
    }
}
</style>