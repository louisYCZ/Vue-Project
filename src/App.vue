<template>
  <div>
    <mt-header fixed  title="上海9期信息管理系统" ref='n1'></mt-header>
    <router-view></router-view>
    <nav class="mui-bar mui-bar-tab" ref='n2'>
      <router-link :to="{name:'home'}" class="mui-tab-item ">
        <span class="mui-icon icon-shouye"></span>
        <span class="mui-tab-label">首页</span>
      </router-link>
      <router-link :to="{name:'vip'}" class="mui-tab-item">
        <span class="mui-icon icon-huiyuan1"></span>
        <span class="mui-tab-label">会员</span>
      </router-link>
      <router-link :to="{name:'shopcart'}" class="mui-tab-item">
        <span class="mui-icon icon-gouwuche-white-copy"><span class="mui-badge">{{num}}</span></span>
        <span class="mui-tab-label" >购物车</span>
      </router-link>
      <router-link :to="{name:'search'}" class="mui-tab-item">
        <span class="mui-icon icon-work-search"></span>
        <span class="mui-tab-label">查找</span>
      </router-link>
    </nav>
  </div>
</template>
<script type='text/ecmascript-6'>
  import Connector from './components/commons/Connector.js'
  export default {
    data(){
      return {
        num:0,
      }
    },
   created(){
     Connector.$on('changeShopcart',num=>{
       this.num+=num
     })
   }
  }
</script>
<style scoped>

</style>