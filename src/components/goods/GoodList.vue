<template>
  <div class='tmpl'>
    <nav-bar title="商品列表"></nav-bar>
    <mt-loadmore :bottom-method="loadBottom" :auto-fill='autoFill' :bottom-all-loaded="allLoaded" @bottom-status-change="stateChange" ref="loadmore">

      <!--:bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="autoFill" @bottom-status-change="stateChange" ref="loadmore"-->
      <ul class="mui-table-view mui-grid-view">
        <li class="mui-table-view-cell mui-media mui-col-xs-6" v-for='goods in goodsList' :key='goods.id' >
          <router-link :to="{name:'goods_detail',params:{goodsId:goods.id} }">
            <img class="mui-media-object" :src="goods.img_url">
            <div class="mui-media-body">{{goods.title}}</div>
            <div class="desc">
              <div class="sell">
                <span>￥{{goods.sell_price}}</span>
                <s>￥{{goods.market_price}}</s>
              </div>
              <div class="detail">
                <div class="hot">
                  热卖中
                </div>
                <div class="count">
                  剩{{goods.stock_quantity}}件
                </div>
              </div>
            </div>
          </router-link>
        </li>
      </ul>
    </mt-loadmore>
  </div>
</template>
<script type='text/ecmascript-6'>
  export default{
    data(){
      return {
        goodsList: [],
        allLoaded:false,//禁止上拉函数的触发
        autoFill:false,//检测数据是否撑满父盒子的机制，自动调用上拉函数，默认值是true
        pageIndex:2,
        parentHeight:0,
      }
    },
    created(){
      this.loadmoreFirst()
    },
    methods: {
      loadmoreFirst(){
        this.$ajax.get('getgoods?pageindex=1')
            .then(res=> {

              this.goodsList = res.data.message
              console.log(res.data.message);
            })
            .catch(err=> {
              console.log('获取商品列表失败' + err);
            })
      },
      loadmoreByPage(pageIdex){
        this.$ajax.get('getgoods?pageindex='+pageIdex)
        .then(res=>{

          if(res.data.message.length!=10){
            this.allLoaded=true
          }
          this.goodsList=this.goodsList.concat(res.data.message)
        })
        .catch(err=>{
          console.log('获取商品列表失败' + err);
        })
      },



      loadBottom(){
        this.loadmoreByPage(this.pageIndex);
        this.pageIndex++;

        //通知loading状态结束，进入下一次上拉过程
        this.$refs.loadmore.onBottomLoaded()
      },
      stateChange(state){
        console.log(state);
      }

    },
    mounted(){//操作dom
      let headerHeight=this.$parent.$refs.n1.$el.offsetHeight
      let footerHeight=this.$parent.$refs.n2.offsetHeight
      this.parentHeight=document.documentElement.clientHeight-headerHeight-footerHeight
    }
  }
</script>
<style scoped>
  .mui-table-view.mui-grid-view .mui-table-view-cell > a:not(.mui-btn) {
    margin: 0px;
    padding: 0px;
    border: 1px solid #5c5c5c;
    box-shadow: 0 0 4px #666;
  }

  .sell > span {
    float: left;
    color: red;
    text-align: left;
  }

  .detail > .hot {
    float: left;
    text-align: left;
    font-size: 15px;
  }

  .detail > .count {
    float: right;
    text-align: right;
    font-size: 15px;
  }

  /*撑开，去除浮动没有的高度*/

  .detail {
    overflow: hidden;
  }

  .desc {
    color: rgba(92, 92, 92, 0.8);
    background-color: rgba(0, 0, 0, 0.2);
  }

  .mui-table-view.mui-grid-view .mui-table-view-cell .mui-media-object {
    height: 200px;
  }
</style>
