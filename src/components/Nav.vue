<template>
    <div style="min-width: 1530px;width:100%;text-align: center;">
            <el-row class="my-nav" style="border-bottom	:solid 1px #f6f6f6">
                <el-col :span="5">
                    <h2 style="color: dodgerblue; text-align:right; padding-right: 20px;cursor: pointer" @click="handleindex">Blog</h2>
                </el-col>
                <el-col :span="6">
                    <el-menu
                            :default-active="navindex"
                            class="el-menu-demo"
                            mode="horizontal"
                            @select="handleSelect"
                            background-color="white"
                            text-color="gray"
                            active-text-color="dodgerblue"
                            style="font-weight: bolder;border-color: #f6f6f6">
                        <el-menu-item index="1" @click="handleindex">推荐博客</el-menu-item>
                        <el-menu-item index="2" @click="handlemyblog">我的博客</el-menu-item>
                        <el-menu-item index="3" @click="handlemyfollow">关注</el-menu-item>
                    </el-menu>
                </el-col>

                <el-col :span="11" style="text-align: left"><el-input
                        v-model="searchtext"
                        placeholder="Search"
                        @keyup.enter.native="handleSearch"
                        style="padding-top: 10px;padding-bottom: 10px;width: 40%;"
                >
                    <i slot="suffix" class="el-input__icon el-icon-search" @click="handleSearch"></i>
                </el-input></el-col>


                <el-col :span="2" style="display:block;padding-top:20px;cursor: pointer">
                    <el-dropdown :show-timeout=showtimeout @command="handleLogout">
                        <span style="color: gray;font-size: larger">
                            {{username}}
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item icon="el-icon-edit" command="writeblog">写博客</el-dropdown-item>
                            <el-dropdown-item icon="el-icon-view" command="myblog">我的博客</el-dropdown-item>
                            <el-dropdown-item icon="el-icon-circle-close"  command="logout">退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </el-col>
<!--                <el-col :span="2"><div style="display:block;padding-top:20px;color: white;cursor:pointer"><a link="white" alink="white" vlink="white" style="text-decoration: none" @click="login">{{username}}</a></div></el-col>-->
            </el-row>
    </div>
</template>


<script>

    export default {
        name: 'Nav',
        data() {
            return {
                username:'登录',
                showtimeout:50,
                navindex:this.activeIndex,
                searchtext:''
            };
        },
        created(){
            this.username=this.$cookies.get("username")
            if(this.$route.path=='/search'){
                this.navindex=0;
            }

            //this.activeIndex='1';
        },
        props:{
            activeIndex:String
        },
        watch: {
            $route (to, from) {
                this.$router.go(0)
            }
        },
        methods: {
            login(){
                this.$router.push({path:'/login'})
            },
            handleindex(){
                this.$router.push({path:'/'})
            },
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            },
            handlemyblog(){
                this.$router.push({path:'/myblog'})
            },
            handlemyfollow(){
                this.$router.push({path:'/myfollow'})
            },
            handleSearch(){
                this.$router.push({name:'search',query:{querystring:this.searchtext}})
            },
            handleLogout(command){
                if(command=='writeblog')
                    this.$router.push({path:'/publish'})
                else if(command=='myblog')
                    this.$router.push({path:'/myblog'})
                else if(command=='logout') {
                    this.$axios.post('logout').then(res=>{
                        if(res.data=='ok')
                            this.$router.push({path: '/login'})
                        else
                            this.$message.error('请重试');
                    })
                }
            }
        }
    }
</script>

<style scoped>
    .my-nav{
        height: 60px;
        background-color: white;
        border-color: black;
    }
    .juzhong{
        vertical-align: center;
    }
    a:link {
        color:#fff;
        text-decoration:underline;
    }
    a:visited {
        color:#fff;
        text-decoration:none;
    }
    a:hover {
        color:#fff;
        text-decoration:none;
    }
    a:active {
        color:#fff;
        text-decoration:none;
    }
</style>