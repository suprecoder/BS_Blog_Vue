<template>
    <div>
        <Nav :activeIndex=navindex style="position: fixed;margin-top: 0px;z-index: 10;"></Nav>
        <div style="background-color: #f6f6f6;padding-bottom: 20px">
            <el-row style="padding-top: 90px">
                <el-col :span="17">
                    <MyLikeBlogList style="margin-top: 20px;margin-left: 14%"></MyLikeBlogList>
                </el-col>
                <el-col :span="7">
                    <optioncard style="position: fixed"></optioncard>
                    <hottaglist style="position: fixed;margin-top: 180px"></hottaglist>
                </el-col>
            </el-row>
        </div>

        <div class="my-el-divider--horizontal">
            <el-divider></el-divider>
        </div>
        <footer2></footer2>


    </div>
</template>

<script>
    import Nav from "@/components/Nav"
    import optioncard from "@/components/OptionCard"
    import MyLikeBlogList from "@/components/MyLikeBlogList"
    import footer2 from '@/components/Footer'
    import hottaglist from '@/components/HotTagList'
    export default {
        name: "MyLike",
        data(){
            return {
                a:1,
                blogs:[],
                count:0,
                navindex:''
            }
        },

        components:{
            Nav,optioncard,MyLikeBlogList,footer2,hottaglist
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