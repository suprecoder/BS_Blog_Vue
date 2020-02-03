<template>
    <div style="width: 250px;">
        <el-card style="color: gray;">
            <el-row>
                <el-col :span="11" ><div @click="handlewriteblog" style="cursor: pointer"><i class="el-icon-document-add"></i><br>写博客</div></el-col>
                <el-col :span="12"><div style="cursor: pointer" @click="handlefavoblog"><i class="el-icon-star-off"></i><br>我的收藏</div></el-col>
            </el-row>
            <el-row style="margin-top: 30px">
                <el-col :span="11"><div style="cursor: pointer" @click="handlelikeblog"><i class="el-icon-present"></i><br>我的喜欢</div></el-col>
                <el-col :span="12"><div style="cursor: pointer" @click="handlepersonal"><i class="el-icon-user"></i><br>个人中心</div></el-col>
            </el-row>
        </el-card>
    </div>
</template>

<script>
    export default {
        name: "OptionCard",
        methods:{
            handlewriteblog(){
                this.$router.push('publish')
            },
            handlefavoblog(){
                this.$router.push('myfavourite')
            },
            handlelikeblog(){
                this.$router.push('mylike')
            },
            handlepersonal(){
                this.$router.push('personal')
            },
        }
    }
</script>

<style scoped>

</style>