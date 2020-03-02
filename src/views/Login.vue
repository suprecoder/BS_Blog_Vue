<template>
    <div class="background" @keyup.enter="login">
        <div style="height: 300px;width: 450px;background-color: white;border-radius: 8px;position:relative;left:38%;top:130px">
            <h3 style="color:#409EFF;padding-top: 10px">密码登陆</h3><br/>
            <el-input v-model="username" placeholder="请输入用户名" style="width: 400px" @keyup.enter.native="login"></el-input><br/><br/>
            <el-input placeholder="请输入密码" v-model="psw" show-password style="width: 400px" @keyup.enter.native="login"></el-input><br/><br/>
            <small v-if=istips style="color: red;">{{errortips}}</small><br/>
            <el-checkbox v-model="checked" @change="handlermbpsw" style="margin-right: 305px">记住密码</el-checkbox><br/><br/>
            <el-button size="medium" type="primary" plain @click="login">登录</el-button><br>
            <span style="float:right;font-size: small;margin-right: 8px">还没有账号？<router-link :to="{path:'register'}">立即注册</router-link></span>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Login",
        data(){
            return {
                username: '',
                psw: '',
                checked: false,
                istips: false,
                errortips: ''
            }
        },
        created(){
            let u=this.$cookies.get("username");
            let p=this.$cookies.get("psw")
            console.log(u)
            if(u!=null && p!=null){
                this.username=u
                this.psw=p;
                console.log(u+'---'+p)
                this.checked=true
            }
        },
        methods:{
            login(){
                this.handlermbpsw();
                if(this.psw==''){
                    this.istips =true;
                    this.errortips='请输入密码'
                }
                else {
                    this.$axios.post('/login', {
                        username: this.username,
                        psw: this.psw
                    },)
                        .then(response => {
                            console.log(response);
                            if (response.data.data == 'ok') {
                                this.$cookies.set("username",this.username,60*60*24*7)
                                this.$router.push({name: 'home'})
                                // this.$router.push({path: '/'});
                            } else {
                                this.istips =true;
                                this.psw=''
                                this.errortips='用户名或密码错误'
                            }
                            console.log(this.$cookies.keys());
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                }
            },
            handlermbpsw(){
                if(this.checked && this.username!='' && this.psw!=''){
                    this.$cookies.set("username",this.username,60*60*24*7)
                    this.$cookies.set("psw",this.psw,60*60*24*7)
                }
                else if(!this.checked){
                    this.$cookies.remove("username")
                    this.$cookies.remove("psw")
                }
            }
        }
    }
</script>

<style scoped>
    .background{
        background-image: url(../assets/login_background.jpg);
        background-size: 100% 100%;
        position:absolute;
        width: 100%;
        height: 100%;
        min-width:1280px;
    }
</style>