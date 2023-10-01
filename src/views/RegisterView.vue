<template>
    <ContentBase>
        <div class="row justify-content-md-center">
            <div class="col-3">
                <form @submit.prevent="register">
                    <div class="mb-3">
                        <label for="username" class="form-label">用户名</label>
                        <!--v-model将username双向绑定-->
                        <input v-model="username" type="text" class="form-control" id="usename">
                    </div>
                    <div class="mb-3">
                        <label for="password" class="form-label">密码</label>
                        <input v-model="password" type="password" class="form-control" id="=password">
                    </div>
                    <div class="mb-3">
                        <label for="password_confirm" class="form-label">确认密码</label>
                        <input v-model="password_confirm" type="password" class="form-control" id="=password">
                    </div>
                    <div class="error_passage">{{ error_passage }}</div>
                    <button type="submit" class="btn btn-primary">注册</button>
                </form>
            </div>
        </div>

    </ContentBase>
</template>
  
<script>
import ContentBase from '../components/ContentBase';
import { ref } from 'vue';
import { useStore } from 'vuex';
import router from '@/router/index';
import $ from "jquery"

export default {
    name: 'RegisterView',
    components: {
        ContentBase
    },
    setup() {
        const store = useStore();
        let username = ref('');
        let password = ref('');
        let password_confirm = ref('');
        let error_passage = ref('');//错误密码
        // console.log(store, router)
        const register = () => {
            error_passage.value = "";
            $.ajax({
                url: "https://app165.acapp.acwing.com.cn/myspace/user/",
                type: "POST",
                data: {
                    username: username.value,
                    password: password.value,
                    password_confirm: password_confirm.value,
                },
                success(resp) {
                    if (resp.result === "success") {
                        store.dispatch("login", {//调用login
                            username: username.value,
                            password: password.value,
                            success() {
                                router.push({ name: 'userlist' });
                            },
                            error() {
                                error_passage.value = "系统异常请稍后尝试";
                            }
                        });
                    } else {
                        error_passage.value = resp.result;
                    }

                }
            })
        };

        return {
            username,//username: username的简写，当key和value一样时使用
            password,
            error_passage,
            register,
            password_confirm,
        }
    }
}
</script>
<style scoped>
button {
    width: 100%;
}

.error_passage {
    color: red;
}
</style>
  
  