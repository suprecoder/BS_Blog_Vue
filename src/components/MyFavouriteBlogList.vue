<template>
    <div class="card-margin" style="position: relative">
        <el-card class="box-card" style="width: 80%;margin-left: 10%;position: relative;min-height: 600px">
            <div slot="header" class="clearfix" style="height: 30px">
                <span style="float: left;color: #409EFF;font-weight: bolder;font-size: larger">我的收藏</span>
                <p style="float: right">共<span style="font-size: 25px;color: orangered;"> {{count}} </span>篇</p>
            </div>
            <div v-for="i in 8" class="card-margin" :key="i">
                <div>
                    <el-card v-if="blogs[i-1]!=null" class="box-card" style="width: 100%;padding-top: 1px;margin-bottom: 25px;position: relative">
                        <div  class="text item" style="cursor: pointer">
                            <a style="font-size: larger;font-weight: bolder" @click="handleToShowBlog(blogs[i-1].id)">{{blogs[i-1].title}}</a>
                            <span  @click="handlewriter(i-1)" style="color: rgba(35,79,171,0.83);cursor: pointer;position: absolute;right:20px">
                                <el-avatar :src="getavatar(blogs[i-1].id)" style="width: 18px;height: 18px;margin-bottom: -5px"></el-avatar>
                                <span style="margin-left: 5px">{{blogs[i-1].writer}}</span>
                            </span>
                            <el-divider class="el-divider-margin"></el-divider>
                            <p>{{blogs[i-1].summary }}</p>
                        </div>
                        <div style="text-align: left;">
                            <el-tag style="margin-right: 12px" size="mini" v-for="tag in blogs[i-1].tags">{{tag}}</el-tag>
                        </div>
                        <div style="position: relative;width: 100%;text-align: left;margin-top: 5px">
                            <span style="width:100%;font-size: small;color: gray;position: absolute">
                                <span :class="{'orangered':blogs[i-1].like}" @click="handlelike(i-1)" style="cursor: pointer;"><i class="el-icon-s-opportunity"></i>喜欢</span>
                                <span  @click="handledelete(i-1)" style="cursor: pointer; position: absolute;right:0px"><i class="el-icon-delete-solid"></i>删除</span>
                            </span>
                        </div>
                    </el-card>
                </div>
            </div>

            <el-pagination
                    @current-change="handleCurrentChange"
                    background
                    layout="prev, pager, next"
                    :current-page.sync="current_page"
                    :total="count"
                    style="position: absolute;bottom: 0;width: 100%;"
                    :page-size="8">
            </el-pagination>
        </el-card>



    </div>
</template>

<script>
    export default {
        name: "MyFavouriteBlogList",
        data(){
            return {
                a:1,
                blogs:[],
                count:0,
                current_page:1
            }
        },
        methods: {
            getavatar(val){
                return 'http://localhost:8081/api/personal/getavatar/'+val
            },
            handleToShowBlog(id){
                console.log(id)
                this.$router.push({ name: 'showblog', params: { blogid: id }})
            },
            handleCurrentChange(val){
                this.$axios.get("/myfavourite/getmyfavourite",{params:{val:val}})
                    .then(response=>{
                        this.blogs=response.data;
                    })
                    .catch(error=>console.log(error));
                this.$axios.get("/myfavourite/countAll")
                    .then(response=>{this.count=response.data;})
                    .catch(error=>console.log(error));
            },
            handlelike(i){
                if(this.blogs[i].like==false){
                    this.blogs[i].like=true
                    this.$axios.get("like",{params:{blogid:this.blogs[i].id}})
                        .then(res=>{
                            if(res.data!='ok'){
                                this.$message.error("出了一点小问题。。。")
                            }
                        })
                        .catch(err=>{
                            this.$message.error("emmm,网络开小差了，再试一次吧")
                        })
                    //this.like = Object.assign({}, this.like)
                }
                else{
                    this.blogs[i].like=false
                    this.$axios.get("unlike",{params:{blogid:this.blogs[i].id}}).then(res=>{
                        if(res.data!='ok'){
                            this.$message.error("出了一点小问题。。。")
                        }
                    })
                        .catch(err=>{
                            console.log("errrr")
                            this.$message.error("emmm,网络开小差了，再试一次吧")
                        })
                    //this.like = Object.assign({}, this.like)
                }
            },
            handlefavourite(i){
                if(this.blogs[i].favourite==false){
                    this.blogs[i].favourite=true
                    this.$axios.get("favourite",{params:{blogid:this.blogs[i].id}}).then(res=>{
                        if(res.data!='ok'){
                            this.$message.error("出了一点小问题。。。")
                        }
                    })
                        .catch(err=>{
                            this.$message.error("emmm,网络开小差了，再试一次吧")
                        })
                    //this.like = Object.assign({}, this.like)
                }
                else{
                    this.blogs[i].favourite=false
                    this.$axios.get("unfavourite",{params:{blogid:this.blogs[i].id}}).then(res=>{
                        if(res.data!='ok'){
                            this.$message.error("出了一点小问题。。。")
                        }
                    })
                        .catch(err=>{
                            this.$message.error("emmm,网络开小差了，再试一次吧")
                        })
                        .then(res=>{

                        })
                    //this.like = Object.assign({}, this.like)
                }
            },
            handledit(i){
                this.$router.push({name:'edit',params:{blogid:this.blogs[i].id}})
            },
            handledelete(i){
                this.$axios.get("myfavourite/delete",{params:{blogid:this.blogs[i].id}}).then(res=>{
                    if(res.data!='ok'){
                        this.$message.error("出了一点小问题。。。")
                    }
                    else{
                        if(this.blogs.length==1 && this.current_page!=1)
                            this.getblogs(this.current_page-1)
                        else
                            this.getblogs(this.current_page)
                        this.count=this.count-1
                        this.blogs.splice(i,1)
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                    }
                })
            },
            getblogs(val) {
                this.$axios.get("/myfavourite/getmyfavourite",{params:{val:val}})
                    .then(response=>{
                        this.blogs=response.data;
                    })
                    .catch(error=>console.log(error));
                this.$axios.get("/myfavourite/countAll")
                    .then(response=>{this.count=response.data;})
                    .catch(error=>console.log(error));
            },
            handlewriter(val){
                this.$router.push({name:'personal',params:{username:this.blogs[val].writer}})
            }
        },
        beforeCreate() {
            this.$axios.get("/myfavourite/getmyfavourite",{params:{val:1}})
                .then(response=>{
                    this.blogs=response.data;
                })
                .catch(error=>console.log(error));
            this.$axios.get("/myfavourite/countAll")
                .then(response=>{this.count=response.data;})
                .catch(error=>console.log(error));
        }
    }
</script>

<style scoped>
    .orangered{
        color: orangered;
    }

    .yellow{
        color: #e2c339;
    }
    .text {
        font-size: 14px;
        text-align: left;
    }

    .item {
        padding: 0px;
    }

    .box-card {
        width: 480px;
    }
    .card-margin{
        align-items: center;
    }
    .el-divider-margin{
        margin-top: 10px;
        margin-bottom: 13px;
    }
</style>