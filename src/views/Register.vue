<template>
    <div class="background">
        <div style="height: 350px;width: 450px;background-color: white;border-radius: 8px;position:relative;left:550px;top:130px">
            <h3 style="color:#409EFF;padding-top: 10px">注册</h3><br/>
            <el-input v-model="username" placeholder="请输入用户名" style="width: 400px" @input="verify" @keyup.enter.native="register" ></el-input><br/><br/>
            <el-input placeholder="请输入密码" v-model="psw" show-password style="width: 400px" @keyup.enter.native="register" :disabled="yhmbzc"></el-input><br/><br/>
            <el-input placeholder="再次输入你的密码" v-model="repsw" show-password style="width: 400px" @keyup.enter.native="register" :disabled="yhmbzc"></el-input><br/><br/>
            <small v-if=istips style="color: red;">{{errortips}}</small><br/>
            <el-button size="medium" type="primary" plain @click="register">注册</el-button><br>
            <span style="float:right;font-size: small;margin-right: 8px"><router-link :to="{path:'login'}">返回登录界面</router-link></span>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Register",
        data(){
            return {
                yhmbzc:false,//用户名被注册
                errortips:'',
                istips:false,
                username:'',
                psw:'',
                repsw:''
            }
        },
        methods:{
            verify(){
              this.$axios.post('/register/verify',{
                  username:this.username
              }).then(res=>{
                  if(res.data=='no'){
                      console.log("testverify")
                      this.istips =true;
                      this.errortips='该用户名已被注册'
                      this.yhmbzc=true
                  }
                  else if(res.data=='ok'){
                      this.istips=false
                      this.yhmbzc=false
                  }

              })
            },
            register(){
                //如果用户名已经被注册直接返回
                if(this.yhmbzc)
                    return;
                if(this.psw==''){
                    this.istips =true;
                    this.errortips='请输入密码'
                }
                else if(this.psw!=this.repsw){
                    this.istips=true;
                    this.errortips='两次密码不一致'
                    this.repsw=''
                    this.psw=''
                }
                else {
                    this.$axios.post('/register', {
                        username: this.username,
                        psw: this.psw
                    },)
                        .then(response => {
                            console.log(response);
                            if (response.data == 'ok') {
                                //sessionStorage.setItem("user",this.username)
                                this.$router.push({path: '/login'});
                            } else {
                                this.istips =true;
                                this.errortips='注册失败,请重试'
                            }
                            console.log(this.$cookies.keys());
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                }
            },
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