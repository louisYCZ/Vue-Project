<template>
  <div class="tmpl">

    <nav-bar :title="title"></nav-bar>
    <div class="news-title">
      <p>{{newsInfo.title}}</p>
      <div>
        <span>{{newsInfo.click}}次点击</span>
        <span>分类:民生经济</span>
        <span>添加时间:{{newsInfo.add_time | convertDate}}</span>
      </div>
    </div>
    <div class="news-content" v-html='newsInfo.content'></div>
  </div>
</template>
<script type='text/ecmascript-6'>

  export  default{
    data(){
      return{
        newsInfo:{},//新闻详情对象
        title:'新闻详情'
      }
    },
    created(){
      let newsId=this.$route.query.newsId;
      this.$ajax.get('getnew/'+newsId)
      .then(res=>{
        this.newsInfo=res.data.message[0]
      })
      .catch(err=>{
        console.log('获取图文详情数据失败');
      })
    },
    beforeRouteEnter(to,from,next){
      let title='';
      if(from.name==='news.list' || to.name.startsWith('news')){
        title='新闻详情'
      }else if(from.name === 'goods.detail' || to.name.startsWith('goods')){
        title='商品详情'
      }
      next(vm=>{ //最终都是放行
        vm.title=title
      })

    }
  }
</script>
<style scoped>
  .news-title p {
    color: #0a87f8;
    font-size: 20px;
    font-weight: bold;
  }

  .news-title span {
    margin-right: 30px;
  }

  .news-title {
    margin-top: 5px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  }


  /*主体文章的左右距离*/

  .news-content {
    padding: 10px 5px;
  }
</style>
