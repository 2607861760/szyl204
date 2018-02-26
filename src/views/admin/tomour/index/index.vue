<style lang="scss">
    .tomour_nav{
        padding:40px 20px;
        .tomour_nav_card{
            width:100%;
            height:115px;
            padding:3px 20px;
            border-radius: 5px;
            box-sizing: border-box;
            text-align: center;
            p{
                font-size:48px;
            }
            span{
                font-size:20px;
            }
            i{
                font-size:74px;
                margin-top:15px;
            }
        }
        .tomour_nav_card1{
            color:#78c06e;
            border:1px solid #78c06e;
        }
        .tomour_nav_card2{
            color:#1996cd;
            border:1px solid #1996cd;
        }
        .tomour_nav_card3{
            color:#d97b24;
            border:1px solid #d97b24;
        }
        .tomour_nav_card4{
            background: #1996cd;
            color: #fff;
            p{
                font-size:24px;
                line-height: 100px;
            }
            i{
                font-size:60px;
                margin-top:20px;
            }
        }
    }
    .domain{
        padding-top:15px;
        height:731px;
        background: #f5f7f9;
        .domain_table{
            width:75%;
            height:100%;
            padding:20px;
            float:left;
            box-sizing: border-box;
            background: #fff;
            .domain_table_search{
                width:380px;
                float:right;
                .ivu-input-group-append{
                    cursor: pointer;
                    padding:0;
                }
            }
        }
        .domain_echats{
            width:25%;
            padding-left:15px;
            box-sizing: border-box;
            float:right;
            .domain_echats_graph{
                background: #fff;
                margin-bottom: 15px;
                .domain_echats_title{
                    height:43px;
                    background: rgba(82, 92, 121, 1);
                    color:#fff;
                    text-align: center;
                    line-height: 43px;
                }
            }
        }
    }
    .scene{
        padding:70px 0;
        // background: red;
        ul{
            width:200px;
            height:80px;
            margin:auto;
            li{
                float: left;
                text-align: center;
                p{
                    padding-top:10px;
                }
                div{
                    width:80px;
                    height:80px;
                    position: relative;
                    img{
                        margin-top:15px;
                    }
                    .scene_icon{
                        position: absolute;
                        bottom: 0;
                        right: 0;
                        font-size: 18px;
                        height: 18px;
                        line-height: 18px;
                    }
                }
            }
            li+li{
                margin-left:40px;
            }
            li:nth-of-type(1){
                color:#50a02d;
                div{
                    border:1px solid #50a02d;
                    .scene_icon{
                        border-top:1px solid #50a02d;
                        border-left: 1px solid #50a02d;
                    }
                }
            }
            li:nth-of-type(2){
                color:#3f81c1;
                div{
                    border:1px solid #3f81c1;
                    .scene_icon{
                        border-top:1px solid #3f81c1;
                        border-left: 1px solid #3f81c1;
                    }
                }
            }
        }
    }
    .slot-footer{
        height:53px;
        background: rgba(242, 242, 242, 1);
        .ivu-btn{
            padding:6px 30px;
        }
    }
    .vertical-center-modal{
        display: flex;
        align-items: center;
        justify-content: center;

        .ivu-modal{
            top: 0;
        }
    }
</style>
<template>
    <div>
        <!-- 顶部nav 开始-->
        <div class="tomour_nav">
            <Row type="flex" justify="space-between">
                <Col span="5">
                    <div class="tomour_nav_card tomour_nav_card4" @click="newCase">
                        <Row type="flex" justify="space-between">
                            <Col span="12">
                                <Icon type="ios-plus-outline"></Icon>
                            </Col>
                            <Col span="12">
                                <p>新建病例</p>
                            </Col>
                        </Row>
                    </div>
                </Col>
                <Col span="5">
                    <div class="tomour_nav_card tomour_nav_card1" @click="dataChange('4','2')">
                        <Row type="flex" justify="space-between">
                            <Col span="12">
                                <p>{{dataSize.notUploadCount}}</p>
                                <span>待上传</span>
                            </Col>
                            <Col span="12">
                                <Icon type="ios-clock"></Icon>
                            </Col>
                        </Row>
                    </div>
                </Col>
                <Col span="5">
                    <div class="tomour_nav_card tomour_nav_card2" @click="dataChange('5','2')">
                        <Row type="flex" justify="space-between">
                            <Col span="12">
                                <p>{{dataSize.pipelineFinishCount}}</p>
                                <span>已完成</span>
                            </Col>
                            <Col span="12">
                                <Icon type="ios-checkmark"></Icon>
                            </Col>
                        </Row>
                    </div>
                </Col>
                <Col span="5">
                    <div class="tomour_nav_card tomour_nav_card3" @click="dataChange('6','2')">
                        <Row type="flex" justify="space-between">
                            <Col span="12">
                                <p>{{dataSize.downloadCount}}</p>
                                <span>报告下载</span>
                            </Col>
                            <Col span="12">
                                <Icon type="ios-cloud-download"></Icon>
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row>
        </div>
        <!-- 顶部nav 结束-->
        <!-- 功能区 开始 -->
        <div class="domain">
            <!-- 表格 开始 -->
            <div class="domain_table">
                <Row>
                    <Col span="12">
                        <el-radio-group v-model="radio5" size="small">
                            <el-radio-button label="早期筛查"></el-radio-button>
                            <el-radio-button label="诊断治疗"></el-radio-button>
                            <el-radio-button label="术后跟踪"></el-radio-button>
                        </el-radio-group>
                    </Col>
                    <Col span="12">
                        <div class="domain_table_search">
                            <Input v-model="searchData">
                                <Select v-model="searchValue" slot="prepend" style="width: 80px" @on-change="selectChange">
                                    <Option v-for="(item,index) of searchList" :key="index" :value="item.value" :label="item.label">{{item.label}}</Option>
                                </Select>
                                <span slot="append" style="padding:10px 13px;" @click="dataChange(searchValue,searchData)"><Icon type="ios-search" ></Icon></span>
                            </Input>
                        </div>
                    </Col>
                    
                </Row>
                <Row>
                    <div style="width:100%;padding:15px 0;box-sizing:border-box;">
                        <el-table :data="tableData3" border  height="550" v-loading="loadone" :highlight-current-row="true">
                            <el-table-column label="病人编号" prop="dchPatient.patientcode">
                                <template slot-scope="scope">
                                    <a  @click="clickPatientcode(scope.row)" href='javascript:;' class="bian">
                                    {{ scope.row.dchPatient.patientcode }} 
                                    </a>
                                </template>
                            </el-table-column>
                            <el-table-column label="姓名" prop="dchPatient.patientname">
                            </el-table-column>
                            <el-table-column label="取样日期">
                                <template slot-scope="scope">
                                    <div v-for="list in scope.row.dchSampleList" :key="list.id" class="handle" style="height:40px;">{{list.takendate}}</div>
                                </template>
                            </el-table-column>
                            <el-table-column label="样本类型" prop="sample" >
                                <template slot-scope="scope">
                                    <div v-for="list in scope.row.dchSampleList" :key="list.id" class="handle" style="height:40px;">{{list.sampletype}}</div>
                                </template>
                            </el-table-column>          
                            <el-table-column label="样本编号">
                                <template slot-scope="scope">
                                    <div @click="addsample(scope.row)"style="font-size:12px;text-decoration:underline;color:#3c8dbc;cursor:pointer;" v-if="scope.row.dchSampleList.length==0">添加</div>
                                    <div class="bian"v-for="(list,index) in scope.row.dchSampleList" style="cursor:pointer;"  :key="list.id" @click="samcode(index,scope.row)">{{ list.samplecode }}</div>
                                </template>
                            </el-table-column>
                            <el-table-column label="状态">
                                <template slot-scope="scope">
                                    <div v-for="(list,index) in scope.row.dchSampleList" class="handle" >
                                        <span class="status">{{list.samplestatus | dataFormat}}</span>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column label="操作" min-width="100%">
                                <template slot-scope="scope">
                                    <div v-for="(list,index) in scope.row.dchSampleList" class="handle">
                                        <span class="bian" @click="run(index,scope.row)" v-if="list.isexecute==='0'">运行</span>
                                        <span class="bian" @click="delet(index,scope.row)">删除</span>
                                        <span class="bian" @click="edit(index,scope.row)">编辑</span>
                                        </div>
                                    </template>
                            </el-table-column>
                            <el-table-column label="解读">
                                <template slot-scope="scope">
                                    <div v-for="(list,index) in scope.row.dchSampleList" class="handle" style="height:40px;">
                                        <a v-if="list.isexecute==='3'" @click="jumpVishuourl(list.sampleid)">C GDAP</a>
                                        <a href="javascript:;"  disabled v-else>C GDAP</a>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column label="报告下载">
                                <template slot-scope="scope">
                                    <div v-for="(list,index) in scope.row.dchSampleList" class="handle" style="height:40px;">
                                         <!-- <a class="download" :href="'http://42.123.124.204:8081/dchealth-platform/1.0/data/ftpupdate?jobid='+list.jobid" download v-if="list.jobtype=='Y'">下载</a>  -->
                                         <a class="download" :href="'http://10.131.101.159:8080/dchealth-platform/1.0/data/ftpupdate?jobid='+list.jobid" download  v-if="list.jobtype=='Y'">下载</a> 
                                        <a class="dis-download" href="javascript:;" download  disabled v-else>下载</a>
                                        
                                    </div>
                                </template>
                            </el-table-column>
                        </el-table>
                        <div style="padding:40px 0px;">
                            <Row>
                                <Col span="12">
                                    <el-pagination
                                    @size-change="handleSizeChange"
                                    @current-change="handleCurrentChange"
                                    :current-page="currentPage"
                                    :page-sizes="[50, 100, 200, 500, 1000]"
                                    :page-size="pageSize"
                                    layout="total, sizes, prev, pager, next, jumper"
                                    :total="total">
                                    </el-pagination>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </Row>
            </div>
            <!-- 表格 结束 -->
            <!-- 图表 开始 -->
             <div class="domain_echats"> 
                 <div class="domain_echats_graph">
                    <div class="domain_echats_title">不同癌种样本量</div>
                    <div style="height:300px;background:#ECF5FF;"></div>
                 </div>
                <div class="domain_echats_graph">
                    <div class="domain_echats_title">每月处理样本数量</div>
                    <div style="height:300px;background:#ECF5FF;"></div>
                 </div>
             </div> 
            <!-- 图表 结束 -->
        </div>
        <!-- 功能区 结束 -->
        <!-- 弹层 开始 -->
        <Modal v-model="modal1" title="场景" class-name="vertical-center-modal">
            <div class="scene">
                <ul>
                    <li v-for="(item,index) of sceneList" @click="sceneChange(item,index)" :key="index">
                        <div>
                            <img :src="item.src" />
                            <span v-if="item.sceneShow==true" class="scene_icon"><Icon type="android-done"></Icon></span>
                        </div>
                        <p>{{item.title}}</p>
                    </li>
                </ul>
            </div>
            <div class="slot-footer">
                <Row>
                    <Col span="8"></Col>
                    <Col span="16" style="float:right;margin-top:10px;margin-right: -125px;">
                        <Button type="default" @click="modal1=false">取消</Button>
                        <Button type="primary" @click="handleSubmit">确定</Button> 
                    </Col>
                </Row>
            </div>
        </Modal>
        <!--新建样本/编辑样本-->
        <Modal width="835px" v-model="sampleEdit" :mask-closable="false" >
            <div class="sample-title">样本信息</div>
                <div class="sample-main">
                    <div class="stitle">
                        <Icon type="clipboard" style="font-size:22px;"></Icon>
                        <span style="padding-left:5px;">样本信息（*为必填项）</span>
                    </div>
                    <div class="sample-inner">
                        <Form :model="sampleInfo" ref="sampleInfo" :rules="ruleCustom" label-position="left" :label-width="110" inline>
                            <Row>
                                <Col class="tables">
                                    <FormItem label="样本编号" style="width:30%;" prop="samplecode">
                                        <Input v-model="sampleInfo.samplecode"></Input>
                                    </FormItem>
                                    <FormItem label="取样日期" style="width:30%;">
                                        <DatePicker type="date" v-model="takendate"></DatePicker>
                                    </FormItem>
                                </Col>
                                <Col class="tables">
                                    <FormItem label="收样日期" style="width:30%;">
                                        <DatePicker type="date" v-model="receivedate"></DatePicker>
                                    </FormItem>
                                    <FormItem label="测序日期" style="width:30%;">
                                        <DatePicker type="date" v-model="seqdate"></DatePicker>
                                    </FormItem>
                                </Col>
                                <Col class="tables">
                                    <FormItem label="样本来源" style="width:30%;" prop="sampletype">
                                        <Select v-model="sampleInfo.sampletype">
                                            <Option v-for="item in sampletype" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                        </Select>
                                    </FormItem>
                                    <FormItem label="样本类型" style="width:30%;" prop="samplesource">
                                        <Select v-model="sampleInfo.samplesource">
                                            <Option v-for="item in samplesource" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                        </Select>
                                    </FormItem>
                                </Col>
                                <Col class="tables">
                                    <FormItem label="测序平台" style="width:30%;">
                                        <Select v-model="sampleInfo.platform">
                                            <Option v-for="item in platform" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                        </Select>
                                    </FormItem>
                                    <FormItem label="测序区域" style="width:30%;" prop="region">
                                        <Select v-model="sampleInfo.region">
                                            <Option v-for="item in region" :value="item.value" :key="item.value" :disabled="item.disabled">{{ item.label }}</Option>
                                        </Select>
                                    </FormItem>
                                </Col>
                                <Col class="tables">
                                    <FormItem label="测序类型" style="width:30%;">
                                        <Select v-model="sampleInfo.seqtype">
                                            <Option v-for="item in seqtype" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                        </Select>
                                    </FormItem>
                                    <FormItem label="变异类型检测" style="width:30%;" prop="seqtarget">
                                        <Select v-model="sampleInfo.seqtarget">
                                            <Option v-for="item in seqtarget" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                        </Select>
                                    </FormItem>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                </div>
                <div class="sample-footer">
                    <Row :gutter="16">
                        <Col span="8" pull="7">
                            <div class="add-save">
                                <Button type="primary" @click="keep('sampleInfo')">保存</Button> 
                            </div>
                        </Col>
                        <Col span="8" pull="1">
                            <div class="add-upload">
                                <Button type="primary" @click="uploadSample" >上传</Button> 
                            </div>
                        </Col>
                    </Row> 
                </div>
        </Modal>

        <!--样本文件信息-->
        <Modal width="835px" v-model="sampleshow" :mask-closable="false">
            <div class="sample-title">测序文件</div>
            <div class="sample-inner">
                <div style="padding:20px 10px;">
                    <el-table border aligin="left" :data="samplefile">
                        <el-table-column label="文件名称" prop="filename" min-width="150%"></el-table-column>
                        <el-table-column label="文件大小" prop="size" ></el-table-column>
                        <el-table-column label="上传时间" prop="uploaddate"></el-table-column>
                        <el-table-column label="状态"  prop="status" :formatter="statusFormatter"></el-table-column>
                    </el-table>
                </div>
            </div>
        </Modal>

        <!--文件上传-->
        <Modal width="835px" v-model="upModal" :mask-closable="false" @on-cancel="clearData">
            <div class="sample-title">文件上传</div>
            <div class="upload">
                <Col span="24" class="demo-tabs-style2">
                    <Tabs type="card"  @on-click="serverlocal" v-model="tabsVal">
                        <TabPane label="upload" name="upload">
                            <div>
                                <Upload ref="upload" multiple action="/dchealth-platform/1.0/upload/fileUpload" show-upload-list :data="{'sampleid':this.samid,'userId':this.userId,'type':'vcf'}" 
                                :on-success="upsuccess" :on-error="uperror" @clearFiles="clearFiles"> 
                                    <Button type="ghost" style="background:#4578ad;">上传文件</Button>
                                </Upload>
                            </div>
                        </TabPane>
                        <TabPane label="harddisk" name="local">
                            <tree-grid :columns="columns"  ref="tree" :tree-structure="true" :data-source="fileCategoryList" :requestUrl="samid">
                            </tree-grid>
                        </TabPane>

                        <!-- 服务器上传tab -->
                        <TabPane label="server" name="server">
                            <div class="fun"></div>
                            <tree-grid :columns="columns"  ref="tree" :tree-structure="true" :data-source="fileServerCategoryList" :requestUrl="samid">
                            </tree-grid>
                        </TabPane>
                        <!-- 服务器上传tab结束 -->
                    </Tabs>
                </Col>
            </div>
        </Modal>

        <!--删除确定-->
        <Modal v-model="removeModel" title="删除提示" width="300" :mask-closable="false">
            <p style="padding:20px;text-align:center;">您确定要删除这条任务吗？</p>
            <div class="fastq-footer">
                <Button size="small" type="primary" @click="saveInfoClick">确定</Button>
            </div>
        </Modal>
        <!-- 弹层 结束 -->
    </div>
</template>
<script>
// echarts相关
let echarts = require('echarts/lib/echarts');
// 引入饼图组件
require('echarts/lib/chart/bar');
require('echarts/lib/chart/pie');
// 引入提示框和图例组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/legend')

import {data} from 'api/index.js'
import {getCookie} from '@/common/js/cookie.js'
import treeGrid from '@/components/treeTable/vue2/TreeGrid'
export default{
    name:'test',
    data(){
        return{
            modal1:false,           //新建病例弹层
            radio5: '早期筛查',      //表格切换
            searchData:'',          //搜索框的值
            searchValue:'',         //关键词  
            scenceUrl:'',           //场景地址
            searchList:[{           //搜索下拉菜单
                label:"全部数据",
                value:"all"
            },{
                label:"病人编号",
                value:"patientcode"
            },{
                label:"样本编号",
                value:"samplecode"
            }],
            sceneList:[{            //弹层内容
                title:"早期筛查",
                src:require('../img/scence1.png'),
                sceneShow:false,
                projecttype:1,
            },{
                title:"个体治疗",
                src:require('../img/scence2.png'),
                sceneShow:false,
                projecttype:2,
            }],
            tableData3:[],         //表格数据    
            loadone:false,         //加载loading
            currentPage:1,
            pageSize:10,
            total:0,
            sampleEdit: false,  //点击编辑 弹窗
            sampleInfo: {},  //样本信息弹窗信息
            ruleCustom: {  //表单验证
                samplecode: [
                    {required: true, message: '样本编号不能为空', trigger: 'blur' }
                ],
                sampletype: [
                    { required: true, message: '样本来源不能为空', trigger: 'blur' }
                ],
                samplesource: [
                    { required: true, message: '样本类型不能为空', trigger: 'blur' }
                ],
                region:[
                    {required: true, message: '测序区域不能为空', trigger: 'blur' }
                ],
                seqtarget:[
                    { required: true, message: '变异类型检测不能为空', trigger: 'blur' }
                ]
            },
            takendate:'',  //日期
            receivedate:'',
            seqdate:'',
            samplesource: [{  //样本类型下拉
                value: '对照样本',
                label: '对照样本'
            }, {
                value: '肿瘤样本',
                label: '肿瘤样本'
            }],
            sampletype: [{   //样本来源下拉
                value: '石蜡切片',
                label: '石蜡切片'
            }, {
                value: '手术/穿刺组织',
                label: '手术/穿刺组织'
            }, {
                value: '胸水',
                label: '胸水'
            }, {
                value: '腹水',
                label: '腹水'
            }, {
                value: '静脉血',
                label: '静脉血'
            }, {
                value: '淋巴',
                label: '淋巴'
            }, {
                value: '冰冻组织',
                label: '冰冻组织'
            }, {
                value: '全血',
                label: '全血'
            }, {
                value: '口腔拭子',
                label: '口腔拭子'
            }, {
                value: '唾液',
                label: '唾液'
            }],
            region: [{   //测序区域下拉
                value: 'WES',
                label: 'WES',
                disabled:false
                }, {
                value: 'WGS',
                label: 'WGS',
                disabled:true
                }, {
                value: 'Panel',
                label: 'Panel',
                disabled:true
            }],
            platform: [{  //测序平台下拉菜单
                value: 'Illumina',
                label: 'Illumina'
            }, {
                value: 'Ion Torrent',
                label: 'Ion Torrent'
            }],
            seqtarget: [{   //变异类型检测下拉菜单
                value: '点突变+插入缺失',
                label: '点突变+插入缺失'
                }, {
                value: '基因融合',
                label: '基因融合'
            }],
            seqtype: [{  //测序类型下拉菜单
                value: 'DNA',
                label: 'DNA'
            }, {
                value: 'RNA',
                label: 'RNA'
            }],
            sampleshow:false,   //点击样本编号 弹窗
            samplefile:[],  //样本文件信息弹窗信息
            upModal: false,   //点击上传 弹窗
            tabsVal:'upload',  //绑定文件上传页面的当前tab
            patid:'',  //存储patientid
            samid:'',  //存储sampleid
            userId:'',
            columns: [  //树形图label
                {
                    text: '文件名称',
                    dataIndex: 'filename',
                    width:'40%'
                },
                {
                    text: '文件大小',
                    dataIndex: 'size',
                    width:'10'
                },
                // {
                //     text: '传输时间',
                //     dataIndex: 'transition',
                //     width:'10'
                // }
            ],
            removeModel:false,//删除确定
            fileCategoryList: [],                // 本地
            fileServerCategoryList: [],          // 服务
            pageIndex:1,
            dataSize:{}
        }
    },
    methods:{
        // 获得本地/storage/serverData/
        _getLocalDataList() {
            let obj={
                "path":"/storage/serverData/",
                // "path":"/opt/NfsDir/PublicDir/demo/",
                        // /opt/NfsDir/PublicDir/demo/  电信云
                        // /storage/serverData/   159
                "userId":getCookie("userid"),
                "productId":"1",
                "type":"2"
            }
            data.getSingleForldList(obj).then((data)=>{
                console.log(data)
                if(data.returnCode==0 || data.returnCode==200){
                    if(M.isArray(data.data)) {
                        this.fileCategoryList=data.data;
                    }
                }else if(data.returnCode==422 || data.returnCode==204){
                    this.$router.push('/login')
                }else{
                    this.$Message.error(data.msg)
                }
                
            }).catch((error)=>{

            })
        },
        // 获得服务列表 /opt/NfsDir/PublicDir/demo/
        // /storage/serverData/
        _getServerDataList() {
            let obj={
                "path":"/storage/serverData/",
                // "path":"/opt/NfsDir/PublicDir/demo/",
                        // /opt/NfsDir/PublicDir/demo/  电信云
                        // /storage/serverData/   159
                "userId":getCookie("userid"),
                "productId":"1",
                "type":"2"
            }
            data.getSingleForldList(obj).then((data)=>{
                    // console.log(data)
                if(data.returnCode==0 || data.returnCode==200){
                    if(M.isArray(data.data)) {
                        this.fileServerCategoryList=data.data;
                    }
                }else if(data.returnCode==422 || data.returnCode==204){
                    this.$router.push('/login')
                }else{
                    this.$Message.error(data.msg)
                }
            }).catch((error)=>{

            })
        },
        dataChange(searchValue,keyWord){
            let obj={
                "pageSize" : this.pageSize,
                "pageIndex" : this.pageIndex,
                "productId" : "2",
                "userId":getCookie("userid"),
            }
            this.tableData3=[];
            this.total=0;
            this.currentPage=1;
            if(searchValue!='' && searchValue!="all"){
                obj.searchColumn=searchValue;
                obj.keyword=keyWord;
            }
            data.getProjectList(obj).then((data)=>{
                console.log(data)
                if(data.returnCode==0 || data.returnCode==200){
                    if(data.data!=null){
                        this.total=data.data.count;
                        this.tableData3=data.data.projectList;
                    }
                }else if(data.returnCode==422 || data.returnCode==204){
                    this.$router.push('/login')
                }

            }).catch((error)=>{
                this.$Message.error(error.statusText);
            })
        },
        saveInfoClick(){  //删除确定
            let obj={
                "idList":this.idList,
                "userId":getCookie('userid'),
                "productId":"2"
            }
            data.deleteSampleById(obj).then((data)=>{
                if(data.returnCode==0 || data.returnCode==200){
                    this.$Message.success(data.msg);
                    this.removeModel=false;
                    this.load();
                }else if(data.returnCode==422 || data.returnCode==204){
                    this.$router.push('/login')
                }else{
                    this.$Message.error(data.msg);
                    this.removeModel=false;
                    this.load();
                }
            })
        },
        clearFiles(){
            const fileList = this.$refs.upload.fileList;
            this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
        },
        upsuccess(response, file, fileList){  //本地上传成功
            if(response.returnCode==0){
                this.$Message.success(response.msg)
            }else if(response.returnCode==217){
                this.$Message.error(response.msg)
            }
            this.$refs.upload.clearFiles();
        },
        uperror(error, file, fileList){  //本地上传失败
            console.log(error);
            this.$Message.error(error.msg)
        },
        // tabs切换事件
        serverlocal(name){  //serverlocal
            if(name=='local') {
                this._getLocalDataList();
                this.$store.state.treeGrid=1;
            }else if(name=='server') {
                this._getServerDataList();
                this.$store.state.treeGrid=2;
            }
        },
        //关闭上传文件弹层清空数据
        clearData(){
            this.tabsVal='upload'
            this.fileCategoryList=[];
            this.fileServerCategoryList=[];
        },
        //格式化文件状态
        statusFormatter(row, column,cellValue){
            switch(row.status){
                case "1":
                    return '正在上传';
                    break;
                case "2":
                    return '上传完成';
                    break;
                case "3":
                    return '上传失败';
                    break;
            }
        },
        // 上传
        uploadSample(){
            this.sampleEdit = false;
            this.upModal = true;
        },
        //每页显示改变
        handleSizeChange(val) {
            this.pageSize=val;
            this.load();
        },
        //页码改变
        handleCurrentChange(val) {
            this.pageIndex=val;
            this.load();
        },
        //跳转Vishuourl
        jumpVishuourl(value){
            let obj={
                "userId":getCookie("userid"),
                "sampleid":value
            }
            console.log(obj)
            data.vishuourl(obj).then((data)=>{
                console.log(data)
                if(data.returnCode==0 || data.returnCode==200){
                    if(data.data=="null" || data.data==null){
                        this.$Message.error(data.msg)
                        // this.show=false;
                    }else{
                        this.$store.state.vishuourlUrl=data.data;
                        console.log(this.$store.state.vishuourlUrl)
                        this.$router.push('/admin/tumour/cgdap')
                    }
                }else if(data.returnCode==422 || data.returnCode==204){
                    this.$router.push('/login')
                }else{
                    this.$Message.error(data.msg)
                }
            }).catch((error)=>{
            })
        },
        edit(index,row){ //点击编辑
            this.sampleEdit = true;
            this.upModal = false;
            this.patid=row.dchPatient.patientid;
            this.samid=row.dchSampleList[index].sampleid;
            this.sampleInfo=row.dchSampleList[index];
            this.seqdate=row.dchSampleList[index].seqdate;
            this.takendate=row.dchSampleList[index].takendate;
            this.receivedate=row.dchSampleList[index].receivedate;
            console.log(JSON.stringify(this.sampleInfo))
        },
        delet(index,row){  //删除样本
            this.removeModel=true;
            this.idList=[];
            if(row.dchSampleList.length==1){
                index=0;
            }
            this.idList.push(row.dchSampleList[index].sampleid)
        },
        run(index,row){  //点击运行
            this.samid=row.dchSampleList[index].sampleid;
            this.pipeline=row.dchSampleList[index].region;
            this.pipeline=this.pipeline.toUpperCase();
            if(this.pipeline=="WES"){
                this.pipeline='1'
            }else if(this.pipeline=="WGS"){
                this.pipeline='2'
            }else if(this.pipeline=="PANEL"){
                this.pipeline='3'
            }else if(this.pipeline=="NONE"){
                this.pipeline='0'
            }
            let obj={//只能是wes 其他的禁用   不会 iview的下拉框可以这么干？

                "sampleId":this.samid,
                "userId":getCookie("userid"),
                "productId":"2",
                "pipeline": this.pipeline,
                "templateId": "0",
                "fileGroupId":"aa",
            }
            data.executeSample(obj).then((data)=>{
                console.log(data)
                if(data.returnCode==200 || data.returnCode==0){
                    // 再次获取列表
                    this.load();
                    this.$Message.success("添加成功")
                }else if(data.returnCode==422 || data.returnCode==204){
                    this.$router.push('/login')
                }else{
                    this.$Message.error(data.msg)
                }
            }) 
        },
        addsample(row){//点击添加
            console.log(row)
            this.patid=row.dchPatient.patientid;
            this.sampleEdit=true;
            this.samid='';
            this.sampleInfo={};
        },
        //点击病人编号
        clickPatientcode(row){
            this.$store.state.tumourPatientInfo.tumourPatientId=row.dchPatient.patientid;
            this.$store.state.tumourPatientInfo.tumourpatientCode=row.dchPatient.patientcode;
            this.$router.push('/admin/tomour/deaseInfo');
        },
        selectChange(val){          //关键词选择
            this.pageIndex=1;
            this.currentPage=1;
            this.keyword='';
            switch(val){
                case 'patientcode':
                  this.searchValue="1";
                  break;
                case 'samplebatch':
                  this.searchValue="2";
                  break;  
                case 'samplecode':
                  this.searchValue="3";
                  break;  
            } 
        },
        sceneChange(item,index){    //弹层选择内容切换
            this.scenceUrl="1";
            this.$store.state.projecttype=item.projecttype;
            if(item.sceneShow){
                item.sceneShow=false;
            }else{
                item.sceneShow=true;
                if(index==0){
                    this.sceneList[1].sceneShow=false;
                }else{
                    this.sceneList[0].sceneShow=false;
                }
            }
        },
        newCase(){              //新建病例
            this.modal1=true;
            M.each(this.sceneList,(item)=>{
                item.sceneShow=false;
            })
        },
        handleSubmit(){
            if(this.scenceUrl!=''){
                // this.$router.push(this.scenceUrl)
                this.$store.state.tumourPatientInfo.tumourPatientId="";
                this.$store.state.tumourPatientInfo.tumourpatientCode="";
                this.$router.push('/admin/tomour/deaseInfo');
            }else{
                this.$Message.error("请选择场景")
            }
            
        },
        load(){
            let obj={
                "pageSize" : this.pageSize,
                "pageIndex" : this.pageIndex,
                "productId" : "2",
                "userId":getCookie("userid")
            }
            this.tableData3=[];
            data.getProjectList(obj).then((data)=>{
                if(data.returnCode==0 || data.returnCode==200){
                    if(data.data!=null){
                        this.total=data.data.count;
                        this.tableData3=data.data.projectList;
                    }
                }else if(data.returnCode==422 || data.returnCode==204){
                    this.$router.push('/login')
                }

            }).catch((error)=>{
                this.$Message.error(error.statusText);
            })
            
        },
        getCounts(){
            let obj={
                "productId" : "2",
                "userId":getCookie("userid")
            }
            data.getCounts(obj).then((data)=>{
                console.log(data)
                if(data.returnCode==0 || data.returnCode==200){
                    this.dataSize=data.data;
                }else if(data.returnCode==422 || data.returnCode==204){
                    this.$router.push('/login')
                }
            })
        }
    },
    mounted(){
        this.load();
        this.getCounts();
    },
    components: {treeGrid},
    filters: {
            // 格式化数据
            dataFormat(cellValue) {
                if(cellValue=='0' || cellValue=='5'){
                    return cellValue = "----"
                }else if(cellValue=='1' ) {
                    return cellValue = "等待"
                }else if(cellValue=='2') {
                    return cellValue = "正在运行"
                }else if(cellValue=='3') {
                    return cellValue = "已完成"
                }else if(cellValue=='4') {
                    return cellValue = "错误"
                }else if(cellValue=='6') {
                    return cellValue = "未执行"
                }
            },
        },
}   
</script>

