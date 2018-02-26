<style lang="scss" scope>
// 引入公共变量及方法
@import '~common/scss/public/base-url.scss';
.disease_about {
    .patientInfo_title{
        padding-left:22px;
        height:40px;
        line-height:40px;
        font-size:18px;
        color:#666;
    }
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
    .patient_info_footer{
        button {
            margin: 0 10px;
        }
        margin-bottom:10px;
    }
}
</style>
<template>
    <div class="disease_about">
        <p class="patientInfo_title">病人信息</p>
        <!--基本信息-->
         <div class="basic_info">
            <div class="basic_info_title">
                <Icon type="android-person"></Icon>
                <span>基本信息（ * 为必填项）</span>
            </div>
            <div>
                <Form class="basic_info_form" :label-width="80" :model="formData" ref="modalForm">
                    <Row type="flex" justify="center" class="basic_info_form_row">
                        <Col class="row" span="7">
                        <FormItem style="width:30%;" required class="basic_info_form_item" label="病人编号">
                            <Input style="max-width:200px" v-model="formData.patientcode"></Input>
                        </FormItem>
                        </Col>
                        <Col class="row" span="7">
                        <FormItem style="width:30%;" required class="basic_info_form_item" label="病人姓名">
                            <Input style="max-width:200px" v-model="formData.patientname"></Input>
                        </FormItem>
                        </Col>
                        <Col class="row" span="7">
                        <FormItem style="width:30%;" required class="basic_info_form_item" label="性别">
                            <Select style="max-width:200px" v-model="formData.gender" class="basic_info_form_select">
                                <Option value="true">男</Option>
                                <Option value="false">女</Option>
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
                                <Option value="东亚">东亚</Option>
                                <Option value="南亚">南亚</Option>
                                <Option value="东南亚">东南亚</Option>
                                <Option value="欧洲">欧洲</Option>
                                <Option value="非洲">非洲</Option>
                                <Option value="美洲">美洲</Option>
                            </Select>
                        </FormItem>
                        </Col>
                        <Col class="row" span="7"></Col>
                        <Col class="row" span="7"></Col>
                    </Row>
                </Form>
            </div>
        </div>
        <!--疾病信息-->
        <div class="disease_info">
            <div class="disease_about_title">
                <Icon type="plus"></Icon>
                <span>疾病信息</span>
            </div>
            <div>
                <Form class="disease_info_form" :label-width="100" :model="diseaseInfoData" v-if="diseaseInfoData.pageModel && diseaseInfoData.pageModel.blockModels && diseaseInfoData.pageModel.blockModels.length>0">
                    <Row type="flex" justify="start" class="disease_info_form_row" v-for="(item,index) of (diseaseInfoData.pageModel.blockModels)" :key="index">
                        <Col class="row" span="8" v-for="(list,indexs) of item.itemNodes" :key="indexs">
                            <FormItem v-if="list.itemType!=itemType.checkbox"  style="width:30%;" class="disease_info_form_item" :required="list.bRequired" :label="list.itemName">
                                <Select style="max-width:200px" v-if="list.itemType==itemType.apiSelect" v-model="list.itemValue" @on-change="getTemplatebyid">
                                    <Option v-for="(cont,ids) of list.content" :key="ids" :value="cont.templeid">{{cont.name}}</Option>
                                </Select>
                                 <Select style="max-width:100px" v-else-if="list.itemType==itemType.smallSelect" v-model="list.itemValue">
                                    <Option v-for="(cont,ids) of list.content" :key="ids" :value="cont">{{cont}}</Option>
                                </Select>
                                <Select style="max-width:200px" v-else-if="list.itemType==itemType.select" v-model="list.itemValue">
                                    <Option v-for="(cont,ids) of list.content" :key="ids" :value="cont">{{cont}}</Option>
                                </Select>
                                <Poptip placement="bottom-start" width="400" v-if="list.itemType==itemType.tnm">
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
                                <Input v-else-if="list.itemType==itemType.input"  v-model="list.itemValue"></Input>
                                <Input v-else-if="list.itemType==itemType.textarea" type="textarea" style="margin-bottom:10px;"  v-model="list.itemValue"></Input>
                                <DatePicker v-else-if="list.itemType==itemType.dataTimePick" type="date" style="max-width: 200px" v-model="list.itemValue"></DatePicker>
                            </FormItem>
                            <FormItem v-else  style="width:30%;" class="disease_info_form_item" :required="list.bRequired">
                                <Checkbox v-if="list.itemType==itemType.checkbox"  v-model="list.itemValue">{{list.itemName}}</Checkbox>
                            </FormItem>
                        </Col>
                    </Row>
                </Form>
            </div>
        </div>
        <!--疾病风险因素-->
        <div style="width:100%;height:30px;background:#f5f7f9;"></div>
        <div class="disease_risk">
            <div class="disease_about_title">
                <Icon type="flash"></Icon>
                <span>疾病风险因素</span>
            </div>
             <div>
               <Form class="disease_info_form" :label-width="100" :model="diseaseRiskInfoData" v-if="diseaseRiskInfoData.pageModel && diseaseRiskInfoData.pageModel.blockModels && diseaseRiskInfoData.pageModel.blockModels.length>0">
                    <Row type="flex" justify="start" class="disease_info_form_row" v-for="(item,index) of (diseaseRiskInfoData.pageModel.blockModels)" track-by="$index" :key="index">
                        <Col class="row" :span="colLength(item.itemNodes.length)" v-for="(list,indexs) of item.itemNodes" track-by="$index" :key="indexs">
                            <FormItem v-if="list.itemType!=itemType.checkbox" style="width:30%;" class="disease_info_form_item" :required="list.bRequired" :label="list.itemName">
                                <!--可以调用接口的下拉菜单-->
                                <Select style="max-width:200px" v-if="list.itemType==itemType.apiSelect" v-model="list.itemValue" @on-change="getTemplatebyid">
                                    <Option v-for="(cont,ids) of list.content" :key="ids" :value="cont.templeid">{{cont.name}}</Option>
                                </Select>
                                <!--长度较短下拉菜单-->
                                 <Select style="max-width:100px" v-else-if="list.itemType==itemType.smallSelect" v-model="list.itemValue">
                                    <Option v-for="(cont,ids) of list.content" :key="ids" :value="cont">{{cont}}</Option>
                                </Select>
                                <!--普通下拉菜单-->
                                <Select style="max-width:200px" v-else-if="list.itemType==itemType.select" v-model="list.itemValue">
                                    <Option v-for="(cont,ids) of list.content" :key="ids" :value="cont">{{cont}}</Option>
                                </Select>
                                <!--tnm-->
                                <Poptip placement="bottom-start" width="400" v-if="list.itemType==itemType.tnm">
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
                                <!--文本框-->
                                <Input v-else-if="list.itemType==itemType.input"  v-model="list.itemValue"></Input>
                                <!--文本域-->
                                <Input v-else-if="list.itemType==itemType.textarea" type="textarea" style="margin-bottom:10px;"  v-model="list.itemValue"></Input>
                                <!--日期选择器-->
                                <DatePicker v-else-if="list.itemType==itemType.dataTimePick" type="date" style="max-width: 200px" v-model="list.itemValue"></DatePicker>
                            </FormItem>
                            <FormItem v-else  style="width:30%;" class="disease_info_form_item" :required="list.bRequired">
                                <!--复选框-->
                                <Checkbox v-if="list.itemType==itemType.checkbox"  v-model="list.itemValue">{{list.itemName}}</Checkbox>
                            </FormItem>
                        </Col>
                    </Row>
                </Form>
            </div>
        </div>
        <!--底部按钮-->
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
import { getCookie } from '@/common/js/cookie.js';
import { data, task } from 'api/index.js'
export default {
    data() {
        return {
            editType:0,  //0 创建 ， 1 修改
            itemType:{
               "apiSelect":9,  //调用接口的下拉菜单
               "smallSelect":2,      //长度较小的下拉菜单
               "select":3,     //普通下拉菜单
               "tnm": 4,       //tnm分期
               "input":5,      //普通文本框
               "textarea":6,   //文本域
               "dataTimePick":7, //时间选择器
               "checkbox":8      //复选框
            },
            formData: {},  //基本信息表单数据
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
        getTemplatebyid(id){
            if(id==""){
                this.diseaseInfoData={
                   pageModel:{
                       blockModels:[{
                           itemNodes:[]
                       }]
                   } 
                };
                this.diseaseInfoData.pageModel.blockModels[0].itemNodes.unshift(this.diseaseNameData.blockModels[0].itemNodes[0]);
                this.diseaseRiskInfoData={};
                return;
            }
            let obj = {
                "userId": getCookie('userid'),
                "productId": 2,
                "templateId":id
            }
            data.getPageTemplateById(obj).then((data)=> {
                console.log(data);
                if(data.returnCode=="200" || data.returnCode =="0"){
                    this.buildDiesaeData(data.data);
                    this.buildDieseaRiskInfoData(data.data);
                }else if(data.returnCode==422 || data.returnCode==204){
                    this.$router.push('/login')
                }else{
                    this.$Message.error(data.msg)
                }
            }).catch((error)=>{
            	this.$Message.error(error.statusText);
            })
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
        //创建疾病信息结构
        buildDiesaeData(data){
            this.diseaseInfoData = {};
            this.diseaseInfoData.templateId=data.templateId;
            if(data.pageModels && data.pageModels.length>0){
                this.diseaseInfoData.pageModel=data.pageModels[0];
                this.diseaseInfoData.pageModel.blockModels[0].itemNodes.unshift(this.diseaseNameData.blockModels[0].itemNodes[0]);
            }
        },
        //创建疾病相关数据结构
        buildDieseaRiskInfoData(data){
            this.diseaseRiskInfoData={};
            if(data.pageModels && data.pageModels.length>1){
                this.diseaseRiskInfoData.templateId = data.templateId;
                this.diseaseRiskInfoData.pageModel = data.pageModels[1];
            }
        },
        //创建疾病名称数据结构
        dobuildDiseaseNameData(data){
            this.diseaseInfoData={};
            this.diseaseInfoData.pageModel={};
            this.diseaseInfoData.pageModel.blockModels=[];
            if(data.pageModels && data.pageModels.length>0){
                this.diseaseNameData= data.pageModels[0];
                this.diseaseInfoData.pageModel=data.pageModels[0];
            }
        },
        //每行个数
        colLength(length){
            return Math.ceil(24/length);
        },
        //返回
        upStep() {
            this.$router.push('/admin/tomour/index')
        },
        //下一步
        nextStep() {
            if(this.doRequired()){
                return;
            }
            this.doSubmitData();
        },
        //验证必填
        doRequired(){
            let flag=false;
            if(this.doBasicInfoRequired()){
                flag=true;
            }else if(this.doDeaseInfoReq()){
                flag = true;
            }else if(this.doDeaseRiskInfoReq()){
                flag=true;
            }
            return flag;
        },
        //验证基本信息必填选项
        doBasicInfoRequired(){
            let ret=false;
            if(this.formData=={}){
                this.$Message.error("请填写病人基本信息内必填选项");
                ret=true;
            }else{
                if(this.formData.patientcode=="" || !this.formData.patientcode || this.formData.patientcode==null){
                    this.$Message.error("病人编号不能为空");
                    ret=true;
                }else if(this.formData.patientname == "" || !this.formData.patientname || this.formData.patientname == null){
                    this.$Message.error("病人姓名不能为空");
                    ret=true;
                } else if (this.formData.gender == "" || !this.formData.gender || this.formData.gender == null) {
                    this.$Message.error("病人姓名不能为空");
                    ret=true;
                }
            }
            return ret;
        },
        //验证疾病信息必填选项
        doDeaseInfoReq(){
            let ret = false;
            if(this.diseaseInfoData!={} && this.diseaseInfoData.pageModel){
                for (var i = 0; i < this.diseaseInfoData.pageModel.blockModels.length; i++) {
                    var bm = this.diseaseInfoData.pageModel.blockModels[i];
                    if(bm && bm.length>0){
                        for (var j = 0; j < bm.itemNodes.length; j++) {
                            var item = bm.itemNodes[j];
                            if (item.bRequired) {
                                if (item.itemValue == null || item.itemValue == "") {
                                    this.$Message.error(item.itemName + "不能为空");
                                    ret = true;
                                    break;
                                }
                            }
                        }
                    }
                }
            }
            return ret;
        },
        //验证疾病风险因素必填选项
        doDeaseRiskInfoReq(){
            let ret = false;
            if(this.diseaseRiskInfoData!={} && this.diseaseRiskInfoData.pageModel){
                for (var i = 0; i < this.diseaseRiskInfoData.pageModel.blockModels.length; i++) {
                    var bm = this.diseaseInfoData.pageModel.blockModels[i];
                    if(bm && bm.length>0){
                        for (var j = 0; j < bm.itemNodes.length; j++) {
                            var item = bm.itemNodes[j];
                            if (item.bRequired) {
                                if (item.itemValue == null || item.itemValue == "") {
                                    this.$Message.error(item.itemName + "不能为空");
                                    ret = true;
                                    break;
                                }
                            }
                        }
                    }
                }
            }
            return ret;
        },
        //提交表单
        doSubmitData(){
            let pageContents=[];
            let templateId=this.diseaseInfoData.templateId
            pageContents.push(this.diseaseInfoData);
            pageContents.push(this.diseaseRiskInfoData);
            let patient=this.getBasicInfo();
            let obj={
                "productId":"2",
                "projectId":"",
                "pageContentId":"",
                "paientId":"",
                "templateId":templateId,
                "patient":patient,
                "pageContents":pageContents
            };
            console.log(obj);
            data.newAddProject(obj).then((data) => {
                if (data.returnCode == "200" || data.returnCode == "0") {
                   console.log(data);
                   this.$Message.success(data.msg);
                   this.$store.state.tumourPatientInfo.tumourPatientId=data.data.patient.patientid;
                   this.$store.state.tumourPatientInfo.tumourpatientCode = data.data.patient.patientcode;
                   this.$router.push('/admin/tomour/sample');
                } else if (data.returnCode == 422 || data.returnCode == 204) {
                    this.$router.push('/login')
                } else {
                    this.$Message.error(data.msg)
                }
            }).catch((error) => {
                this.$Message.error(error.statusText);
            })

        },
        //整理病人基本信息数据
        getBasicInfo(){
            if(this.formData.birthday){
                this.formData.birthday=String(this.formData.birthday);
            }
            this.formData.patientid= this.$store.state.tumourPatientInfo.tumourPatientId;
            console.log("基本信息")  
            console.log(this.formData);
            return this.formData;
        },
        //编辑状态下 获取页面数据
        getPageDetail(){
            let obj={
                "userId": getCookie('userid'),
                "productId": "2",
                "patientcode":this.$store.state.tumourPatientInfo.tumourpatientCode,
                "patientid": this.$store.state.tumourPatientInfo.tumourPatientId
            };
            console.log(obj);
            data.getProjectDetail(obj).then((data) => {
                if (data.returnCode == "200" || data.returnCode == "0") {
                   console.log(data);
                   this.buildPageData(data.data);
                } else if (data.returnCode == 422 || data.returnCode == 204) {
                    this.$router.push('/login')
                } else {
                    this.$Message.error(data.msg)
                }
            }).catch((error) => {
                this.$Message.error(error.statusText);
            })
        },
        //编辑状态下 构造页面数据
        buildPageData(data){
            this.formData=data.dchPatient;
            this.formData.gender=String(this.formData.gender);
            if(data && data.pageContents && data.pageContents.length>0){
                //创建疾病名称数据结构
                this.diseaseNameData= {
                    blockModels:data.pageContents[0].pageModel.blockModels
                }
                this.diseaseInfoData=data.pageContents[0];
                this.diseaseRiskInfoData=data.pageContents[1];
            }
            
        },
        //重置按钮
        resetActive() {
        
        }
    },
    mounted() {
       
    },
    watch:{
        
    },
    created() {
        console.log(this.$store.state.tumourPatientInfo.tumourPatientId);
        console.log(this.$store.state.tumourPatientInfo.tumourpatientCode);
        if(this.$store.state.tumourPatientInfo.tumourPatientId=="" && this.$store.state.tumourPatientInfo.tumourpatientCode==""){
            this.editType=0;
            this.getDiseaseName();
        }else{
            this.editType=1;
            this.getPageDetail();
        }
        
    }
}
</script>