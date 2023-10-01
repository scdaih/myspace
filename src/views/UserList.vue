<template>
    <ContentBase>
        <div class="card" v-for="user in users" :key="user.id" @click="open_user_profile(user.id)"><!--遍历每个用户-->
            <div class="cardbody">
                <div class="row">
                    <div class="col-1 img-field">
                        <img class="img-fluid" :src="user.photo" alt="">
                    </div>
                    <div class="col-11">
                        <div class="username">{{ user.username }}</div>
                        <div class="follow-count"> {{ user.followerCount }}</div>
                    </div>
                </div>
            </div>
        </div>
    </ContentBase>
</template>
  
<script>
import ContentBase from '../components/ContentBase';
import $ from 'jquery';
import { ref } from 'vue'
import router from '@/router/index';
import { useStore } from 'vuex';


export default {
    name: 'UserList',
    components: {
        ContentBase
    },
    setup() {
        const store = useStore();

        let users = ref([]);

        $.ajax({
            url: 'https://app165.acapp.acwing.com.cn/myspace/userlist/',
            type: 'get',
            success(resp) {//获取返回结果
                // console.log(resp);
                users.value = resp;
            }

        });
        const open_user_profile = userId => {
            if (store.state.user.is_login) {//登录后跳转到用户页面
                router.push({
                    name: "userprofile",
                    params: {
                        userId
                    }
                })
            } else {
                router.push({
                    name: "login"
                });
            }
        }

        return {
            users,
            open_user_profile
        };
    }

}

</script>
<style scoped>
img {
    border-radius: 50%;
}

.username {
    font-weight: bold;
    height: 50%;
}

.follow-count {
    font-size: 12px;
    color: gray;
    height: 50%;
}

.card {
    margin-bottom: 20px;
    /*将鼠标变成小手*/
    cursor: pointer;
}

/*鼠标悬浮效果*/
.card:hover {
    /*阴影效果 */
    box-shadow: 2px 2px 10px lightgray;
    transition: 500ms;
}

.img-field {
    display: flex;
    flex-direction: column;
    justify-content: center;
}
</style>
  
  