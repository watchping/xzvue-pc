<template>
  <el-container class="bg-light">
    <el-form :model="form" label-width="60px" class="pt-3 m-auto">
      <el-form-item label="用户">
        <el-input v-model="form.uname" placeholder="输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.upwd" placeholder="输入密码"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onLogin">登录</el-button>
        <el-button @click="goBack">取消</el-button>
      </el-form-item>
    </el-form>
  </el-container>
</template>

<script>
//import { Login } from "@/assets/js/apis/user.js";
import { mapActions} from "vuex";
export default {
  data() {
    return {
      form: {
        uname: "dingding",
        upwd: "123456",
      },
    };
  },
  methods: {
    ...mapActions(["login"]),//去vuex中的actions中取出名为login的函数放在这里
    onLogin() {
      let user = { uname: this.form.uname, upwd: this.form.upwd };
      this.login(user); 
      this.$router.push("/");
    },    

    goBack() {
      this.$router.go(-1);
    }
  },
};
</script>

<style>
</style>