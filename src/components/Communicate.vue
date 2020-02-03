<template>
    <div>
        <Home @username="handlerusername"></Home>
    </div>
</template>

<script>
    import Home from '@/views/Home'
    export default {
        name: "Communicate",
        components:{
            Home
        },
        methods:{
            handlerusername(val){
                console.log("handle"+val)
            }
        }
    }
</script>

<style scoped>

</style>