<template>
  <div class="tmpl">
    <!--组件的头-->
    <nav-bar title='新闻列表'></nav-bar>
    <ul class="mui-table-view">
      <li class="mui-table-view-cell mui-media" v-for='news in newsList' :key='news.id'>
        <router-link :to="{name:'news_detail',query:{newsId:news.id}}">
          <img class="mui-media-object mui-pull-left" :src="news.img_url">
          <div class="mui-media-body">
            <span>{{news.title}}</span>
            <div class="news-desc">
              <p>点击数:{{news.click}}</p>
              <p>发表时间:{{news.add_time | convertDate}}</p>
            </div>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script type='text/ecmascript-6'>
  export default{
    data(){
      return{
          newsList:[]
      }
    },
    created(){
      this.$ajax.get('getnewslist')
      .then(res=>{
        this.newsList=res.data.message
        console.log(res.data.message);
      })
      .catch(err=>{
        console.log(err);
      })
    }
  }
</script>
<style scoped>
  .mui-media-body p {
    color: #0bb0f5;
  }

  .news-desc p:nth-child(1) {
    float: left;
  }

  .news-desc p:nth-child(2) {
    float: right;
  }
</style>
