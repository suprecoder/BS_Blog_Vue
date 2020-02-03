<template>
</template>

<script>
    export default {
        name: "islogin",
        beforeCreate:function(){
            this.$axios.get("islogin").then(response=>{
                if(response.status!=200 || response.data.data!='reject'){
                    this.$emit('C_getusername',response.data.data)
                }
                else{
                    this.$router.push("/login")
                }
            })
                .catch(error=>{
                    console.log("status:"+response.status)})

        },
    }
</script>

<style scoped>

</style>