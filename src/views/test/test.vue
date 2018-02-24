

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
            min-height: 55px;
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
    .diseaset_about_footer {
        button {
            margin: 0 10px;
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
            <div>
                <Form class="disease_info_form" :label-width="100" :model="formData" ref="modalForm" >
                    <!-- <Row type="flex" justify="center" class="basic_info_form_row">
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
                    </Row> -->
            
                    <Row type="flex" justify="start" class="disease_info_form_row" v-for="(item,index) of formData" :key="index">
                        <Col class="row" span="8" v-for="(list,indexs) of item.itemNodes" :key="indexs">
                            <FormItem style="width:30%;" class="disease_info_form_item" :required="list.bRequired" :prop="list.value" :label="list.itemName">
                                <Poptip placement="bottom-start" width="400" v-if="list.itemType==0">
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
                                <!-- <Button   type="primary">点击选择</Button> -->
                                <Select v-else-if="list.itemType==2" >
                                    <Option v-for="(cont,ids) of list.content" :key="ids" :value="cont">{{cont}}</Option>
                                </Select>
                                <Input v-else-if="list.itemType==4"  v-modal="list.value" type="textarea" style="margin-bottom:10px;"></Input>
                                <Input v-else-if="list.itemType==1"  v-modal="list.value"></Input>
                                <Radio v-else-if="list.itemType==3" v-model="single">Radio</Radio>
                                <Checkbox v-else-if="list.itemType==5" v-model="single">Checkbox</Checkbox>
                            </FormItem>
                        </Col>
                    </Row>
                </Form>
            </div>
        </div>
        <!-- <div style="width:100%;height:30px;background:#f5f7f9;"></div>
        <div class="disease_risk">
            <div class="disease_about_title">
                <Icon type="flash"></Icon>
                <span>疾病风险因素</span>
            </div>
            <div>
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
            </div>
        </div>-->
         <div class="disease_about_footer">
            <Row type="flex" justify="end" class="code-row-bg">
                <Col col="8">
                <Button type="ghost" @click="upStep">返回</Button>
                <Button @click="nextStep()" type="primary">下一步</Button>
                </Col>
            </Row>
        </div>  
    </div>
</template>

<script>
export default {
    data() {
        return {
            // formData: {},  //表单数据
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
            obj:{
                button:0,
                text:1,
                select:2,
                radio:3,
                textarea:4,
                checkbox:5,
            },
            //验证必填
            ruleValidate: {
                // patientCode: [{
                //     required: true,
                //     message: '病人编号不能为空'
                // }
                // ],
                // patientName: [{
                //     required: true,
                //     message: '病人姓名不能为空'
                // }
                // ]
            },
            formData:[
                {
                    "modelId":"block-1",
                    "referModeId":null,
                    "title":null,
                    "modelType":2,
                    "attritube":null,
                    "itemNodes":[
                        {
                            "modelId":"item-2",
                            "referModeId":null,
                            "title":null,
                            "modelType":3,
                            "attritube":null,
                            "itemType":2,
                            "bRequired":true,
                            "itemName":"疾病名称",
                            "itemTitle":null,
                            "content":[
                                "请选择",
                                "肺癌",
                                "结直肠癌",
                                "胃癌"
                            ]
                        },
                        {
                            "modelId":"item-3",
                            "referModeId":null,
                            "title":null,
                            "modelType":null,
                            "attritube":null,
                            "itemType":2,
                            "bRequired":true,
                            "itemName":"疾病类型",
                            "itemTitle":null,
                            "content":[
                                "请选择",
                                "管状线癌",
                                "小细胞癌"
                            ]
                        },
                        {
                            "modelId":"item-4",
                            "referModeId":null,
                            "title":null,
                            "modelType":3,
                            "attritube":null,
                            "itemType":2,
                            "bRequired":true,
                            "itemName":"HER2分型",
                            "itemTitle":null,
                            "content":[
                                "+1",
                                "+2",
                                "+#"
                            ]
                        }
                    ]
                },
                {
                    "modelId":"block-2",
                    "referModeId":null,
                    "title":null,
                    "modelType":2,
                    "attritube":null,
                    "itemNodes":[
                        {
                            "modelId":"item-5",
                            "referModeId":null,
                            "title":null,
                            "modelType":null,
                            "attritube":null,
                            "itemType":2,
                            "bRequired":false,
                            "itemName":"肿瘤发生部位",
                            "itemTitle":null,
                            "content":[
                                "胃小碗",
                                "胃大碗",
                                "胃底部"
                            ]
                        },
                        {
                            "modelId":"item-7",
                            "referModeId":null,
                            "title":null,
                            "modelType":3,
                            "attritube":null,
                            "itemType":0,
                            "bRequired":false,
                            "itemName":"tnm",
                            "itemTitle":null,
                            "content":null
                        },
                        {
                            "modelId":"item-6",
                            "referModeId":null,
                            "title":null,
                            "modelType":3,
                            "attritube":null,
                            "itemType":2,
                            "bRequired":false,
                            "itemName":"组织学（G）",
                            "itemTitle":null,
                            "content":[
                                "G1",
                                "G2",
                                "G3"
                            ]
                        }
                    ]
                },
                {
                    "modelId":"block-3",
                    "referModeId":null,
                    "title":null,
                    "modelType":2,
                    "attritube":null,
                    "itemNodes":[
                        {
                            "modelId":"item-6",
                            "referModeId":null,
                            "title":null,
                            "modelType":3,
                            "attritube":null,
                            "itemType":4,
                            "bRequired":false,
                            "itemName":"现病史",
                            "itemTitle":null,
                            "content":""
                        }
                    ]
                },
                {
                    "modelId":"block-3",
                    "referModeId":null,
                    "title":null,
                    "modelType":2,
                    "attritube":null,
                    "itemNodes":[
                        {
                            "modelId":"item-8",
                            "referModeId":null,
                            "title":null,
                            "modelType":3,
                            "attritube":null,
                            "itemType":4,
                            "bRequired":false,
                            "itemName":"即往史",
                            "itemTitle":null,
                            "content":""
                        }
                    ]
                }
        ]
            }


    },
    methods: {
        getReq(){
            M.each(this.formData,(item,index)=>{
                M.each(item.itemNodes,(list,indexs)=>{
                    if(list.bRequired){
                        let aaa=list.value;
                        let obj={};
                        obj.required=true;
                        obj.message=list.itemName+"不能为空"
                        let arr=[];
                        arr.push(obj);
                        this.ruleValidate[aaa]=arr;
                        // objs.aaa.push(obj)
                        // this.buildReq(objs);
                    }
                })
            })
            console.log(this.ruleValidate)
        },
        upStep(){
            this.$router.push('/admin/tomour/index')
        },
        //下一步
        nextStep() {
            this.$router.push('/admin/tomoursample');

        },
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
        //重置按钮
        resetActive() {

        }
    },
    mounted() {
        $(".api .el-table").removeClass("el-table--enable-row-hover");
        
    },
    created() {
        // this.getReq()
    }
}
</script>