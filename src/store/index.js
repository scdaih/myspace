import { createStore } from 'vuex'
import Moduleuser from './user';
// import { store } from 'vuex';
export default createStore({
  state: {//存储所有数据
    // user: {
    //   username: "",
    //   id: "",
    //   firstname: "",
    //   lastname: "",
    // },
  },
  getters: {//不能直接获取的数据
    // fullname(state) {//只能读取state信息，不能修改
    //   return state.user.firstname + state.user.lastname;
    // }
  },
  mutations: {//修改state操作,不能执行异步操作

    // updateUser(state, user) {
    //   state.user.username = user.username;
    // }
  },
  actions: {//定义对state的各种操作
    // updateUser(context) {//更新用户信息,且不能直接对state信息修改
    //   let resp;
    //   // context.state.user.username = resp.username;
    // }

  },
  modules: {//将state进行分割
    user: Moduleuser,
  }
});

// store.state.user.username