<template>
 <header id="header" class="container mb-4">
    <nav class="navbar navbar-light">
      <a class="navbar-brand" href="/">
        <img src="img/header/logo.png" alt="">    <!--/img/header/logo.png-->
      </a>
      <div class="form-inline">
        <div class="input-group">
          <input type="text" class="form-control p-0" placeholder="请输入你要搜索的内容" aria-label="Recipient's username" aria-describedby="basic-addon2" v-model="kw" @keydown.13="search"/>
          <div class="input-group-append h-75" @click="search">
            <img class="btn p-0" src="img/header/search.png">
          </div>
        </div>
      </div>
      <nav id="signin" class="my-2 my-md-0 mr-md-3 small" v-if="uname===''">
        <a class="p-1 text-muted" href="register.html">注册</a>
        <b class="p-1 text-muted" >|</b>
        <!-- <a class="p-1 text-muted" id="btnLogin" href="#">登录</a> -->
        <router-link class="p-1 text-muted" id="btnLogin" to="/login">登录</router-link>
      </nav>
      <nav id="signout"   class="my-2 my-md-0 mr-md-3 small" v-else>
        <span class="p-1 text-muted" >Welcome {{uname}}</span>
        <b class="p-1 text-muted" >|</b>        
        <a href="" class="p-1 text-muted" id="btnLogout" @click.prevent="logout">注销</a>
      </nav>

      <!-- <nav id="signin" class="my-2 my-md-0 mr-md-3 small">
        <a class="p-1" href="#" title="我的收藏">
          <img src="/img/header/care.png">
        </a>
        <b class="p-1">|</b>
        <a class="p-1" href="#" title="我的订单">
          <img src="/img/header/order.png">
        </a>
        <b class="p-1">|</b>
        <a class="p-1" href="cart.html" title="我的购物车">
          <img src="/img/header/shop_car.png" alt="">
        </a>
        <a class="p-1 text-muted" href="#">Welcome <span id="uname">dangdang</span></a>
        <a class="p-1 text-muted" id="btnSignout" href="javascript:;">注销</a>
      </nav> -->
    </nav>
    <ul class="nav nav-pills">
      <li class="nav-item">
        <a class="nav-link text-muted active" href="index.html">首页</a>
      </li>
      <li class="nav-item">
        <a class="nav-link text-muted" href="#">学习用品</a>
      </li>
      <li class="nav-item">
        <a class="nav-link text-muted" href="#">私人定制</a>
      </li>
    </ul>
  </header>
</template>
<script>
import { Logout } from "@/assets/js/apis/user.js";
import {mapActions, mapMutations, mapState} from "vuex";
export default {
  data(){
    return {
      kw:"",  
      //isLogin:false,   
      //uname:"",      
    }
  },
  computed:{
     ...mapState(["uname"]),
  },

  methods:{
    ...mapActions(["logout"]),
    ...mapMutations(["setUname"]),
    search(){
      this.$router.push("/product/list/"+this.kw)
    },    
  },
  created(){
    this.kw = this.$route.params.kw;
    //this.uname =  localStorage.getItem('uname');
    this.isLogin = this.uname=="" ? false : true;

    //console.log(this.isLogin + "/" +this.uname );

  },
  watch:{
    $route(){
      this.kw = this.$route.params.kw;
    }
  },

  mounted(){
    //尝试从浏览器的localStorage sessionStorage获取数据 属于浏览器的存储机制，不是网页存储的
    let uname=localStorage.getItem("uname") || sessionStorage.getItem("uname");
    console.log(uname);
    this.setUname(uname||"");
  }
}
</script>
<style scoped>
/*定制搜索框的大小*/
#header>.navbar>.form-inline>.input-group>input{
  width:300px;
}
/*定制主导航当前导航项的字体颜色*/
#header>.nav .nav-link.active,
#header>.nav .nav-link:hover{
  background:none;
  font-weight:bold;
}
</style>