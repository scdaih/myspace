<template>
  <ContentBase>
    首页
  </ContentBase>
</template>

<script>
import ContentBase from '../components/ContentBase';
export default {
  name: 'HomeView',
  components: {//表示template区域会用到哪些组件
    ContentBase,//公共部分用Content表示
  }
}
</script>
<style scoped></style>

