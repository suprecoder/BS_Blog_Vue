<template>
    <div style="background-color: #f6f6f6;width: 100%;">
        <Nav activeIndex='0' style="position: fixed;margin-top: 0px;z-index: 10;"></Nav>

        <el-card style="position:relative;width: 60%;margin-left: 20%;padding-top: 70px">

        <el-col>
            <span>
                <Avatar v-if="isme" style="position: absolute;left: 20px;"></Avatar>
                <el-avatar v-if="!isme" :src="getavatar()" style="width: 200px;height: 200px;position: absolute;left: 20px;"></el-avatar>
                <label style="position: absolute;left: 220px;top: 240px;font-size: x-large">{{username}}</label>
            </span>
        </el-col>
        <el-col style="margin-left: 50px">
            <el-card style="position: relative;left:50%;width:30%;background-color: #ffbebe">

                <div>收获的喜欢<i class="el-icon-s-opportunity" style="color: red"></i>: {{stat.prefernum}}</div>
                <div style="padding-top: 10px">被收藏<i class="el-icon-star-on" style="color: #e2d528"></i>: {{stat.favouritenum}}</div>
                <div style="padding-top: 10px">被关注<i class="el-icon-user-solid" style="color: purple"></i>: {{stat.follownum}}</div>
            </el-card>
        </el-col>
        <div class="mainmsg">
            <div>
                <span  @mouseover="handleMouseOver(0)" @mouseleave="handleMouseLeave(0)">
                    <label style="font-size: larger">性别：</label>
                    <label v-if="!m_visible[0]">{{msg.sex}}</label>
                    <el-input style="margin-top: -50px;width: 60%;" v-if="m_visible[0]"  v-model="msg.sex"></el-input>
                </span>
            </div>
            <div>
                <span  @mouseover="handleMouseOver(1)" @mouseleave="handleMouseLeave(1)">
                    <label style="font-size: larger">电子邮箱：</label>
                    <label v-if="!m_visible[1]">{{msg.mail}}</label>
                    <el-input style="margin-top: -50px;width: 60%;" v-if="m_visible[1]"  v-model="msg.mail"></el-input>
                </span>
            </div>
            <div>
                <span  @mouseover="handleMouseOver(5)" @mouseleave="handleMouseLeave(5)">
                    <label style="font-size: larger">手机号：</label>
                    <label v-if="!m_visible[5]">{{msg.phonenum}}</label>
                    <el-input style="margin-top: -50px;width: 60%;" v-if="m_visible[5]"  v-model="msg.phonenum"></el-input>
                </span>
            </div>
            <div>
                <span  @mouseover="handleMouseOver(2)" @mouseleave="handleMouseLeave(2)">
                    <label style="font-size: larger">所在地：</label>
                    <label v-if="!m_visible[2]">{{msg.address}}</label>
                    <el-input style="margin-top: -50px;width: 60%;" v-if="m_visible[2]"  v-model="msg.address"></el-input>
                </span>
            </div>
            <div>
                <span  @mouseover="handleMouseOver(3)" @mouseleave="handleMouseLeave(3)">
                    <label style="font-size: larger">从事行业：</label>
                    <label v-if="!m_visible[3]">{{msg.job}}</label>
                    <el-input style="margin-top: -50px;width: 60%;" v-if="m_visible[3]"  v-model="msg.job"></el-input>
                </span>
            </div>
            <div>
                <span  @mouseover="handleMouseOver(4)" @mouseleave="handleMouseLeave(4)">
                    <label style="font-size: larger">个人描述：</label>
                    <label v-if="!m_visible[4]">{{msg.mydescribe}}</label>
                    <el-input style="margin-top: -50px;width: 60%;" v-if="m_visible[4]"  v-model="msg.mydescribe"></el-input>
                </span>
            </div>
        </div>
        <el-button style="margin-top: 20px" type="primary" @click="onSubmit">{{buttontext}}</el-button>

        </el-card>

    </div>

</template>
<style>
    .mainmsg{
        position:relative;
        margin-top: 220px;
        padding-left: 10px;
        text-align: left;
    }

    .mainmsg div{
        padding-top: 40px;
    }
    .mainmsg div label{
        margin-right: 20px;
    }
    .mainmsg div span el-input{
        margin-right: 20px;
    }
    el-form el-form-item{
        font-size: larger;
    }
</style>

<script>
    import Nav from '@/components/Nav'
    import Avatar from '@/components/AvatarUpload'
    export default {
        name: 'personal',
        components:{Nav,Avatar},
        data() {
            return {
                m_visible:[false,false,false,false,false,false],
                msg:{
                    mail:'',
                    phonenum:'',
                    sex:'',
                    mydescribe:'',
                    address:'',
                    job:'',
                    isfollow:false
                },
                stat:{
                    prefernum:'',
                    follownum:'',
                    favouritenum:''
                },
                username:'',
                isme:true,
                buttontext:'保存'
            };
        },
        created(){
            let temp=this.$cookies.get('username'),flag=false
            if(this.$route.params.username && this.$route.params.username!=temp){
                for(let i=0;i<this.m_visible.length;i++)
                    this.m_visible[i]=false
                this.m_visible = Object.assign({}, this.m_visible)
                this.isme=false;
                temp=this.$route.params.username
                flag=true
            }
            this.username=temp
            this.$axios.get("personal/getusermsg",{params:{username:temp}})
                .then(res=>{
                    this.msg=res.data
                    if(flag){
                        if(this.msg.isfollow)
                            this.buttontext='取消关注'
                        else this.buttontext='点击关注'
                    }
                })
            this.$axios.get("personal/getmyget",{params:{username:temp}})
                .then(res=>{
                    this.stat=res.data
                })
        },
        methods: {
            getavatar(val){
                return 'http://101.37.84.109/api/personal/getavatarbyname/'+this.$route.params.username
            },
            handleMouseOver(i){
                if(this.isme) {
                    this.m_visible[i] = true
                    this.m_visible = Object.assign({}, this.m_visible)
                }

            },
            handleMouseLeave(i){
                if(this.isme) {
                    this.m_visible[i] = false
                    this.m_visible = Object.assign({}, this.m_visible)
                }
            },
            follow(){
              this.$axios.get("/personal/follow",{params:{username:this.$route.params.username}})
                  .then(res=>{
                      if(res.data="ok"){
                          if(this.buttontext=='点击关注') {
                              this.buttontext = '取消关注'
                              ++this.stat.follownum
                          }
                          else if(this.buttontext=='取消关注') {
                              this.buttontext = '点击关注'
                              --this.stat.follownum
                          }
                      }
                      else
                          this.$message.error("出错了，请再试一次")
                  })

            },
            onSubmit(){
                if(this.buttontext!='保存'){
                    this.follow();
                    return;
                }
                let myReg=/^[a-zA-Z0-9_-]+@([a-zA-Z0-9]+\.)+(com|cn|net|org)$/;
                if(this.msg.mail && !myReg.test(this.msg.mail)){
                    this.$message.error("邮箱格式不对!")
                    return
                }
                myReg=/^1\d{10}$/;
                if(this.msg.phonenum && !myReg.test(this.msg.phonenum)){
                    this.$message.error("手机格式不对!")
                    return
                }
                this.$axios.post("personal/save",this.msg)
                    .then(res=>{
                        if(res.data=="ok")
                            this.$message.success("保存成功")
                        else
                            this.$message.error("保存失败")
                    })
            }
        }
    }
</script>