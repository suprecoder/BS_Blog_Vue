<template>
    <div class="home">
        <islogin></islogin>
        <Nav :activeIndex=navindex style="position: fixed;margin-top: 0px;z-index: 10;"></Nav>
        <div style="background-color: #f6f6f6">
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
        <footer2 style="width: 100%;height: 100px"></footer2>
    </div>
</template>

<script>
    // @ is an alias to /src
    import islogin from '@/components/islogin.vue'
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
            Nav,BlogList,Carousel,islogin,footer2,optioncard
        }

    }
</script>
<style>

    .nav-style{
        top:0;

    }
</style>