<template>
    <div style="background-color: #ddd;text-align: left">
        <islogin></islogin>
        <div>
            <Nav></Nav>
            <div style="width: 90%;margin-left: 5%">
                <el-input v-model="title" placeholder="请输入标题">
                </el-input>

            </div>

            <markdown style="height: 680px;margin-top:40px;" @getmdevent="getmd" :mdValuesP="mdValues"></markdown>
        </div>


        <div class="option">
            <div>
                <span style="vertical-align: top;">博客摘要：</span>
                <el-input
                        maxlength="150"
                        show-word-limit
                        type="textarea"
                        :autosize="{ minRows: 2, maxRows: 4}"
                        placeholder="请输入博客摘要"
                        v-model="summary"
                style="width: 50%">
                </el-input>
                <el-tooltip class="item" effect="dark" style="vertical-align: top" content="博客摘要作为主要内容，会被显示在主页以提供比标题更详细的参考" placement="bottom-start">
                    <i class="el-icon-question"></i>
                </el-tooltip>
            </div>

            <div style="margin-top: 10px">
                <span style="font-size: medium;">文章标签：</span>
                <el-tag
                        :key="tag"
                        v-for="tag in dynamicTags"
                        closable
                        :disable-transitions="false"
                        @close="handleClose(tag)">
                    {{tag}}
                </el-tag>
                <el-input
                        class="input-new-tag"
                        v-if="TagsinputVisible"
                        v-model="TagsinputValue"
                        ref="saveTagInput"
                        size="small"
                        @keyup.enter.native="handleInputConfirm"
                        @blur="handleInputConfirm"
                >
                </el-input>
                <el-button v-else-if="addTagButtonVisible" class="button-new-tag" size="small" @click="showInput"><span style="color: #61aeee;font-weight: bolder">+ 添加标签</span></el-button>
            </div>

            <div style="margin-top: 10px">
                <span>发布形式：</span>
                <el-radio v-model="publictype" label="1" style="margin-left: 10px">公开</el-radio>
                <el-radio v-model="publictype" label="2" style="margin-left: 10px">仅自己可见</el-radio>
            </div>
            <el-button type="success" @click="publishto" class="buttonsize" style="margin-top: 10px">发 布 博 客<i class="el-icon-upload el-icon--right"></i></el-button>
        </div>
    </div>
</template>

<script>
    import islogin from '@/components/islogin.vue'
    import Nav from "@/components/Nav"
    import markdown from "@/components/Markdown-Editor"

    export default {
        name: "Publish",
        components:{
            Nav,markdown,islogin
        },
        data(){
            return{
                id:'',
                title: "",
                summary:'',
                mdValues:'',
                //发布方式
                publictype: '1',
                //标签值
                dynamicTags: [],
                TagsinputValue: '',
                addTagButtonVisible:true,
                TagsinputVisible: false,
                msg:"",
            }
        },
        beforeCreate(){
            this.id=this.$route.params.blogid
            if(this.id)
                this.$axios.get("/edit/getblog",{params:{blogid:this.id}}).then(res=>{
                    let blog=res.data;
                    if(blog.id==null)
                        this.$router.push('/')
                    this.id=blog.id
                    this.dynamicTags=blog.tags
                    this.title=blog.title
                    this.summary=blog.summary
                    this.mdValues=blog.content_md
                    this.publictype=''+blog.publictype
                })
        },
        methods:{
            getmd:function(res){
                this.msg=res
            },
            publishto(){
                if(this.title==''){
                    this.$message({
                        message:"请输入标题",
                        type:'error'
                    })
                }
                else {
                    let msg={
                        content_md: this.msg.mdValue,
                        content_html: this.msg.htmlValue,
                        title: this.title,
                        summary: this.summary,
                        tags: this.dynamicTags,
                        publictype:this.publictype
                    }

                    if(msg.content_md==null || msg.content_md==''){
                        this.$message({
                            message:"请输入博客内容",
                            type:'error'
                        })
                        return
                    }
                    if(this.id!='')
                        msg.id=this.id
                    this.$axios.post('publish', msg)
                        .then(res=>{
                            if(res.data=='no'){
                                this.$message.error("发布失败，请重试")
                            }
                            else{
                                this.id=res.data
                                this.$message("成功发布")
                            }
                        })
                }
            },
            handleClose(tag) {
                this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
                this.addTagButtonVisible=true;
            },

            showInput() {
                this.TagsinputVisible = true;
                this.$nextTick(_ => {
                    this.$refs.saveTagInput.$refs.input.focus();
                });
            },

            handleInputConfirm() {
                let inputValue = this.TagsinputValue;
                if (inputValue) {
                    let flag=true;
                    for(let i=0;i<this.dynamicTags.length;i++) {
                        if(this.dynamicTags[i]==inputValue)
                            flag=false;
                    }
                    if(flag)
                        this.dynamicTags.push(inputValue);
                    else
                        this.$message.error("你已经添加过该标签了")
                    if(this.dynamicTags.length==5){
                        this.addTagButtonVisible=false;
                    }
                }
                this.TagsinputVisible = false;
                this.TagsinputValue = '';
            }
        }
    }
</script>

<style scoped>

    .buttonsize{
        width: 8.5%;
    }
    .option{
        width: 90%;
        padding-bottom: 200px;
        margin-left: calc(5%);
        margin-top: 20px;
        background-color: #dddddd;
    }
    .el-tag + .el-tag {
        margin-left: 10px;
    }
    .button-new-tag {
        margin-left: 10px;
        height: 32px;
        line-height: 30px;
        padding-top: 0;
        padding-bottom: 0;
    }
    .input-new-tag {
        width: 90px;
        margin-left: 10px;
    }
</style>