import $ from 'jquery';
import jwt_decode from 'jwt-decode'

const Moduleuser = {
    state: {//存储所有数据
        id: "",
        username: "",
        photo: "",
        followerCount: 0,
        access: "",//访问令牌
        refresh: "",//刷新令牌
        is_login: false,
    },
    getters: {//不能直接获取的数据    
    },
    mutations: {//修改state操作,不能执行异步操作
        updateUser(state, user) {
            state.id = user.id;
            state.username = user.username;
            state.photo = user.photo;
            state.followerCount = user.followerCount;
            state.access = user.access;
            state.refresh = user.refresh;
            state.is_login = user.is_login;
        },
        updateAccess(state, access) {
            state.access = access;
        },
        logout(state) {//退出登录
            state.id = "";
            state.username = "";
            state.photo = "";
            state.followerCount = 0;
            state.access = "";
            state.refresh = "";
            state.is_login = false;
        }

    },
    actions: {//定义对state的各种操作,actions是一个字典
        login(context, data) {
            $.ajax({
                url: "https://app165.acapp.acwing.com.cn/api/token/",
                type: "POST",
                data: {
                    username: data.username,
                    password: data.password
                },
                success(resp) {
                    // console.log(resp);
                    const { access, refresh } = resp;
                    const access_obj = jwt_decode(access);//将access解码

                    setInterval(() => {//刷新JWT令牌
                        $.ajax({
                            url: "https://app165.acapp.acwing.com.cn/api/token/refresh/",
                            type: "POST",
                            data: {
                                refresh,
                            },
                            success(resp) {
                                context.commit('updateAcess', resp.access);
                            }


                        });
                    }, 4.5 * 60 * 1000);//每隔4.5分钟访问一次
                    // console.log(access_obj, refresh);
                    $.ajax({
                        url: "https://app165.acapp.acwing.com.cn/myspace/getinfo/",
                        type: "GET",
                        data: {
                            user_id: access_obj.user_id,
                        },
                        headers: {//jwt验证
                            'Authorization': "Bearer " + access,
                        },
                        success(resp) {
                            context.commit("updateUser", {
                                ...resp,
                                access: access,
                                refresh: refresh,
                                is_login: true,
                            });

                            data.success();
                        },
                    })

                },
                error() {
                    data.error();
                }
            })
        }
    },
    modules: {//将state进行分割
    }
};

export default Moduleuser