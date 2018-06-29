<template>
    <div class="container" >
  	 <div class="content">
		<p class="title">后台管理系统</p>
		<el-form :model="loginForm" status-icon :rules="rules2" ref="loginForm" label-width="100px" class="login-form">
		  <el-form-item  prop="account" label-width="0" >
		    <el-input placeholder="username" type="text" v-model="loginForm.account" auto-complete="off"></el-input>
		  </el-form-item>
		  <el-form-item  prop="password" label-width="0" >
		    <el-input placeholder="password" type="password" v-model="loginForm.password" auto-complete="off"></el-input>
		  </el-form-item>
		  <el-button class="commit" type="primary" @click="submitForm('loginForm')">提交</el-button>
		  
		  <p class="tip">Tips : 账号和密码随便填。</p>
		</el-form>
  	 </div>
  	 <canvas id="canvas"></canvas>
  </div>
</template>
<script>
export default {
    name: 'aiji',
    data () {
        let validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入账号'));
            } else {
                if (this.loginForm.password !== '') {
                    this.$refs.loginForm.validateField('password');
                }
                callback();
            }
        };
        let validatePass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            } else {
                callback();
            }
        };
        return {
            activeName: '12345',
            loginForm: {
                account: '',
                password: ''
            },
            rules2: {
                account: [
                    { validator: validatePass, trigger: 'blur' }
                ],
                password: [
                    { validator: validatePass2, trigger: 'blur' }
                ]
            },
            str: 'http://www.runoob.com/jquery/misc-trim.html?channelid=12333&name=xiaoming&age=23',
            str1: 'abcdefjhigklmn'
        }
    },
    created () {
        this.pickUrlparam()
        console.log(this.str1.slice(1,2))
        console.log(this.str1.substr(1,2))
        console.log(this.str1.substring(1,2))
    },
    methods: {
        pickUrlparam () { // 从url取参数
            let param1 = this.str.split('?')[1]
            if (!param1) return
            let paramList = param1.split('&')
            let obj = {}
            for (let i = 0; i < paramList.length; i++) {
                let arg = paramList[i].split('=')
                obj[arg[0]] = arg[1]
            }
            return obj
        }
    }
}
</script>
<style lang="less" scoped>
</style>

