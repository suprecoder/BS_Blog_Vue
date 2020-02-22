<template>
    <div style="position: relative">
        <Nav style="position: fixed;z-index: 10;"></Nav>
        <div style="background-color: #fbfff8;padding-top: 90px;">
            <el-card style="background-color: #fbfff8;border-color: black;width: 80%;margin-left: 10%">

                <h1>{{title}}</h1>
                <h3 style="color: rgba(35,79,171,0.83);margin-left: 60%;cursor: pointer" @click="handlewriter">{{writer}}</h3>
                <el-divider></el-divider>
                <div style="margin-left: 15%;margin-right: 15%">
                    <div class="previewContainer markdown-body" style="background-color: #fbfff8;" v-html="content_html"></div>
                    <!--        <div v-html="html_content"></div>-->
                </div>
                <Comment :blogid="this.$route.params.blogid"></Comment>
            </el-card>
        </div>
    </div>
</template>

<script>
    import Nav from '@/components/Nav'
    import Comment from '@/components/Comment'
    export default {
        name: "ShowBlog",
        data(){
            return {
                title:'',
                content_html:'',
                writer:''
            }
        },
        methods:{
            handlewriter(){
                this.$router.push({name:'personal',params:{username:this.writer}})
            }
        },
        components:{
            Nav,Comment
        },
        created() {
            let blogid=this.$route.params.blogid
            this.$axios.post('showblog/getHtmlContent',{
                blogid:blogid
            })
                .then(res=>{
                    this.title=res.data.title
                    this.content_html=res.data.content_html;
                    this.writer=res.data.username
                })
                .catch(error=>{console.log(error)})
        }
    }
</script>

<style lang="scss" scoped>
    /*引入reset文件*/

    @import "../../static/css/reset";

    /*引入github的markdown样式文件*/

    @import "../../static/css/github-markdown.css";

    /*引入atom的代码高亮样式文件*/

    @import "../../static/css/atom-one-dark.min.css";
    .previewContainer {
        text-align: left;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        background: #fff;
        overflow: auto;
        padding: 10px;
    }
</style>