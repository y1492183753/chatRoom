<template>
    <el-result icon="warning" title="404" sub-title="非常抱歉，您访问的页面走丢了">
        <template #extra>
            <el-button type="primary" @click="$router.push('/home')">返回首页</el-button>
        </template>
    </el-result>
</template>

<script setup lang="ts">

</script>

<style scoped></style>