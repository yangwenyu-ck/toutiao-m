import Vue from 'vue'
import App from './App.vue'
//引入router路由
import router from "./router"
//全局样式
import "./styles/index.less"
//动态加载rem 基准值
// import "amfe-flexible"
//引入vuex
import store from "./store/index"
//引入事件处理包 过滤器
import './utils/dayjs'

//vant组件
import { Button, Form, Field, NavBar, Toast, CountDown, Tabbar, TabbarItem, Image as VanImage, Grid, GridItem, Cell, CellGroup, Dialog, Icon, Tab, Tabs, List, PullRefresh, Popup, Search, Loading, Divider } from 'vant';
Vue.use(Button);
Vue.use(Field);
Vue.use(Form);
Vue.use(NavBar);
Vue.use(Toast);
Vue.use(CountDown);
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(VanImage);
Vue.use(Grid);
Vue.use(GridItem);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(Dialog);
Vue.use(Icon);
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(List);
Vue.use(PullRefresh);
Vue.use(Popup);
Vue.use(Search);
Vue.use(Loading);
Vue.use(Divider);

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')