<template>
    <div class="card edit-filed">
        <div class="card-body">
            <label for="edit-post" class="form-label">编辑</label>
            <!--v-model将textarea里面的内容与content里的内容绑定起来-->
            <textarea v-model="content" class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
            <button @click="post_a_post" type="button" class="btn btn-primary btn-sm">发帖</button>
            <!-- <div>{{ content }}</div> -->
        </div>
    </div>
</template>
<script>
import { ref } from 'vue';
import $ from 'jquery';
import { useStore } from 'vuex';

export default {
    name: "UserProfilewrite",
    setup(props, context) {
        const store = useStore();
        let content = ref('');
        const post_a_post = () => {//增加一个帖子
            $.ajax({
                url: "https://app165.acapp.acwing.com.cn/myspace/post/",
                type: "POST",
                data: {
                    content: content.value
                },
                headers: {
                    'Authorization': "Bearer " + store.state.user.access,
                },
                success(resp) {
                    if (resp.result === "success") {
                        context.emit('post_a_post', content.value);
                        content.value = "";
                    }
                }

            })
            // context.emit('post_a_post', content.value);//向父组件传递参数与内容
            // content.value = "";

        }

        return {
            content,
            post_a_post,
        }
    }
}
</script>
<style scoped>
.edit-filed {
    margin-top: 20px;
}

button {
    margin-top: 5px;
}
</style>