<template>
    <ContentBase>
        <div class="row">
            <div class="col-3">
                <!--将user传入userprofileinfo-->
                <UserProfileinfo @follow="follow" @unfollow="unfollow" v-bind:user="user" /><!--将函数绑定成一个事件-->
                <UserProfilewrite v-if="is_me" @post_a_post="post_a_post" />
            </div>
            <div class="col-9">
                <UserProfilePosts :user="user" :posts="posts" @delete_a_post="delete_a_post" />
            </div>

        </div>
    </ContentBase>
</template>
  
<script>
import ContentBase from '../components/ContentBase';
import UserProfileinfo from '../components/UserProfileinfo.vue';
import UserProfilePosts from '../components/UserProfilePosts.vue';
import { reactive } from 'vue';
import UserProfilewrite from '../components/UserProfilewrite.vue';
import { useRoute } from 'vue-router';
import $ from 'jquery';
import { useStore } from 'vuex';
import { computed } from 'vue'



export default {
    name: 'userProfile',
    components: {
        ContentBase,
        UserProfileinfo,
        UserProfilePosts,
        UserProfilewrite,
    },
    setup() {//等价于setup: ()=>{}
        const store = useStore();
        const route = useRoute();
        const userId = parseInt(route.params.userId);
        // console.log(userId)
        const user = reactive({
            // id: 1,
            // username: "daihong",
            // firstname: "dai",
            // lastname: "hong",
            // followerCount: 0,//粉丝数
            // is_followed: false,//是否关注
        });


        const posts = reactive({
            // count: 3,
            // posts: [
            //     {
            //         id: 1,
            //         userid: 1,
            //         content: "今天一直在学校，希望早点找到工作"
            //     },
            //     {
            //         id: 2,
            //         userid: 1,
            //         content: "今天一直在学校，希望可以早点找到工作"
            //     },
            //     {
            //         id: 3,
            //         userid: 1,
            //         content: "今天一直在学校，希望能早点找到工作"
            //     }
            // ]
        })
        $.ajax({//获取用户的所有信息
            url: "https://app165.acapp.acwing.com.cn/myspace/getinfo/",
            type: "GET",
            data: {
                user_id: userId,
            },
            headers: {
                'Authorization': "Bearer " + store.state.user.access,
            },
            success(resp) {
                user.id = resp.id;
                user.username = resp.username;
                user.photo = resp.photo;
                user.followerCount = resp.followerCount;
                user.is_followed = resp.is_followed;
            },

        });

        $.ajax({//获取用户的所有帖子
            url: "https://app165.acapp.acwing.com.cn/myspace/post/",
            type: "GET",
            data: {
                user_id: userId,
            },
            headers: {
                'Authorization': "Bearer " + store.state.user.access,
            },
            success(resp) {
                posts.count = resp.length;
                posts.posts = resp;
            }
        });
        const follow = () => {
            if (user.is_followed === true) return;
            user.is_followed = true;
            user.followerCount++;

        };
        const unfollow = () => {
            if (!user.is_followed) return;
            user.is_followed = false;
            user.followerCount--;
        };
        const post_a_post = content => {//发布帖子

            posts.count++;//帖子数量加一
            posts.posts.unshift({ //在最前面加一个元素
                id: posts.count,
                userId: 1,
                content: content,

            })
        };
        const delete_a_post = post_id => {//删除帖子
            posts.posts = posts.posts.filter(post => post.id !== post_id);//判断是否是本人的帖子
            posts.count = posts.posts.length;
        }
        // const is_me = computed(() => userId == store.state.user.id);
        const is_me = computed(() => userId === store.state.user.id);
        return {
            user,
            follow,
            unfollow,
            posts,
            post_a_post,
            is_me,
            delete_a_post
        }
    }
}
</script>
<style scoped></style>
  
  