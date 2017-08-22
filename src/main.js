import Vue from 'vue';
import App from './App.vue';
import Home from './components/home/Home.vue'
import Vip from './components/vip/Vip.vue'
import Search from './components/search/Search.vue'
import Shopcart from './components/shopcart/Shopcart.vue'

import MintUi from 'mint-ui';
import  'mint-ui/lib/style.css'
Vue.use(MintUi);

import './static/libs/mui-master/dist/css/mui.css'


import VueRouter from  'vue-router';
Vue.use(VueRouter);
let router=new VueRouter({
  routes:[
    //加入重定向
    {path:'/',redirect:{name:'home'}},
    {name:'home',path:'/home',component:Home},
    {name:'vip',path:'/vip',component:Vip},
    {name:'search',path:'/search',component:Search},
    {name:'shopcart',path:'/shopcart',component:Shopcart}
  ]
});

//Axios: 开始
import Axios from 'axios';
Vue.prototype.$ajax=Axios;
Axios.defaults.baseURL='http://182.254.146.100:8899/api/';




new Vue({
  el:'#app',
  router,
  render:c=>c(App)
})
