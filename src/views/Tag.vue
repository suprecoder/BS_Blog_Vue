<template>
    <div style="width: 100%">
        <el-container style="height: 100%">
           <el-header style="padding: 0"><Nav></Nav></el-header>
            <el-container>
                <el-container>
                    <el-aside width="15%" style="background-color: #f6f6f6"><label>所有标签</label><el-tree :data="tags" :props="defaultProps" style="padding:10px 0;background-color: #f6f6f6" @node-click="handleNodeClick"></el-tree></el-aside>
                    <el-main style="">
                        <div v-for="i in blogs.length" class="card-margin" :key="i">
                            <div>
                                <el-card v-if="blogs[i-1]!=null" class="box-card" style="width: 100%;padding-top: 1px;margin-bottom: 25px;position: relative">
                                    <div  class="text item" style="cursor: pointer">
                                        <a style="font-size: larger;font-weight: bolder" @click="handleToShowBlog(blogs[i-1].id)">{{blogs[i-1].title}}</a>
                                        <span  @click="handlewriter(i-1)" style="color: rgba(35,79,171,0.83);cursor: pointer;position: absolute;right:20px">
                                <el-avatar :src="getavatar(blogs[i-1].id)" style="width: 18px;height: 18px;margin-bottom: -5px"></el-avatar>
                                <span style="margin-left: 5px">{{blogs[i-1].writer}}</span>
                            </span>
                                        <el-divider class="el-divider-margin"></el-divider>
                                        <p @click="handleToShowBlog(blogs[i-1].id)">{{blogs[i-1].summary }}</p>
                                    </div>
                                    <div style="text-align: left;">
                                        <el-tag style="margin-right: 12px" size="mini" v-for="tag in blogs[i-1].tags">{{tag}}</el-tag>
                                    </div>
                                    <div style="margin-top: 5px;text-align: left;font-size: small;color: gray;">
                            <span>
                                <span :class="{'orangered':blogs[i-1].like}" @click="handlelike(i-1)" style="cursor: pointer;"><i class="el-icon-s-opportunity"></i>喜欢</span>
                                <span :class="{'yellow':blogs[i-1].favourite}" @click="handlefavourite(i-1)" style="cursor: pointer;"><i class="el-icon-star-on" style="margin-left: 20px"></i>收藏</span>
                            </span>
                                    </div>
                                </el-card>
                            </div>
                        </div>

                    </el-main>
                </el-container>
                <el-footer style=";padding: 0"><footer2></footer2></el-footer>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    import Nav from '@/components/Nav'
    import footer2 from '@/components/Footer'
    export default {
        name: "Tag",
        components:{Nav,footer2},
        data(){
          return {
              tags:[],
              blogs:[],
              defaultProps: {
                  children: 'children',
                  label: 'label'
              }
          }
        },
        created() {
            this.$axios.get('/tag/getordertags').then(res=>{
                let temp=res.data
                for(let key in temp){
                    this.tags.push({
                            label: key,
                            children: []
                        })
                    for(let i=0;i<temp[key].length;i++){

                        this.tags[this.tags.length-1].children.push({label:temp[key][i]})
                    }
                }
                console.log(this.$route.params.key)
                this.handleNodeClick({label:this.$route.params.key})
            })

        },
        methods:{

            handleNodeClick(data){
                if(data.children==null) {
                    this.$axios.get('/tag/getblogbytag',{params:{tagname:data.label}}).then(res=>{
                        this.blogs=res.data
                        console.log(res.data)
                    })
                }
            },
            getavatar(val){
                return 'http://localhost:8081/api/personal/getavatar/'+val
            },
            handleToShowBlog(id){
                console.log(id)
                this.$router.push({ name: 'showblog', params: { blogid: id }})
            },
            handlewriter(val){
                this.$router.push({name:'personal',params:{username:this.blogs[val].writer}})
            },
            handlelike(i){
                if(this.blogs[i].like==false){
                    this.blogs[i].like=true
                    this.$axios.get("like",{params:{blogid:this.blogs[i].id}})
                    //this.like = Object.assign({}, this.like)
                }
                else{
                    this.blogs[i].like=false
                    this.$axios.get("unlike",{params:{blogid:this.blogs[i].id}})
                    //this.like = Object.assign({}, this.like)
                }
            },
            handlefavourite(i){
                if(this.blogs[i].favourite==false){
                    this.blogs[i].favourite=true
                    this.$axios.get("favourite",{params:{blogid:this.blogs[i].id}})
                    //this.like = Object.assign({}, this.like)
                }
                else{
                    this.blogs[i].favourite=false
                    this.$axios.get("unfavourite",{params:{blogid:this.blogs[i].id}})
                    //this.like = Object.assign({}, this.like)
                }
            }
        }
    }
</script>

<style scoped>
    .orangered{
        color: orangered;
    }

    .yellow{
        color: #e2c339;
    }
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