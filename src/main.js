import Vue from 'vue';              //引入vue
import App from './App.vue';        //引入App
import Home from './components/home/Home.vue'
import Vip from './components/vip/Vip.vue'
import Search from './components/search/Search.vue'
import Shopcart from './components/shopcart/Shopcart.vue';
import  NewsList from  './components/news/NewsList.vue';
import  Moment from 'moment'
import  NewsDetail from './components/news/NewsDetail.vue';
import  {Indicator}  from 'mint-ui';
import  PhotoList from './components/photo/PhotoList.vue';
import  PhotoDetail from  './components/photo/PhotoDetail.vue';
import GoodList from  './components/goods/GoodList.vue';
import GoodsDetail from  './components/goods/GoodsDetail.vue';
import MySwipe from './components/commons/MySwipe.vue';
import GoodsComment from './components/goods/GoodsComment.vue';
import NotFound from  './components/commons/NotFound.vue'

import MintUi from 'mint-ui';
import  'mint-ui/lib/style.css'
Vue.use(MintUi);

//缩略图插件
import VuePreview from 'vue-preview';
Vue.use(VuePreview);


import Comment from './components/commons/Comment.vue';
Vue.component('Comment',Comment);//<comment cid="xxx"></comment>
Vue.component('MySwipe',MySwipe)
Vue.component("NavBar",NavBar);

import './static/libs/mui-master/dist/css/mui.css'
// 引入全局的css
import './static/css/global.css';
//全局组件操作
import NavBar from './components/commons/NavBar.vue'



Vue.filter('convertDate',function (value) {
  return Moment(value).format('YYYY-MM-DD')
});





import VueRouter from  'vue-router';
Vue.use(VueRouter);
let router=new VueRouter({
  linkActiveClass:'mui-active',
  routes:[
    //加入重定向
    {path:'/',redirect:{name:'home'}},
    {name:'home',path:'/home',component:Home},
    {name:'vip',path:'/vip',component:Vip},
    {name:'search',path:'/search',component:Search},
    {name:'shopcart',path:'/shopcart',component:Shopcart},
    {name: 'news_list', path: '/news', component: NewsList},
    {name:'news_detail',path:'/news/detail',component:NewsDetail},
    {name:'goods_PhotoDetail',path:'/goods/photo/detail',component:NewsDetail},
    {name:'photo_list',path:'/photo',component:PhotoList},
    {name:'photo_detail',path:'/photo/detail/:imgId',component:PhotoDetail},
    {name:'good_list',path:'/goods/list',component:GoodList},
    {name:'goods_detail',path:'/goods/detail/:goodsId',component:GoodsDetail},
    {name:'goods_comment',path:'/goods/comment',component:GoodsComment},//商品评论
    {path:'*',component:NotFound}
  ]
});

//Axios: 开始
import Axios from 'axios';
Vue.prototype.$ajax=Axios;
Axios.defaults.baseURL='http://182.254.146.100:8899/api/';

//拦截器 页面加载显示加载中
Axios.interceptors.request.use(function (config) {

Indicator.open({
    text: '加载中...',
    spinnerType: 'fading-circle'
  });


return config
});

//关闭拦截器
Axios.interceptors.response.use(function (response) {

  Indicator.close({});


  return response
});



new Vue({
  el:'#app',
  router,
  render:c=>c(App)
})
