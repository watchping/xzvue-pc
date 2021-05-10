import Vue from "vue";
import Vuex from "vuex";

import { Login, Logout } from "@/assets/js/apis/user.js";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    uname: "",
  },
  mutations: {
    setUname(state, uname) {
      state.uname = uname;
    },
  },
  actions: {
    async login(context, user) {
      let result = await Login(user);
      console.log(result);

      if (result.code == 200) {
        context.commit("setUname", user.uname);
        localStorage.setItem("uname",user.uname);
        console.log("login OK:" + user.uname);
      }
    },

    async logout(context) {
      let result = await Logout();
      console.log(result);
      if (result.code == 200) {
        context.commit("setUname", "");
        localStorage.setItem("uname","");
        console.log("logout OK");
      }
    },
  },
  modules: {},
});
