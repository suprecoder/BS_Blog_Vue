<template>
    <div>
        <islogin></islogin>
        <Nav :activeIndex=navindex style="position: fixed;margin-top: 0px;z-index: 10;"></Nav>
        <div style="background-color: #f6f6f6;">
            <el-row style="padding-top: 90px">
                <el-col :span="17">
                    <MyFavouriteBlogList style="margin-top: 20px;margin-left: 14%"></MyFavouriteBlogList>
                </el-col>
                <el-col :span="7">
                    <optioncard style="position: fixed"></optioncard>
                </el-col>
            </el-row>
        </div>




    </div>
</template>

<script>
    import islogin from '@/components/islogin.vue'
    import Nav from "@/components/Nav"
    import optioncard from "@/components/OptionCard"
    import MyFavouriteBlogList from "@/components/MyFavouriteBlogList"
    export default {
        name: "MyFavourite",
        data(){
            return {
                a:1,
                blogs:[],
                count:0,
                navindex:''
            }
        },

        components:{
            Nav,islogin,optioncard,MyFavouriteBlogList
        }
    }
</script>

<style scoped>
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