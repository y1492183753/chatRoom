<template>
    
<div :class="{ container: true, 'sign-up-model': vari }">
        <div class="inner-left-container">
            <div class="login-content">
                <h1 style="color: white;">Chat-Room</h1>
                <el-button type="primary" @click="onClick" size="large">去注册</el-button>
            </div>
            <img class="image" src="/src/assets/login-bg.png" alt="这是登录的背景图">
        </div>
        <div class="inner-right-container">
            <div class="register-content">
                <h1 style="color: white;">Chat-Room</h1>
                <el-button type="primary" @click="onClick" size="large">去登录</el-button>
            </div>
            <img class="image" src="/src/assets/register-bg.png" alt="这是注册的背景图">
        </div>
        <div class="inner-sign-up-container">
          <loginForm :class="{'sign-up-model':vari}"></loginForm>
          <registerForm :class="{'sign-up-model':vari}" @register-success="onClick"></registerForm>
        </div>
    </div>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import loginForm from '../../components/login/loginForm.vue';
import registerForm from '../../components/login/registerForm.vue';


const onClick = () => {
    vari.value = !vari.value
}
let vari = ref<boolean>(false)
</script>

<style scoped>
.container {
    width: 100vw;
    height: 100vh;
    background-color: white;
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: row;
}

.container::before {
    z-index: 1;
    content: "";
    width: 1800px;
    height: 1800px;
    background-image: url('../../assets/login-before-bg.jpg');
    background-size: cover;
    position: absolute;
    border-radius: 50%;
    transform: translateY(-50%);
    right: 48%;
    top: -10%;
    transition: 1.8s ease-in-out;

}

.inner-left-container {
    width: 0;
    flex: 1;
    z-index: 2;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: flex-end;
    padding: 3rem 10% 10% 2rem;
    pointer-events: all;

}

.inner-right-container {
    width: 0;
    flex: 1;
    display: flex;
    z-index: 2;
    flex-direction: column;
    justify-content: space-around;
    align-items: flex-start;
    padding: 3rem 10% 10% 2rem;
    pointer-events: none;

}

.container .inner-right-container .register-content,
.container .inner-right-container .image {
    transform: translateX(1000px);
    transition: 1s ease-in-out;
    transition-delay: 0.5s;

}

.container .inner-left-container .login-content,
.container .inner-left-container .image {
    transform: translateX(0);
    transition: 1s ease-in-out;
    transition-delay: 0.5s;
}

.image {
    width: 100%;
}

.inner-sign-up-container {
    z-index: 0;
    width: 50%;
    height: 50%;
    /* background-color: antiquewhite; */
    position: absolute;
    right: 0;
    top: 20%;
    transition: 1s ease-in-out;
    transition-delay: 0.5s;
}

.register-content{
    margin-left: 12%;
}
/* 动画样式 */
.container.sign-up-model::before {
    transform: translate(100%, -50%);
    right: 52%;
}

.container.sign-up-model .inner-right-container .register-content,
.container.sign-up-model .inner-right-container .image {
    transform: translateX(0px);
    transition-delay: 0.5s;
    transition: 1s ease-in-out;
}

.container.sign-up-model .inner-left-container .login-content,
.container.sign-up-model .inner-left-container .image {
    transform: translateX(-1000px);
    transition: 1s ease-in-out;
    transition-delay: 0.5s;
}

.container.sign-up-model .inner-sign-up-container {
    width: 50%;
    height: 50%;
    top: 20%;
    right: 50%;
    transition: 1s ease-in-out;
    transition-delay: 0.5s;
}
.container.sign-up-model .inner-right-container{
    pointer-events: all;
}
.container.sign-up-model .inner-left-container{
    pointer-events: none;
}

@media screen and (max-width:992px){
    .container{
        flex-direction: column;
    }
    .container::before{
        width: 1500px;
        height: 1500px;
        position: absolute;
        bottom: initial;
        top: initial;
        left: initial;
        right: initial;
        transform: translate(-30%,-70%);
    }
    .inner-left-container{
        height: 0;
        flex: 1;
        width: 100%;
        flex-direction: row;
        align-items: flex-start;
    }
    .inner-right-container{
        height: 0;
        flex: 1;
        width: 100%;
        flex-direction: row;
        align-items: flex-end;
    }
    .image{
        width: 40%;
    }

    .container .inner-right-container .register-content,
    .container .inner-right-container .image{
        transform: translateY(1000px);
    }

    .container .inner-sign-up-container{
        width: 50%;
        height: 50%;
        left: 25%;
        right: 25%;
        top: 40%;
    }
    /* 动画 */
    .container.sign-up-model .inner-left-container .login-content,
    .container.sign-up-model .inner-left-container .image{
        transform: translateY(-1000px);
        transition: 1s ease-in-out;
    }

    .container.sign-up-model::before{
        width: 1500px;
        height: 1500px;
        position: absolute;
        bottom: initial;
        top: initial;
        right: initial;
        left: initial;
        transform: translate(-30%,35%);
    }

    .container.sign-up-model .inner-sign-up-container{
        width: 70%;
        height: 50%;
        top: 15%;
        left: 15%;
        right: 15%;
    }
}

@media screen and (max-width: 570px) {
    .container{
        background-image: url('../../assets/login-before-bg.jpg');
    background-size: cover;
    }
    .container .inner-sign-up-container{
        width:80%;
        right: 10%;
        left: 10%;
        background-color: white;
        border-radius: 8px;
    }
    
    .container::before{
        display: none;
    }
}

</style>