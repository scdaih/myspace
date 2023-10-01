<template>
    <div class="home">
        <div class="container"><!--boostrap里面定义好的一个class，可以帮助我们响应式的调整内容区域的大小-->
            <div class="card">
                <div class="card-body">
                    <slot></slot><!--将Content的所有子元素渲染到slot里面-->

                </div>
            </div>
        </div>

    </div><!--content表示公共部分-->
</template>
<script>

export default {
    name: 'ContentBase',

}
</script>

<style scoped>
.container {
    margin-top: 20px;
}
</style>