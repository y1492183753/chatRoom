<template>
    <ElForm class="register-form" ref="registerRef" :model="registerParam" :rules="registerRules">
        <h1>注册</h1>
        <ElFormItem prop="nickName">
            <el-input v-model="registerParam.nickname" style="width: 100%" placeholder="请输入昵称" :prefix-icon="User" />
        </ElFormItem>
        <ElFormItem prop="username">
            <el-input v-model="registerParam.username" style="width: 100%" placeholder="请输入账号" :prefix-icon="User" />
        </ElFormItem>
        <ElFormItem prop="password">
            <el-input v-model="registerParam.password" style="width: 100%" placeholder="请输入密码" :prefix-icon="Lock" />
        </ElFormItem>

        <ElFormItem>
            <el-button type="primary" style="width: 100%" @click="$event => submit(registerRef)">注册</el-button>
        </ElFormItem>
    </ElForm>

</template>

<script setup lang="ts">

import { ref, reactive } from 'vue'
import { RegisterReq } from '../../interface/user';
import { User, Lock } from '@element-plus/icons-vue'
import { ElMessage, FormInstance, FormRules } from 'element-plus';
import { userRegisterApi } from '../../api/userApi';
import { log } from 'console';

const emit = defineEmits(['registerSuccess'])

const registerParam: RegisterReq = reactive({
    username: "",
    password: "",
    nickname: ""
})

const registerRef = ref<FormInstance>();
const registerRules: FormRules = reactive({
    username: [{ required: true, message: "账号不能为空", trigger: 'blur' }],
    password: [{ required: true, message: "密码不能为空", trigger: 'blur' },
    { required: true, message: "密码是6-20位", min: 6, max: 20, trigger: 'blur' }],
    email: [{ required: true, message: "邮箱不能为空", trigger: 'blur' },
    { type: 'email', message: "请输入有效的邮箱地址", trigger: 'blur' }]
})

const submit = (formEl: FormInstance | undefined) => {
    if (!formEl) {
        return false
    }



    formEl.validate(async (validate: boolean) => {
        if (validate) {
            // console.log("开始做注册的逻辑");
            // ElMessage.success("注册成功请登录")
            // emit('registerSuccess')
            //注册-交互
            await userRegisterApi(registerParam).then((res) => {
                ElMessage.success("注册成功请登录")
                emit('registerSuccess')
            }).catch((error) => { ElMessage.error("注册失败") })
        } else {
            return false
        }
    })
}
</script>

<style scoped>
.register-form {
    width: 50%;
    height: 280px;
    position: absolute;
    opacity: 0;
    transition: 1s ease-in-out;
    transition-delay: 0.5s;
    padding: 8% 0%;
    pointer-events: none;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-around;
    z-index: 0;
}

.register-form.sign-up-model {
    opacity: 1;
    transition: 1s ease-in-out;
    transition-delay: 0.5s;
    pointer-events: all;
    transform: translateX(50%);
    z-index: 1;
}
</style>