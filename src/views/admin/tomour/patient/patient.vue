<style lang="scss" scope>
// 引入公共变量及方法
@import '~common/scss/public/base-url.scss';
.patientInfo_title{
    font-size:18px;
    color:#666;
}
.patient_info_footer{
    button {
        margin: 0 10px;
    }
}
</style>
<template>
    <div class="patientInfo">
        <p class="patientInfo_title">病人信息</p>
        <basicInfo></basicInfo>
        <div style="width:100%;height:30px;background:#f5f7f9;"></div>
        <deaseInfo></deaseInfo>
        <div class="patient_info_footer">
            <Row type="flex" justify="end" class="code-row-bg">
                <Col col="8">
                <Button type="ghost" @click="upStep">返回</Button>
                <Button @click="nextStep" type="primary">下一步</Button>
                </Col>
            </Row>
        </div>
    </div>
</template>

<script>
import basicInfo from '@/views/admin/tomour/patient/basicInfo.vue';
import deaseInfo from '@/views/admin/tomour/patient/deaseInfo.vue';
export default {
    data() {
        return {
            
        }
    },
    methods: {
        sortable() {
            
        },
        //返回
        upStep(){
            this.$router.push('/admin/tomour/index')
        },
        //下一步
        nextStep() {
            this.$router.push('/admin/tomour/sample');
        },
    },
    mounted() {
        
    },
    components:{
        deaseInfo,
        basicInfo,
    },
    created() {

    }
}
</script>