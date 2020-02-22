<template>
    <div class="home">
        <Nav :activeIndex=navindex style="position: fixed;margin-top: 0px;z-index: 10;"></Nav>
        <div style="background-color: #f6f6f6;padding-bottom: 20px">
            <el-row style="padding-top: 90px">
                <el-col :span="17">
                    <carousel  style="position: relative;margin-left: 14%"></carousel>
                    <BlogList style="margin-top: 20px;margin-left: 14%"></BlogList>
                </el-col>
                <el-col :span="7">
                    <optioncard style="position: fixed"></optioncard>
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
    // @ is an alias to /src
    import Nav from '@/components/Nav.vue'
    import BlogList from '@/components/BlogList'
    import Carousel from '@/components/Carousel'
    import footer2 from '@/components/Footer'
    import optioncard from '@/components/OptionCard'
    export default {
        name: 'home',
        data(){
            return {
                username:'',
                age:23,
                show2: true,
                navindex:'1'
            }
        },
        created(){
            this.username=this.$route.params.username
            //console.log("par"+this.$route.params.username)
        },
        methods:{
        },
        components: {
            Nav,BlogList,Carousel,footer2,optioncard
        }

    }
</script>
<style>
    .my-el-divider--horizontal /deep/ .el-divider--horizontal{
        margin: 0 0;
    }
</style>