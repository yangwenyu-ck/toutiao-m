import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "../views/login"
import Layout from "../views/Layout"
import Home from "../views/Home" //主页
import My from "../views/my" //我的
import qa from "../views/qa" //问答
import video from "../views/video" //视频
import search from "../views/search" //搜索
import article from "../views/article" //文章详情

//全局组件
Vue.use(VueRouter);

//规则数组
const routes = [{
    path: '/',
    component: Layout,
    children: [{
        path: '', //空默认此为二级路由主页
        component: Home
    }, {
        path: 'my',
        component: My
    }, {
        path: 'qa',
        component: qa
    }, {
        path: 'video',
        component: video
    }]
}, {
    path: '/login',
    name: 'login',
    component: Login
}, {
    path: '/search',
    name: 'search',
    component: search
}, {
    path: '/article/:articleId', //:articleId是一个 动态数据 跳转时传参
    name: 'article',
    component: article,
    props: true
}]

//路由对象对象
const router = new VueRouter({
    routes
})

//导出数组
export default router