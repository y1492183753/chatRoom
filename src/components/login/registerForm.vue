<template>
    <ElForm class="register-form" ref="registerRef" :model="registerParam" :rules="registerRules">
        <h1>注册</h1>
        <ElFormItem prop="nickName">
            <el-input v-model="registerParam.nickName" style="width: 100%" placeholder="请输入昵称" :prefix-icon="User" />
        </ElFormItem>
        <ElFormItem prop="username">
            <el-input v-model="registerParam.userName" style="width: 100%" placeholder="请输入账号" :prefix-icon="User" />
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



const emit = defineEmits(['registerSuccess'])

const registerParam: RegisterReq = reactive({
    userName: "",
    password: "",
    nickName: ""
})

const registerRef = ref<FormInstance>();
const registerRules: FormRules = reactive({
    userName: [{ required: true, message: "账号不能为空", trigger: 'blur' }],
    password: [{ required: true, message: "密码不能为空", trigger: 'blur' },
    { required: true, message: "密码是6-20位", min: 6, max: 20, trigger: 'blur' }],
    nickName: [{ required: true, message: "昵称不能为空", trigger: 'blur' },]
})

const submit = (formEl: FormInstance | undefined) => {

    if (!formEl) {
        return false
    }

    formEl.validate(async (validate: boolean) => {
        if (validate) {

            // 注册-交互
            userRegisterApi(registerParam).then(() => {
                ElMessage.success("注册成功")
                emit('registerSuccess')
            }).catch((error) => {
                ElMessage.error("注册失败")
                console.error(error);
            })

        }
        else {
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