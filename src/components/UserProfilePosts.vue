<template>
    <div class="card">
        <div class="card-body">
            <div v-for="post in posts.posts" :key="post.id"> <!--与下面的方法等价但推荐用此方法-->
                <!-- <div v-for="(post, index) in posts.posts" :key="index">数组变的话不推荐使用该下标方法 -->
                <div class="card single-post">
                    <div class="card-body">
                        {{ post.content }}
                        <button @click="delete_a_post(post.id)" v-if="is_me" type="button"
                            class="btn btn-danger btn-sm">删除</button><!--删除按钮-->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import $ from 'jquery';
export default {
    name: "UserProfilepost",
    props: {
        posts: {//接收父组件传递的posts
            type: Object,
            required: true,
        },
        user: {
            type: Object,
            required: true,
        }
    },
    setup(props, context) {
        const store = useStore();
        let is_me = computed(() => store.state.user.id === props.user.id);
        const delete_a_post = post_id => {//删除帖子
            $.ajax({
                url: "https://app165.acapp.acwing.com.cn/myspace/post/",
                type: 'DELETE',
                data: {
                    post_id,
                },
                headers: {
                    'Authorization': "Bearer " + store.state.user.access,
                },
                success(resp) {
                    if (resp.result === "success") {
                        context.emit('delete_a_post', post_id);
                    }
                }
            })

        }
        return {
            is_me,
            delete_a_post
        }
    }

}

</script>
<style scoped>
.single-post {
    margin-bottom: 10px;
}

button {
    float: right;
}
</style>