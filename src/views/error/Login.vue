<template>
	<div class="login-view">
		<div class="login-content">

			<div class="back-box">
				<img class="image" src="../assets/image/背景.jpg" alt="backImage">
				<img class="image2" src="../assets/image/背景1.jpg" alt="backImage">
				<img class="image3" src="../assets/image/背景2.jpg" alt="backImage">
			</div>
			<el-form class="login-form" :model="loginForm" status-icon :rules="rules" ref="loginForm" label-width="60px"
				@keyup.enter.native="submitForm('loginForm')">
				<div class="login-brand">welcome to happyChatting</div>
				<el-form-item label="终端" prop="userName" v-show="false">
					<el-input type="terminal" v-model="loginForm.terminal" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="用户名" prop="userName">
					<el-input type="userName" v-model="loginForm.userName" autocomplete="off"
						placeholder="用户名"></el-input>

				</el-form-item>
				<el-form-item label="密码" prop="password">
					<el-input type="password" v-model="loginForm.password" autocomplete="off"
						placeholder="密码"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="submitForm('loginForm')">登陆</el-button>
					<el-button @click="resetForm('loginForm')">清空</el-button>
				</el-form-item>
				<div class="register">
					<router-link to="/register">没有账号,前往注册</router-link>
				</div>
			</el-form>
		</div>
		<icp></icp>
	</div>

</template>

<script>
import Icp from '../components/common/Icp.vue'
export default {
	name: "login",
	components: {
		Icp
	},
	data() {
		var checkUsername = (rule, value, callback) => {
			if (!value) {
				return callback(new Error('请输入用户名'));
			}
			callback();
		};
		var checkPassword = (rule, value, callback) => {
			if (value === '') {
				callback(new Error('请输入密码'));
			}
			callback();

		};
		return {
			loginForm: {
				terminal: this.$enums.TERMINAL_TYPE.WEB,
				userName: '',
				password: ''
			},
			rules: {
				userName: [{
					validator: checkUsername,
					trigger: 'blur'
				}],
				password: [{
					validator: checkPassword,
					trigger: 'blur'
				}]
			}
		};
	},
	methods: {
		submitForm(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					this.$http({
						url: "/login",
						method: 'post',
						data: this.loginForm
					})
						.then((data) => {
							// 保存密码到cookie(不安全)
							this.setCookie('username', this.loginForm.userName);
							this.setCookie('password', this.loginForm.password);
							// 保存token
							sessionStorage.setItem("accessToken", data.accessToken);
							sessionStorage.setItem("refreshToken", data.refreshToken);
							this.$message.success("登陆成功");
							this.$router.push("/home/chat");
						})

				}
			});
		},
		resetForm(formName) {
			this.$refs[formName].resetFields();
		},
		// 获取cookie、
		getCookie(name) {
			let reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
			let arr = document.cookie.match(reg)
			if (arr) {
				return unescape(arr[2]);
			}
			return '';
		},
		// 设置cookie,增加到vue实例方便全局调用
		setCookie(name, value, expiredays) {
			var exdate = new Date();
			exdate.setDate(exdate.getDate() + expiredays);
			document.cookie = name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate
				.toGMTString());
		},
		// 删除cookie
		delCookie(name) {
			var exp = new Date();
			exp.setTime(exp.getTime() - 1);
			var cval = this.getCookie(name);
			if (cval != null) {
				document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
			}
		}
	},
	mounted() {
		this.loginForm.userName = this.getCookie("username");
		// cookie存密码并不安全，暂时是为了方便
		this.loginForm.password = this.getCookie("password");
	}
}
</script>

<style scoped lang="scss">
.login-view {
	width: 100vw;
	height: 100vh;
	background: rgb(255, 255, 255);
	background-image:url(../assets/image/白云.jpg);
	background-size: cover;
	box-sizing: border-box;


	.login-content {
		position: relative;
		display: flex;
		justify-content: space-between;
		align-items: center;
		// padding: 10%;



		.login-form {
			margin: 50px;
			height: 340px;
			width: 400px;
			z-index: 2;
			padding: 30px;
			background: rgb(255, 255, 255);
			// opacity: 0.8;
			box-shadow: 0px 0px 1px #cccccc;
			border-radius: 3%;
			overflow: hidden;
			border: 1px solid #ccc;

			.login-brand {
				line-height: 50px;
				margin: 30px 0 40px 0;
				font-size: 22px;
				font-weight: 600;
				letter-spacing: 2px;
				text-transform: uppercase;
				text-align: center;
			}

			.register {
				display: flex;
				flex-direction: row-reverse;
				line-height: 40px;
				text-align: left;
				padding-left: 20px;
			}
		}
	}
}

.back-box {
	margin-top: 10px;
	// background-color: aqua;
	flex: 1;
	height: 90vh;
	width: 100vw;
	z-index: 2;
	border-radius: 50%;
	position: relative;
}



.image{
	height: 300px;
	width: 300px;
	border-radius: 50%;
	overflow: hidden;
	z-index: 1;
	transform: rotateZ(15deg);
	position: absolute;
	left: 5%;
	top: 30%;
	opacity: 1;
}
.image2{
	height: 400px;
	width: 400px;
	border-radius: 50%;
	overflow: hidden;
	z-index: 1;
	transform: rotateZ(15deg);
	position: absolute;
	left: 20%;
	top: 2%;
	opacity: 0.8;
}
.image3{
	height: 600px;
	width: 600px;
	border-radius: 50%;
	overflow: hidden;
	z-index: 1;
	transform: rotateZ(-15deg);
	position: absolute;
	left: 40%;
	top: 30%;
	opacity: 0.9;
}
</style>