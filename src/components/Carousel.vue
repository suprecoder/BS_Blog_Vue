<template>
    <div>
        <el-carousel height="350px" style="width: 80%;margin-left: 10%">
            <el-carousel-item v-for="item in data" :key="item.liaocc" style="height:100%;width: 100%;">
                <a href="/personal">
                    <img :src=item.imageurl style="width: 100%;height: 100%;"></img>
                    <h3 class="small">{{ item.liaocc }}</h3>
                </a>
            </el-carousel-item>
         </el-carousel>
    </div>
</template>

<script>
    export default {
        name: "Carousel",
        data(){
            return {
                data:[
                    {
                        liaocc:"大四学生发明文言文编程语言，脑洞新奇",
                        imageurl:"https://imgconvert.csdnimg.cn/aHR0cHM6Ly9tbWJpei5xcGljLmNuL21tYml6X2pwZy9QbjRTbTBSc0F1aFhMc0ppYlhmUE45SThSaWJYYzBXcVYwMGNteHNpYlBLbFYwV0dvQW5lb0VldVVJcUJkSlB2WG1nNmlheFpJZzRpYjAycmlhSGliZVkwUXY3ZmcvNjQw?x-oss-process=image/format,png"
                    },
                    {
                        liaocc:"2 亿像素手机 2020 年诞生！",
                        imageurl:"http://5b0988e595225.cdn.sohucs.com/q_70,c_zoom,w_640/images/20171218/a73e26094b7e4d96a4ab3e6e503056a0.jpeg"
                    }
                ]
            }
        },
        methods:{
        }
    }
</script>

<style scoped>
    .el-carousel__item h3 {
        color: white;
        font-size: 22px;
        position: absolute;
        bottom: 0;
        left: 0%;
        margin-bottom: 30px;
        margin-left: 50px;
    }

    /*.el-carousel__item:nth-child(2n) {*/
    /*    background-image:url(imageurl);*/
    /*    background-size: 100%;*/
    /*}*/

    /*.el-carousel__item:nth-child(2n+1) {*/
    /*    background-image: url("https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1576756028317&di=4df6af60e6337ddd8af56662d0f34f40&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2Fc%2F5630593a61eef.jpg");*/
    /*    background-size: 100%;*/
    /*}*/
</style>