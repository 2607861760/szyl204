<style lang="scss" scope>
// 引入公共变量及方法
@import '~common/scss/public/base-url.scss';
.disease_about {
    .tnmSpan{
        color:#1996cd;
        margin:0 5px;
    }
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
                <div style="float:right;">
                    <Button type="primary" v-if="showDelete" size="small" @click="delet">删除</Button>
                </div>
            </div>
            <div>
                <Form class="basic_info_form" :label-width="80" :model="formData" ref="modalForm">
                    <Row type="flex" justify="center" class="basic_info_form_row">
                        <Col class="row" span="7">
                        <FormItem style="width:30%;"  required class="basic_info_form_item" label="病人编号">
                            <Input style="max-width:200px" v-if="editType==0" v-model="formData.patientcode"></Input>
                            <Input style="max-width:200px" v-if="editType==1" disabled="disabled" v-model="formData.patientcode"></Input>
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
                <span>疾病信息（ * 为必填项）</span>
            </div>
            <div>
                <Form class="disease_info_form" :label-width="100" :model="diseaseInfoData" v-if="diseaseInfoData.pageModel && diseaseInfoData.pageModel.blockModels && diseaseInfoData.pageModel.blockModels.length>0">
                    <Row type="flex" justify="start" class="disease_info_form_row" v-for="(item,index) of (diseaseInfoData.pageModel.blockModels)" :key="index">
                        <Col class="row" :span="colLength(item.itemNodes.length)" v-for="(list,indexs) of item.itemNodes" :key="indexs">
                            <FormItem v-if="list.itemType!=itemType.checkbox"  style="width:30%;" class="disease_info_form_item" :required="list.bRequired" :label="list.itemName">
                                <Select id="cancelSelect" style="max-width:200px" v-if="list.itemType==itemType.apiSelect" v-model="list.itemValue" @on-change="getTemplatebyid">
                                    <Option v-for="(cont,ids) of list.content" :key="ids" :value="cont.templeid">{{cont.name}}</Option>
                                </Select>
                                 <Select style="max-width:100px" v-else-if="list.itemType==itemType.smallSelect" v-model="list.itemValue">
                                    <Option v-for="(cont,ids) of list.content" :key="ids" :value="cont">{{cont}}</Option>
                                </Select>
                                <Select style="max-width:200px" v-else-if="list.itemType==itemType.select" v-model="list.itemValue">
                                    <Option v-for="(cont,ids) of list.content" :key="ids" :value="cont">{{cont}}</Option>
                                </Select>
                                <Poptip v-model="visible" placement="bottom" width="400" v-if="list.itemType==itemType.tnm">
                                    <Button class="tnm_btn" @click="addTnmActive" size="small" type="primary">点击选择</Button>
                                    <span class="tnmSpan">{{gtnmSelect.T}}</span>
                                    <span class="tnmSpan">{{gtnmSelect.N}}</span>
                                    <span class="tnmSpan">{{gtnmSelect.M}}</span>
                                    <span class="tnmSpan">{{gtnmSelect.G}}</span>
                                    <div class="api" slot="content">
                                        <el-table @cell-click="cellClick" :span-method="spanMethod" border="border" align="center" :data="tnmList">
                                            <el-table-column class-name="T" prop="T" label="T"></el-table-column>
                                            <el-table-column class-name="N" prop="N" label="N"></el-table-column>
                                            <el-table-column class-name="M" prop="M" label="M"></el-table-column>
                                            <el-table-column label="肿瘤分期">
                                                <template slot-scope="scope">
                                                    <span class="gtnm" v-if="scope.$index==0">{{gtnmSelect.G}}</span>
                                                </template>
                                            </el-table-column>
                                        </el-table>
                                        <Row type="flex" justify="end" class="code-row-bg">
                                            <Col col="8">
                                            <Button @click="resetActive" type="ghost">重置</Button>
                                            <Button @click="closePop" type="primary">确定</Button>
                                            </Col>
                                        </Row>
                                    </div>
                                </Poptip>
                                <Input style="max-width:200px;" v-else-if="list.itemType==itemType.input"  v-model="list.itemValue"></Input>
                                <Input v-else-if="list.itemType==itemType.textarea" type="textarea" style="margin-bottom:10px;"  v-model="list.itemValue"></Input>
                                <DatePicker v-else-if="list.itemType==itemType.dataTimePick" type="date" style="max-width: 200px" v-model="list.itemValue"></DatePicker>
                            </FormItem>
                            <FormItem v-else  style="width:30%;" class="disease_info_form_item" :required="list.bRequired" label=" ">
                                <Checkbox size="large" v-if="list.itemType==itemType.checkbox"  v-model="list.itemValue">{{list.itemName}}</Checkbox>
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
                <span>疾病风险因素（ * 为必填项）</span>
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
                                <Poptip v-model="visible" placement="bottom" width="400" v-if="list.itemType==itemType.tnm">
                                    <Button class="tnm_btn" size="small" type="primary">点击选择</Button>
                                    <span class="tnmSpan">{{gtnmSelect.T}}</span>
                                    <span class="tnmSpan">{{gtnmSelect.N}}</span>
                                    <span class="tnmSpan">{{gtnmSelect.M}}</span>
                                    <span class="tnmSpan">{{gtnmSelect.G}}</span>
                                    <div class="api" slot="content">
                                        <el-table @cell-click="cellClick" :span-method="spanMethod" border="border" align="center" :data="tnmList">
                                            <el-table-column class-name="T" prop="T" label="T"></el-table-column>
                                            <el-table-column class-name="N" prop="N" label="N"></el-table-column>
                                            <el-table-column class-name="M" prop="M" label="M"></el-table-column>
                                            <el-table-column label="肿瘤分期">
                                                <template slot-scope="scope">
                                                    <span v-if="scope.$index==0">{{gtnmSelect.G}}</span>
                                                </template>
                                            </el-table-column>
                                        </el-table>
                                        <Row type="flex" justify="end" class="code-row-bg">
                                            <Col col="8">
                                            <Button @click="resetActive" type="ghost">重置</Button>
                                            <Button @click="closePop" type="primary">确定</Button>
                                            </Col>
                                        </Row>
                                    </div>
                                </Poptip>
                                <!--文本框-->
                                <Input style="max-width:200px;" v-else-if="list.itemType==itemType.input"  v-model="list.itemValue"></Input>
                                <!--文本域-->
                                <Input v-else-if="list.itemType==itemType.textarea" type="textarea" style="margin-bottom:10px;"  v-model="list.itemValue"></Input>
                                <!--日期选择器-->
                                <DatePicker  v-else-if="list.itemType==itemType.dataTimePick" type="date" style="max-width: 200px" v-model="list.itemValue"></DatePicker>
                            </FormItem>
                            <FormItem v-else  style="width:30%;" class="disease_info_form_item" :required="list.bRequired" label=" ">
                                <!--复选框-->
                                <Checkbox size="large" v-if="list.itemType==itemType.checkbox"  v-model="list.itemValue">{{list.itemName}}</Checkbox>
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
        <!--删除提示-->
        <Modal v-model="removeModel" title="删除提示" width="300" :mask-closable="false">
            <p style="padding:20px;text-align:center;">您确定要删除这条信息吗？</p>
            <div class="fastq-footer">
                <Button size="small" type="primary" @click="saveInfoClick">确定</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
import { getCookie } from '@/common/js/cookie.js'
import { data, task } from 'api/index.js'
var  tnmData = require('./tnm.json');
export default {
    data() {
        return {
            idList : [], //删除病例
            visible:false, //tnm是否显示
            showDelete:false,//是否显示删除按钮
            editType:0,  //0 创建 ， 1 修改
            removeModel:false,
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
            cancelStyle: {
                "lungCancel" : "1",      //肺癌
                "gastricCancer" : "2",   //胃癌
                "colorectalCancer" : "3" //结直肠癌
            },
            formData: {},  //基本信息表单数据
            diseaseInfoData:{},//疾病信息数据 
            pageContentId:"",  //页面id          
            diseaseNameData:{},//疾病名称数据
            diseaseRiskInfoData:{},//疾病风险因素数据
            pageTempList:{},//当前页病人数据
            border: true,   //表格纵列 边框
            tnmList: [],
            gtnm:{},
            gtnmSelect:{},
        }
    },
    methods: {
        //关闭
        closePop(){
            this.visible=false;
        },
        cellClick(row, column, cell, event) {
            //移除当前列所有的选中效果
            $("." + column.id).removeClass("cell_active");
            //如果当前列不是第四行 给当前选中的添加选中效果
            if (column.id !== "el-table_1_column_4" && $(cell).text()!="") {
                $(cell).addClass("cell_active");
            }
            let obj={};
            $(".cell_active").each(function(i,item){
                if($(this).hasClass("T")){
                    obj.T=$(this).text();
                }else if($(this).hasClass("N")){
                    obj.N=$(this).text();
                }else if($(this).hasClass("M")){
                    obj.M=$(this).text();
                }
            });
            let gtnm=this.gtnm;
            for(var key in gtnm){
                var arr = this.gtnm[key];
                for (var j = 0; j < arr.length; j++) {
                    if (this.diff(arr[j], obj)) {
                        obj.G=key;
                        break;
                    }
                }
            }
            if(obj.G){
               $(".gtnm").text(obj.G); 
            }else{
               $(".gtnm").text("无对应值");
            }
            this.gtnmSelect=obj;            
        },
        //判断两个对象是否相同
        diff(obj1, obj2){
            var o1 = obj1 instanceof Object;
            var o2 = obj2 instanceof Object;
            if (!o1 || !o2) {/*  判断不是对象  */
                return obj1 === obj2;
            }
            if (Object.keys(obj1).length !== Object.keys(obj2).length) {
                return false;
            }
            for (var attr in obj1) {
                var t1 = obj1[attr] instanceof Object;
                var t2 = obj2[attr] instanceof Object;
                if (t1 && t2) {
                    return diff(obj1[attr], obj2[attr]);
                } else if (obj1[attr] !== obj2[attr]) {
                    return false;
                }
            }
            return true;
        },
        //点击删除按钮
        delet(){ 
            this.idList = [];
            this.idList.push(this.$store.state.tumourPatientInfo.tumourPatientId);
            this.removeModel=true;
        },
        //点击删除确定按钮
        saveInfoClick(){
            let obj = {
                "userId": getCookie("userid"),
                "idList": this.idList,
                "projectId":this.$store.state.tumourPatientInfo.tumourProjectId,
                "productId": "2"
            }
            data.deletePatientAndProjectById(obj).then((data) => {
                if (data.returnCode == 0 || data.returnCode == 200) {
                    if (data.msg == "成功") {
                        this.$Message.success(data.msg);
                        this.$router.push('/admin/tomour/index');
                    }
                } else if (data.returnCode == 422 || data.returnCode == 204) {
                    this.$router.push('/login')
                } else {
                    this.$Message.error(data.msg)
                }
                this.removeModel = false;
            })
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
                if(data.returnCode=="200" || data.returnCode =="0"){
                    this.buildDiesaeData(data.data);
                    this.buildDieseaRiskInfoData(data.data);
                    this.gtnmSelect={};
                    this.doBuildTnm();
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
                    this.$Message.error("病人性别不能为空");
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
                    if(bm && bm.itemNodes.length>0){
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
                    var bm = this.diseaseRiskInfoData.pageModel.blockModels[i];
                    if(bm && bm.itemNodes.length>0){
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
            let postData={};
            let templateId=this.diseaseInfoData.templateId;
            let diseaseProfile=this.getCancelType();
            this.buildGtnmItemValue();
            pageContents.push(this.diseaseInfoData);
            pageContents.push(this.diseaseRiskInfoData);
            let patient=this.getBasicInfo();
            let obj={
                "productId":"2",
                "projectId":this.$store.state.tumourPatientInfo.tumourProjectId,
                "pageContentId": this.pageContentId,
                "paientId": this.$store.state.tumourPatientInfo.tumourPatientId,
                "templateId":templateId,
                "patient":patient,
                "pageContents":pageContents,
                "diseaseProfile": diseaseProfile
            };
            if(this.editType == 0){
                postData=data.newAddProject(obj);
            }else if(this.editType == 1){
                postData = data.updateProject(obj);
            }
            postData.then((data) => {
                if (data.returnCode == "200" || data.returnCode == "0") {
                   this.$Message.success(data.msg);
                   this.$store.state.tumourPatientInfo.tumourPatientId=data.data.patient.patientid;
                   this.$store.state.tumourPatientInfo.tumourpatientCode = data.data.patient.patientcode;
                   this.$store.state.tumourPatientInfo.tumourProjectId= data.data.patient.projectid;
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
        //创建提交使用的tnm数据
        buildGtnmItemValue(){
            for(var i=0; i<this.diseaseInfoData.pageModel.blockModels.length;i++){
                var bm=this.diseaseInfoData.pageModel.blockModels[i];
                for(var k=0; k<bm.itemNodes.length;k++){
                    var im=bm.itemNodes[k];
                    if(im.itemType==this.itemType.tnm){
                        im.itemValue=this.gtnmSelect;
                        break;
                    }
                }
            }
        },
        //创建tnm数据
         buildGtnmSelect(data){
            for(var i=0; i<data.pageModel.blockModels.length;i++){
                var bm=data.pageModel.blockModels[i];
                for(var k=0; k<bm.itemNodes.length;k++){
                    var im=bm.itemNodes[k];
                    if(im.itemType==this.itemType.tnm){
                       this.gtnmSelect= im.itemValue;
                       break;
                    }
                }
            }
        },
        //编辑状态下设置tnm选中状态
        addTnmActive(){
            let _this=this;
            if(this.gtnmSelect != {}){
                if(this.gtnmSelect.T){
                     $(".T").each(function(){
                        if($(this).text() == _this.gtnmSelect.T){
                            $(this).addClass("cell_active");
                        }
                    })
                }
                if(this.gtnmSelect.N){
                    $(".N").each(function(){
                        if($(this).text() == _this.gtnmSelect.N){
                            $(this).addClass("cell_active");
                        }
                    })
                }
                if(this.gtnmSelect.M){
                    $(".M").each(function(){
                        if($(this).text() == _this.gtnmSelect.M){
                            $(this).addClass("cell_active");
                        }
                    })
                }
            }
        },
        //整理病人基本信息数据
        getBasicInfo(){
            if(this.formData.birthday){
                this.formData.birthday=String(this.formData.birthday);
            }
            this.formData.patientid= this.$store.state.tumourPatientInfo.tumourPatientId;
            return this.formData;
        },
        //编辑状态下 获取页面数据
        getPageDetail(){
            let _this=this;
            let obj={
                "userId": getCookie('userid'),
                "productId": "2",
                "patientcode":this.$store.state.tumourPatientInfo.tumourpatientCode,
                "patientid": this.$store.state.tumourPatientInfo.tumourPatientId
            };
            data.getProjectDetail(obj).then((data) => {
                if (data.returnCode == "200" || data.returnCode == "0") {
                    this.buildPageData(data.data);
                   setTimeout(function(){
                       _this.doBuildTnm();
                       _this.buildGtnmSelect(data.data.pageContents[0]);
                   },0);
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
            this.$store.state.tumourPatientInfo.tumourProjectId = data.dchPatient.projectid;
            this.pageContentId=data.pageContentId;
        },
        //提交表单时 获取所选择的癌种
        getCancelType(){
            var  ret=null;
            var  text=   $("#cancelSelect .ivu-select-selection").find("span[class=ivu-select-selected-value]").html();
            switch(text){
                case "肺癌":
                    ret= this.cancelStyle.lungCancel;
                    break;
                case "胃癌":
                    ret=this.cancelStyle.gastricCancer;
                    break;
                case "结直肠癌":
                    ret = this.cancelStyle.colorectalCancer;
                    break;
                default:
                    ret=null;
            }
            return ret;
        },
        //创建tnm数据
        buildTnmList(obj){
            let tl = obj.T.length;
            let nl = obj.N.length;
            let ml = obj.M.length;
            let len=this.getMax(tl,nl,ml);
            this.tnmList = [];
            for(var i=0; i<len; i++){
                var tnmObj={
                    "T" : obj.T[i] ? obj.T[i] : "",
                    "N" : obj.N[i] ? obj.N[i] : "",
                    "M" : obj.M[i] ? obj.M[i] : ""
                };
                this.tnmList.push(tnmObj);
            }
        },
        //寻找三个数中最大值
        getMax(a,b,c){
            return a > b ? (a > c ? a : c) : (b > c ? b : c);
        },
        //重置按钮
        resetActive() {
            this.gtnmSelect={};
            $(".el-table__row td").removeClass("cell_active");
            $(".gtnm").text("");
        },
        //下拉菜单变化时创建tnm
        doBuildTnm(){
            this.gtnm={};
            this.resetActive();
            let type=this.getCancelType();
            for(var i=0;i<tnmData.length;i++){
                if(type == tnmData[i].type){
                    this.buildTnmList(tnmData[i].tnmData.tnm);
                    this.gtnm=tnmData[i].tnmData.gtnm;
                }
            }
        },
    },
    mounted() {
        
    },
    watch:{
         
    },
    created() {
        if(this.$store.state.tumourPatientInfo.tumourPatientId=="" && this.$store.state.tumourPatientInfo.tumourpatientCode==""){
            this.editType=0;
            this.showDelete=false;
            this.getDiseaseName();
            this.pageContentId="";
        }else{
            this.editType=1;
            this.showDelete=true;
            this.getPageDetail();
        }
        
    }
}
</script>