<template>
    
</template>
<script>
    export default{
        name:'blank',
        beforeRouteEnter(to, from, next){
            let _from=from.path;
            next(vm=>{
                vm.$router.push(_from)
            })
        }
    }
</script>
