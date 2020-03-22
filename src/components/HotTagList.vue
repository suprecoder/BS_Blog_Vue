<template>
    <div style="width: 250px;">
        <el-card style="color: gray;text-align: left">
            <div slot="header" class="clearfix">
                <label style="">热门标签</label>
                <el-button style="float: right; padding: 0;margin-top:5px;color:yellowgreen" type="text" @click="$router.push('tags')"> >>more </el-button>
            </div>
            <div style="margin-top: -15px">

                <el-tag style="cursor:pointer;margin-right: 12px;margin-top: 15px" size="medium" v-for="tag in tags" @click="$router.push({name:'tags',params:{key:tag}})">{{tag}}</el-tag>
            </div>
        </el-card>
    </div>
</template>

<script>
    export default {
        name: "HotTagList",
        data(){
            return {
                tags:[],

            }
        },
        beforeCreate() {
            this.$axios.get('/gethottags').then(res=>{
                this.tags=res.data
            })
        }
    }
</script>

<style scoped>
    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }
    .clearfix:after {
        clear: both
    }
</style>