<template>
    <div>
        <el-form>
            <el-form-item>
                <el-upload
                        class="avatar-uploader"
                        action="http://localhost:8081/api/personal/upload"
                        :show-file-list="false"
                        :with-credentials='true'
                        :on-success="handleAvatarSuccess"
                        :key="fresh"
                        :before-upload="beforeAvatarUpload">
                    <img v-if="img" :src="img" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: "AvatarUpload",
        data(){
            return{
                imageUrl: '',
                fresh:1,
                img:'http://localhost:8081/api/personal/getmyavatar',
            }
        },
        methods:{
            handleAvatarSuccess(res, file) {
                //  this.imageUrl = URL.createObjectURL(file.raw);
                this.img='http://localhost:8081/api/personal/getmyavatar'+'?'+new Date()

            },
            onSubmit() {
                console.log('submit!');
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            }
        }
    }
</script>

<style scoped>
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
</style>