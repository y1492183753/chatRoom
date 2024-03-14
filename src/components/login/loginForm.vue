<template>
  <ElForm class="login-form" ref="loginRef" :model="loginParam" :rules="loginRules">
    <h1 class="login-title">登录</h1>
    <ElFormItem prop="username">
      <el-input v-model="loginParam.userName" style="width: 100%" placeholder="请输入账号" :prefix-icon="User" />
    </ElFormItem>
    <ElFormItem prop="password">
      <el-input v-model="loginParam.password" style="width: 100%" placeholder="请输入密码" :prefix-icon="Lock" />
    </ElFormItem>
    <ElFormItem>
      <el-button type="primary" class="login-btn" style="width: 100%" @click="$event => submit(loginRef)">登录</el-button>
    </ElFormItem>
  </ElForm>

</template>

<script setup lang="ts">
import { LoginReq } from '../../interface/user';
import { reactive, ref } from 'vue'
import { User, Lock } from '@element-plus/icons-vue'
import { ElMessage, FormInstance, FormRules } from 'element-plus'
import { userLoginApi } from '../../api/userApi';
import { useRouter } from 'vue-router';
import { useUserStore } from '../../store/userStore';

const router = useRouter()
const userStore = useUserStore()

const loginParam: LoginReq = reactive({
  userName: "",
  password: "",
  terminal: 0
})

const loginRef = ref<FormInstance>();
const loginRules: FormRules = reactive({
  userName: [{ required: true, message: "账号不能为空", trigger: 'blur' }],
  password: [{ required: true, message: "密码不能为空", trigger: 'blur' }]
})

const submit = (formEl: FormInstance | undefined) => {
  if (!formEl) {
    return false
  }
  formEl.validate(async (validate: boolean) => {
    if (validate) {
      // console.log("开始做登录的逻辑");
      // ElMessage.success("登陆成功")
      // router.push("/home")
      //登录-交互
      await userLoginApi(loginParam).then((res) => {
        ElMessage.success("登陆成功")
        userStore.setUserName(res.data.userName)
        // userStore.setUserId(res.data.id)
        router.push("/home")
      }).catch((error) => { })
    } else {
      return false
    }
  })
}
</script>

<style scoped>
.login-form {
  width: 50%;
  height: 280px;
  position: absolute;
  opacity: 1;
  transition: 1s ease-in-out;
  transition-delay: 0.5s;
  padding: 8% 25%;
  pointer-events: all;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-around;
  z-index: 1;
}

.login-form.sign-up-model {
  opacity: 0;
  transition: 1s ease-in-out;
  transition-delay: 0.5s;
  pointer-events: none;
  transform: translateX(100%);
  z-index: 0;
}
</style>
