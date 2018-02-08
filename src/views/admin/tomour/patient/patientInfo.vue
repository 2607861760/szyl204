<style lang="scss" scope>
// 引入公共变量及方法
@import '~common/scss/public/base-url.scss';
.patientInfo_title{
    font-size:18px;
    color:#666;
}
</style>
<template>
    <div class="patientInfo">
        <p class="patientInfo_title">病人信息</p>
        <basicInfo></basicInfo>
        <div style="width:100%;height:30px;background:#f5f7f9;"></div>
        <sampleList></sampleList>
    </div>
</template>
<script>
import basicInfo from '@/views/admin/tomour/patient/basicInfo.vue';
import sampleList from '@/views/admin/tomour/patient/sampleList.vue';
export default {
    data(){
        return{

        }
    },
    components:{
        basicInfo,
        sampleList
    }
}
</script>

