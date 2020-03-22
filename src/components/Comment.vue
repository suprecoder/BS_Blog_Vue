<template>
    <div>
        <el-card style="position: relative;width: 100%;min-height: 100px">
            <span>
                <el-avatar class="myavatar"  :src="getavatar()"></el-avatar>
                <el-input
                        class="input"
                        type="textarea"
                        :rows="3"
                        maxlength="200"
                        show-word-limit
                        :placeholder="hint"
                        v-model="textarea">
                </el-input>
                <el-button  type="primary" style="position:absolute;left: 55%;margin-top: 35px" @click="publish">发表</el-button>
            </span>
            <h4 v-if="this.comments.length==0" style="position: relative;margin-top: 90px">评论区空空如也·_·</h4>
            <div style="position: relative;margin-top: 90px;width: 100%">
                <div style="width: 100%;text-align: left;margin-top: 12px" v-for="comment in comments" :key="comments.id">
                    <el-divider></el-divider>
                    <span>
                        <el-avatar class="avatar" :src="getavatar(comment.username)"></el-avatar>
                        <label style="padding-left: 12px">{{comment.username}}</label>
                        <label style="padding-left: 12px" v-if="comment.reply_username!=null">回复 {{comment.reply_username}}</label>
                        :
                        <label style="margin-left: 20px">{{comment.comment}}</label>
                        <label v-if="comment.username!=$cookies.get('username')" style="float: right;margin-right: 50px;cursor: pointer" @click="handlecallback(comment.username)">回复</label>
                    </span>
                </div>
            </div>
        </el-card>
    </div>
</template>

<script>
    export default {
        name: "Comment",
        data(){
            return{
                textarea: '',
                hint:'快对作者说些什么吧！',
                comments:[],
                msg:{
                    blog_id: this.$route.params.blogid,
                    reply_username: '',
                    comment: '',
                }
            }
        },
        props:['blogid'],
        created(){
            this.$axios.get('comment/getcomment',{params:{blogid:this.blogid}})
                .then(res=>{
                    this.comments=res.data
                })
        },
        methods:{
            getavatar(username){
                if(username){
                    return 'http://101.37.84.109:8081/api/personal/getavatarbyname/'+username
                }
                else{
                    return 'http://101.37.84.109:8081/api/personal/getmyavatar'
                }
            },
            publish(){
                this.msg.comment=this.textarea
                this.$axios.post('comment/publishcomment',this.msg)
                    .then(res=>{
                        if(res.data=='ok')
                            this.$axios.get('comment/getcomment', {params: {blogid: this.blogid}})
                                .then(res2 => {
                                    this.comments = res2.data
                                })

                    })
                this.textarea=''
            },
            handlecallback(val){
                this.hint='@'+val+": "
                this.msg.reply_username=val
            }
        }
    }
</script>

<style scoped>
    .myavatar{
        position: absolute;
        width: 35px;
        height: 35px;
        left: 10px;
    }
    .avatar{
        width: 25px;
        height: 25px;
    }
    .input{
        width: 50%;
        position: absolute;
        left: 50px;
    }
</style>