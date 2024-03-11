<template>
    <h1>欢迎{{ username }}来到首页</h1>
</template>

<script setup lang="ts">
// import axios from 'axios';
import axios from 'axios';
import { useEnvApi, useTestErrorApi } from '../../api/testApi';
import { onMounted } from 'vue';
import { ref } from 'vue';
import { useUserStore } from '../../store/userStore';
const userStore=useUserStore()

const username = ref<string>("")
username.value=userStore.getUserName

// const envApi = async () => {
    // await axios({
    //     method: 'get',
    //     url: 'dev/env'
    // }).then((res => {
    //     console.log(res)
    // }))

    // await axios.get("/env").then((res)=>{
    //     console.log(res.data)
    // })

    // await useEnvApi().then((res) => {
    //     console.log(res.data);
    // }).catch((error) => {
    //     console.log(error);
    // })

    // await useTestErrorApi().then((res) => {
    //     console.log(res.data);
    // }).catch((error) => {
    //     console.log(error);
    // })
// }

onMounted(() => {
    // envApi()
})
</script>

<style scoped></style>