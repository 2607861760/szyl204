<style lang="scss" scope>
// 引入公共变量及方法
@import '~common/scss/public/base-url.scss';
.disease_about {
    
    background: #fff;
    .disease_about_title {
        height: 50px;
        line-height: 50px;
        background: #fff;
        border-bottom: 1px solid #ccc;
        span {
            margin-left: 5px;
        }
    }
    .disease_info,.disease_risk{
        padding: 0 22px 22px;
        width: 100%;
    }
    .disease_info_form {
        padding-top: 20px;
        margin-top: 0;
        .disease_info_form_row {
            height: 55px;
            line-height: 55px;
        }
        .tnm_btn {
            padding: 2px 5px;
        }
        .cell_active {
            background: #3c3f60;
            color: #fff;
        }
        .api {
            button {
                padding: 2px 10px;
                margin-top: 10px;
                margin-right: 10px;
            }
        }
    }
    .disease_risk_form {
        padding-top: 20px;
        margin-top: 0;
        .disease_risk_form_row {
            height: 55px;
            line-height: 55px;
        }
    }
    .el-table tr{
        background: none;
        &:hover>td{
            background: #fff;
        }
        &:hover>.cell_active{
            background: #3c3f60;
        }
    }
    .el-table thead tr th {
        color: #fff;
        background: #525C79;
        border: none;
        font-weight: normal;
    }
    .el-table tbody tr td {
        height: 20px;
        cursor: pointer;
        padding: 8px 0;
    }
}
</style>
<template>
    <div class="disease_about">
        <div class="disease_info">
            <div class="disease_about_title">
                <Icon type="plus"></Icon>
                <span>疾病信息</span>
            </div>
            <!-- <div>
                <Form class="disease_info_form" :label-width="80" :model="formData" ref="modalForm" :rules="ruleValidate">
                    <Row type="flex" justify="center" class="basic_info_form_row">
                        <Col class="row" span="7">
                        <FormItem style="width:30%;" class="disease_info_form_item" label="病人编号" prop="patientCode">
                            <Input style="max-width:200px" v-model="formData.sampleCode"></Input>
                        </FormItem>
                        </Col>
                        <Col class="row" span="7">
                        <FormItem style="width:30%;" class="basic_info_form_item" label="TNM分期">
                            <Poptip placement="bottom-start" width="400">
                                <Button class="tnm_btn" size="small" type="primary">点击选择</Button>
                                <div class="api" slot="content">
                                    <el-table @cell-click="cellClick" :span-method="spanMethod" border="border" align="center" :data="tnmList">
                                        <el-table-column prop="T" label="T"></el-table-column>
                                        <el-table-column prop="N" label="N"></el-table-column>
                                        <el-table-column prop="M" label="M"></el-table-column>
                                        <el-table-column label="肿瘤分期">
                                            <template slot-scope="scope">
                                                <span v-if="scope.$index==0">对应值</span>
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                    <Row type="flex" justify="end" class="code-row-bg">
                                        <Col col="8">
                                        <Button @click="resetActive" type="ghost">重置</Button>
                                        <Button type="primary">确定</Button>
                                        </Col>
                                    </Row>
                                </div>
                            </Poptip>
                        </FormItem>
                        </Col>
                        <Col class="row" span="7"></Col>
                    </Row>
                </Form>
           
           
           
            </div> -->
            <div>
                <p>{{diseaseInfoData}}</p>
                <Form class="disease_info_form" :label-width="100" :model="diseaseInfoData">
                    <Row type="flex" justify="start" class="disease_info_form_row" v-for="(item,index) of (diseaseInfoData.blockModels)" :key="index">
                        <Col class="row" span="8" v-for="(list,indexs) of item.itemNodes" :key="indexs">
                            <FormItem style="width:30%;" class="disease_info_form_item" :required="list.bRequired" :prop="list.itemValue" :label="list.itemName">
                                <Select style="max-width:200px" v-if="list.itemType==itemType.apiSelect" v-model="list.itemValue" @on-change="getTemplatebyid">
                                    <Option v-for="(cont,ids) of list.content" :key="ids" :value="cont.templateid">{{cont.name}}</Option>
                                </Select>
                            </FormItem>
                        </Col>
                    </Row>
                </Form>
            </div>
        </div>
        <div style="width:100%;height:30px;background:#f5f7f9;"></div>
        <div class="disease_risk">
            <div class="disease_about_title">
                <Icon type="flash"></Icon>
                <span>疾病风险因素</span>
            </div>
            <!-- <div>
                <Form class="disease_risk_form" :label-width="80" :model="formData" ref="modalForm" :rules="ruleValidate">
                    <Row type="flex" justify="center" class="disease_risk_form_row">
                        <Col class="row" span="7">
                        <FormItem style="width:30%;" class="basic_info_form_item" label="病人编号" prop="patientCode">
                            <Input style="max-width:200px" v-model="formData.sampleCode"></Input>
                        </FormItem>
                        </Col>
                        <Col class="row" span="7"></Col>
                        <Col class="row" span="7"></Col>
                    </Row>
                </Form>
            </div> -->
        </div>
    </div>
</template>

<script>
import { getCookie } from '@/common/js/cookie.js';
import { data, task } from 'api/index.js'
export default {
    data() {
        return {
            itemType:{
               "apiSelect":9,  //调用接口的下拉菜单
            },
            diseaseInfoData:{},//疾病信息数据
            diseaseNameData:{},//疾病名称数据
            diseaseRiskInfoData:{},//疾病风险因素数据
            pageTempList:{},//当前页病人数据
            border: true,   //表格纵列 边框
            tnmList: [{
                "T": "TX",
                "N": "N0",
                "M": "M"
            }, {
                "T": "Tis",
                "N": "N1",
                "M": "M0"
            }, {
                "T": "T1a",
                "N": "N2",
                "M": "M1a"
            }, {
                "T": "T1b",
                "N": "N3",
                "M": "M1b"
            }, {
                "T": "T2a",
                "N": "Any N",
                "M": ""
            }],
        }
    },
    methods: {
        cellClick(row, column, cell, event) {
            //移除当前列所有的选中效果
            $("." + column.id).removeClass("cell_active");
            //如果当前列不是第四行 给当前选中的添加选中效果
            if (column.id !== "el-table_1_column_4") {
                $(cell).addClass("cell_active");
            }
        },
        //合并单元格
        spanMethod({ row, column, rowIndex, columnIndex }) {
            let length = this.tnmList.length;
            if (columnIndex === 3) {
                return {
                    rowspan: length + 1,
                    colspan: 1
                };
            }
        },
        //获取模板页面数据
        getTemplatebyid(a){

        },
        //获取疾病名称
        getDiseaseName(){
            let obj = {
                "userId": getCookie('userid'),
                "productId":2
            }
            data.getAddNewProjectTemplate(obj).then((data)=> {
                if(data.returnCode=="200" || data.returnCode =="0"){
                    this.dobuildDiseaseNameData(data.data);
                }else if(data.returnCode==422 || data.returnCode==204){
                    this.$router.push('/login')
                }else{
                    this.$Message.error(data.msg)
                }
            }).catch((error)=>{
            	this.$Message.error(error.statusText);
            })
        },
        //创建疾病名称数据结构
        dobuildDiseaseNameData(data){
            if(data.pageModels && data.pageModels.length>0){
                let pageM=data.pageModels[0];
                if(pageM.blockModels && pageM.blockModels.length>0){
                    this.diseaseNameData = pageM.blockModels[0];
                    this.diseaseInfoData.blockModels= pageM.blockModels;
                }
            }
            console.log(this.diseaseInfoData);
        },
        //重置按钮
        resetActive() {

        }
    },
    mounted() {
       
    },
    created() {
        this.getDiseaseName(); 
    }
}
</script>