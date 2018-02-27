<style lang="scss" scope>
// 引入公共变量及方法
@import '~common/scss/public/base-url.scss';
.basic_info {
    padding: 0 22px;
    width: 100%;
    background: #fff;
    .basic_info_title{
        height: 50px;
        line-height: 50px;
        background: #fff;
        border-bottom: 1px solid #ccc;
        span {
            margin-left: 5px;
        }
    }
    .basic_info_form {
        padding-top: 20px;
        margin-top: 0;
        .basic_info_form_row {
            height: 55px;
            line-height: 55px;
        }
    }
}
</style>
<template>
    <div class="basic_info">
        <div class="basic_info_title">
            <Icon type="android-person"></Icon>
            <span>基本信息（ * 为必填项）</span>
        </div>
        <div>
            <Form class="basic_info_form" :label-width="80" :model="formData" ref="modalForm">
                <Row type="flex" justify="center" class="basic_info_form_row">
                    <Col class="row" span="7">
                    <FormItem style="width:30%;" class="basic_info_form_item" label="病人编号">
                        <Input style="max-width:200px" v-model="formData.patientcode"></Input>
                    </FormItem>
                    </Col>
                    <Col class="row" span="7">
                    <FormItem style="width:30%;" class="basic_info_form_item" label="病人姓名">
                        <Input style="max-width:200px" v-model="formData.patientname"></Input>
                    </FormItem>
                    </Col>
                    <Col class="row" span="7">
                    <FormItem style="width:30%;" class="basic_info_form_item" label="性别">
                        <Select style="max-width:200px" v-model="formData.gender" class="basic_info_form_select">
                            <Option value="0">男</Option>
                            <Option value="1">女</Option>
                        </Select>
                    </FormItem>
                    </Col>
                </Row>
                <Row type="flex" justify="center" class="basic_info_form_row">
                    <Col class="row" span="7">
                        <FormItem style="width:30%;" class="basic_info_form_item" label="身份证号">
                            <Input style="max-width:200px" v-model="formData.idcard"></Input>
                        </FormItem>
                    </Col>
                    <Col class="row" span="7">
                        <FormItem style="width:30%;" class="basic_info_form_item" label="出生日期">
                            <DatePicker style="max-width:200px" type="date" v-model="formData.birthday"></DatePicker>
                        </FormItem>
                    </Col>
                    <Col class="row" span="7">
                        <FormItem style="width:30%;" class="basic_info_form_item" label="电话">
                            <Input style="max-width:200px" v-model="formData.phone"></Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row type="flex" justify="center" class="basic_info_form_row">
                    <Col class="row" span="7">
                    <FormItem style="width:30%;" label="种族">
                        <Select style="max-width:200px" v-model="formData.nation" class="basic_info_form_select">
                            <Option value="0">东亚</Option>
                            <Option value="1">南亚</Option>
                            <Option value="2">东南亚</Option>
                            <Option value="3">欧洲</Option>
                            <Option value="4">非洲</Option>
                            <Option value="5">美洲</Option>
                        </Select>
                    </FormItem>
                    </Col>
                    <Col class="row" span="7"></Col>
                    <Col class="row" span="7"></Col>
                </Row>
            </Form>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            formData: {},  //表单数据
        }
    },
    methods: {
       
    },
    mounted() {
        
    },
    created() {

    }
}
</script>