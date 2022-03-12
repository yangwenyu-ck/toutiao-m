import request from "axios";
import store from '@/store'


request.defaults.baseURL = "http://www.liulongbin.top:8000"; //项目基础路径

// 请求拦截器
//每次发起请求都会经过拦截器
// 在此添加数据token 之后的请求都不用每次都添加了
// Add a request interceptor
request.interceptors.request.use(function(config) {
    // Do something before request is sent
    // config ：本次请求的配置对象
    // config 里面有一个属性：headers
    const { user } = store.state
    if (user && user.token) {
        config.headers.Authorization = `Bearer ${user.token}`
    }
    // console.log(config);
    return config
}, function(error) {
    // Do something with request error
    //如果请求出错 (还没有发出去) 会进入这里面
    return Promise.reject(error)
})

// 响应拦截器

//导出axios实例
export default request;