<template>
    <ContentBase>
        <div class="row justify-content-md-center">
            <div class="col-3">
                <form @submit.prevent="login">
                    <div class="mb-3">
                        <label for="username" class="form-label">用户名</label>
                        <!--v-model将username双向绑定-->
                        <input v-model="username" type="text" class="form-control" id="usename">
                    </div>
                    <div class="mb-3">
                        <label for="password" class="form-label">密码</label>
                        <input v-model="password" type="password" class="form-control" id="=password">
                    </div>
                    <div class="error_passage">{{ error_passage }}</div>
                    <button type="submit" class="btn btn-primary">登录</button>
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


export default {
    name: 'LoginView',
    components: {
        ContentBase
    },
    setup() {
        const store = useStore();
        let username = ref('');
        let password = ref('');
        let error_passage = ref('');//错误密码
        const login = () => {
            error_passage.value = "";
            // console.log(username.value, password.value)//访问ref值时需要加value
            store.dispatch("login", {//调用login
                username: username.value,
                password: password.value,
                success() {
                    router.push({ name: 'userlist' });
                },
                error() {
                    error_passage.value = "用户名或密码错误";
                }
            })
        }

        return {
            username,//username: username的简写，当key和value一样时使用
            password,
            error_passage,
            login,
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
  
  