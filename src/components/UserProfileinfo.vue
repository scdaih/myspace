<template>
    <div class="card">
        <div class="card-body">
            <div class="row">
                <div class="col-3 img-field">
                    <img class="img-fluid" :src="user.photo" alt="">
                </div>
                <div class="col-9">
                    <div class="username">{{ user.username }}</div>
                    <div class="fans">粉丝: {{ user.followerCount }}</div>
                    <button @click="follow" v-if="!user.is_followed" type="button"
                        class="btn btn-secondary btn-sm">+关注</button>
                    <button @click="unfollow" v-if="user.is_followed" type="button"
                        class="btn btn-secondary btn-sm">取消关注</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
// import { computed } from 'vue';
import $ from 'jquery';
import { useStore } from 'vuex'//用于jwt验证

export default {
    name: 'UserProfileinfo',
    props: {   //接收父组件传递的参数
        user: {
            type: Object,
            required: true,
        },
    },
    setup(props, context) {
        // let fullName = computed(() => props.user.firstname + ' ' + props.user.lastname);//实现动态计算姓名
        const store = useStore();
        const follow = () => {
            $.ajax({//更改关注状态
                url: 'https://app165.acapp.acwing.com.cn/myspace/follow/',
                type: 'POST',
                data: {
                    target_id: props.user.id,
                },
                headers: {
                    // 'Authentication'//身份确认，下面的一个是授权
                    'Authorization': "Bearer " + store.state.user.access,
                },
                success(resp) {
                    if (resp.result === "success") {
                        context.emit('follow');
                    }

                }
            });
            // context.emit("follow");//向父组件传递参数
        };
        const unfollow = () => {//未关注事件
            $.ajax({//更改关注状态
                url: 'https://app165.acapp.acwing.com.cn/myspace/follow/',
                type: 'POST',
                data: {
                    target_id: props.user.id,
                },
                headers: {
                    // 'Authentication'//身份确认，下面的一个是授权
                    'Authorization': "Bearer " + store.state.user.access,
                },
                success(resp) {
                    if (resp.result === "success") {
                        context.emit('unfollow');
                    }
                }
            });
        }
        return {
            // fullName,
            follow,
            unfollow
        }
    }
}
</script>
<style scoped>
img {
    border-radius: 50%;
}

.username {
    font-weight: bold;
}

.fans {
    font-size: 12px;
    color: gray;
}

button {
    font-size: 12px;
    padding: 2px 4px;
}

.img-field {
    display: flex;
    flex-direction: column;
    justify-content: center;
}
</style>