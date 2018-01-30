<style lang="scss" scoped>
    .demo-tabs-style2{
        background-color: #fff;
    }
    .mydata {
        overflow-x: hidden;
    }
    .mydata-nav .mydata-cont{
        padding-top:20px;
    }
    .mydata-content {
        margin:20px;
    }
    .select-na {
        padding-top: 5px;
        padding-right: 10px;
        float:left;
    }
    .slot-footer {
        padding:10px;
    }
    .batch-btn {
        padding:6px 40px;
    }
    .pri-left-btn {
        margin-left: -30px;
    }
    .pri-right-btn {
        margin-left: 20px;
    }
    
    
</style>
<template>
    <div class="mydata">
        <!-- 增加/搜索/批次-->
        <div class="mydata-nav">
            <div class="mydata-cont">
                <Row>
                    <Col span="3">
                        <div class="mydata-add">
                            <Dropdown style="margin-left:20px;position:relative;">
                                <Button type="primary" class="build">
                                    <Icon type="android-add"></Icon>
                                    新建数据
                                </Button>
                                 <div class="data">
                                    <div @click="single">单个数据</div>
                                    <div @click="files">批量数据</div>
                                </div> 
                            </Dropdown>
                        </div>
                    </Col>
                    <Col span="8" style="min-width:500px;margin-left:20px;">
                        <div class="search-inp">查询：
                            <Select v-model="searchColumn" style="width:140px;" placeholder="请选择查询字段" @on-change="getSearchColumn">
                                <Option v-for="item in searchColumnList" :value="item.value" :key="item.value" style="text-align:center;letter-spacing:1px;">{{ item.label }}</Option>
                            </Select>
                            <Input type="text" v-model="keyword" style="margin-right:20px;height:30px;width:40%;margin-left:5px;" placeholder="请输入关键字" />
                            <Button type="primary" class="build" @click="load">
                                查询
                            </Button>
                        </div>
                    </Col>
                    <Col span="3" style="float:right;margin-right:10px;min-width:300px;">
                        <div class="select-na">批次筛选:</div>
                        <Select style="float:left;width:120px;" v-model="selectPcId" @on-change="SelectChangeData">
                            <Option value="All">全部</Option>
                            <Option value="0">无批次</Option>
                            <Option v-for="(item, index) in piciList" :value="item.value" :label="item.label" :key="index">{{item.label}}</Option>
                        </Select>
                         <Button type="primary" class="build" @click="clickSoltData" style="margin-left:10px;">
                            分配数据
                        </Button> 
                    </Col>
                </Row>
            </div>
        </div>
        
        <!-- 内容区域 -->
        <div class="mydata-content"> 
            <el-table :data="tableData3" :highlight-current-row="true" border style="width: 100%;" :height="height"  @selection-change="handleSelectionChange">
                <el-table-column type="index" min-width="5%"></el-table-column>
                <el-table-column type="selection"width="55" v-if="showSelection" :disabled="disTableSelect">
                </el-table-column>
                
                <el-table-column label="病人编号" width="250" sortable prop="dchPatient.patientcode" >
                    <template slot-scope="scope">
                    	<Poptip placement="bottom-start" width="300" @on-popper-show="getUserBySample(scope.row)">
                    		<Icon style="padding:0 10px;cursor:pointer;" type="android-person"></Icon>
                    		<div class="api"  slot="content">
                    			<el-table v-loading="assinged"  align="center" :data="assignedData">
                        			<el-table-column  label="分配人姓名">
                        				<template slot-scope="scope2">
                        					<span v-if="assignedData[scope2.$index].dept.name!=''">
                        						{{assignedData[scope2.$index].username}}({{assignedData[scope2.$index].dept.name}})
                        					</span>
                        					<span v-if="assignedData[scope2.$index].dept.name==''">
                        						{{assignedData[scope2.$index].username}}
                        					</span>
                        				</template>
                        			</el-table-column>
                    			</el-table>
                    		</div>
                    	</Poptip>
                        <a style="width:70% !important;display:inline-block;text-align:left;" @click="clickPatientcode(scope.row)" href='javascript:;' class="bian">
                         {{ scope.row.dchPatient.patientcode }} 
                        </a> 
                    </template>
                </el-table-column>
                <el-table-column label="样本批次">
                    <template slot-scope="scope">
                        <div v-for="list in scope.row.dchSampleList" :key="list.sampleid" style="height:35px;line-height:35px;">{{list.samplebatch | foreignFlag}}</div>
                    </template>
                </el-table-column>
                <el-table-column label="样本编号">
                    <template slot-scope="scope">
                        <div @click="addsample(scope.row)"style="font-size:12px;text-decoration:underline;color:#3c8dbc;cursor:pointer;" v-if="scope.row.dchSampleList.length==0">添加</div>
                        <div class="bian" style="cursor:pointer;" v-for="(list,index) in scope.row.dchSampleList"  :key="list.sampleid" @click="samcode(index,scope.row)">{{ list.samplecode }}</div>
                    </template>
                </el-table-column>
                <el-table-column label="亲属关系"  prop="sample">
                    <template slot-scope="scope">
                        <div v-for="list in scope.row.dchSampleList" :key="list.sampleid" style="height:40px;line-height:40px;">{{list.designator}}</div>
                    </template>
                </el-table-column> 
                <el-table-column label="文件状态" width="200">
    				<template slot-scope="scope">
						<div v-for="(list,index) in scope.row.dchSampleList"  style="height:40px;" :key="index">
                            <Poptip  placement="bottom-end" v-if="list.fastq_R1!=null" width="300">
                                <div slot="content" style="height: 80px;word-wrap: break-word;text-align: left;">
                                    {{list.fastq_R1}}
                                </div>
                                <div class="imgbox">
                                    <div class="fastq_R1_on" ></div>
                                </div>
                            </Poptip>
                            <div class="imgbox" v-else>
                                <div class="fastq_R1_off"></div>
                            </div>
                            <Poptip  placement="bottom-end" v-if="list.fastq_R2!=null " width="300">
                                <div slot="content" style="height: 80px;word-wrap: break-word;text-align: left;">
                                    {{list.fastq_R2}}
                                </div>
                                <div class="imgbox">
                                    <div class="fastq_R2_on" ></div>	
                                </div>
                            </Poptip>
                            <div class="imgbox" v-else>
                                <div class="fastq_R2_off"></div>
                            </div>
                            <Poptip  placement="bottom-end" v-if="list.vcf!=null" width="300">
                                <div slot="content" style="height: 80px;word-wrap: break-word;text-align: left;">
                                    {{list.vcf}}
                                </div>
                                <div class="imgbox">
                                    <div class="vcf_on" ></div>
                                </div>
                            </Poptip>
                            <div class="imgbox" v-else>
                                <div class="vcf_off"></div>
                            </div>
                            <Poptip placement="bottom-end" v-if="list.etcFiles!=null " width="300">
                                <div class="imgbox">
                                    <div class="etc_on" ></div>
                                </div>
                                <div  slot="content">
                                    <table>
                                        <tbody>
                                            <tr v-for="(item,index) in list.etcFiles" :key="index" style="height:60px;word-wrap: break-word;text-align: left;">
                                                {{item}}
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </Poptip>
                            <div class="imgbox" v-else>
                                <div class="etc_off"></div>
                            </div>
                        </div>
    				</template>
    			</el-table-column>
                <el-table-column label="状态">
                    <template slot-scope="scope">
                        <div v-for="(list,index) in scope.row.dchSampleList" class="handle" style="height:40px;" :key="index">
                            <span class="status">{{list.samplestatus | dataFormat}}</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="操作" min-width="150%">
                    <template slot-scope="scope">
                        <div v-for="(list,index) in scope.row.dchSampleList" class="handle" :key="index">
                            <button class="bian" style="border:none;background:none;color:#ccc;padding: 0px 10px;" disabled @click="run(index,scope.row)" v-if="list.samplestatus=='0'||list.samplestatus=='5'">运行</button>
                            <span class="bian" @click="run(index,scope.row)" v-else-if="list.samplestatus=='6'">运行</span>
                            <span class="bian" @click="delet(index,scope.row)">删除</span>
                            <span class="bian" @click="edit(index,scope.row)">编辑</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="解读">
                    <template slot-scope="scope">
                        <a @click="jumpTgexPage(scope.row)"   target="_blank">分析</a>
                    </template>
                </el-table-column>
            </el-table>
            <div style="padding-top:40px;">
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
                    <Col :lg="{span:12,push:7}" v-if="batchShowBtn">
                        <Button type="default" class="batch-btn pri-left-btn" @click="batchClickBtn">
                            返回
                        </Button>
                        <Button type="primary" class="batch-btn pri-right-btn" @click="bactnSubmmitBtn" :disabled="disShowNo">
                            分配
                        </Button>
                    </Col>
                </Row>
            </div>


        <!--样本信息-->
        <Modal width="835px" v-model="sampleEdit" :mask-closable="false" @on-cancel="clickCancel">
            <div class="sample-title">样本信息</div>
            <div class="sample-main">
                <div class="stitle">
                    <Icon type="clipboard" style="font-size:22px;"></Icon>
                    <span style="padding-left:5px;">样本信息（*为必填项）</span>
                </div>
                <div class="sample-inner">
                    <Form :model="sampleInfo" label-position="left" :label-width="100" inline ref="sampleInfo" :rules="ruleCustom">
                        <Row>
                            <Col class="tables">
                                <FormItem label="样本编号" style="width:30%;" prop="samplecode">
                                    <Input v-model="sampleInfo.samplecode"></Input>
                                </FormItem>
                                <FormItem label="样本类型" style="width:30%;">
                                    <Select v-model="sampleInfo.sampletype">
                                        <Option v-for="item in sampletype" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                    </Select>
                                </FormItem>
                            </Col>
                            <Col class="tables">
                                <FormItem label="亲属关系" style="width:30%;" prop="designator"> 
                                    <Select v-model="sampleInfo.designator">
                                        <Option v-for="item in designator" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                    </Select>
                                </FormItem>
                                <FormItem label="取样日期" style="width:30%;">
                                    <DatePicker type="date" v-model="takendate" ></DatePicker>
                                </FormItem>
                            </Col>
                            <Col class="tables">
                                <FormItem label="收样日期" style="width:30%;">
                                    <DatePicker type="date" v-model="receivedate" ></DatePicker>
                                </FormItem>
                                <FormItem label="测序日期" style="width:30%;">
                                    <DatePicker type="date" v-model="seqdate" ></DatePicker>
                                </FormItem>
                            </Col>
                            <Col class="tables">
                                <FormItem label="测序区域" style="width:30%;" prop="region">
                                    <Select v-model="sampleInfo.region">
                                        <Option v-for="item in region" :value="item.value" :key="item.value" :disabled="item.disabled">{{ item.label }}</Option>
                                    </Select>
                                </FormItem>
                                <FormItem label="测序平台" style="width:30%;">
                                    <Select v-model="platformId">
                                        <Option v-for="item in platform" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                    </Select>
                                </FormItem>

                            </Col>

                            <Col class="tables">
                                <FormItem label="Enrichment Kit" style="width:30%;">
                                    <Select v-model="enrichmentkitId">
                                        <Option v-for="item in enrichmentkit" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                    </Select>
                                </FormItem>
                                <FormItem label="测序类型" style="width:30%;">
                                    <Select v-model="sampleInfo.seqtype">
                                        <Option v-for="item in seqtype" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                    </Select>
                                </FormItem>

                            </Col>
                            <Col class="tables">
                                <FormItem label="备注" style="width:30%;">
                                    <Input v-model="sampleInfo.notes"></Input>
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
                            <Button type="primary" @click="uploadSample"  :disabled="uploadDisabled">上传</Button> 
                        </div>
                    </Col>
                </Row> 
            </div>
        </Modal>
        <!--样本文件信息-->
        <Modal width="835px" v-model="sampleshow" :mask-closable="false">
            <div class="sample-title">
                 样本文件信息:
                <span>{{sampcode}}</span>
            </div>
            <div class="sample-inner">
                <div style="padding:20px 10px;">
                    <el-table border align="center" :data="samplefile">
                        <el-table-column label="文件名称" min-width="150%" prop="filename"></el-table-column>
                        <el-table-column label="文件大小"  prop="size"></el-table-column>
                        <el-table-column label="上传时间"  prop="uploaddate"></el-table-column>
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
        <!--删除提示-->
        <Modal v-model="removeModel" title="删除提示" width="300" :mask-closable="false">
            <p style="padding:20px;text-align:center;">您确定要删除这条信息吗？</p>
            <div class="fastq-footer">
                <Button size="small" type="primary" @click="saveInfoClick">确定</Button>
            </div>
        </Modal>
        <!-- 分配数据弹框 -->
        <Modal v-model="slotModel" title="分配数据" width="600" :mask-closable="false">   
            <div class="sample-main">
                <div class="sample-inner">
                    <Tree :data="groupMemberData" show-checkbox @on-check-change="clickCheckBtn" :multiple="true"></Tree>
                </div>
            </div>
            <div class="slot-footer">
                <Row>
                    <Col span="6" push="6">
                        <Button type="default" @click="cancelBtn">取消</Button> 
                    </Col>
                    <Col span="6" push="6">
                        <Button type="primary" @click="handleSubmit">确定</Button> 
                    </Col>
                </Row>
            </div>
        </Modal>
        </div>
    </div>
</template>
<script>
// 数据操作方法
import {menuListToTree} from 'common/js/Base';
import {data,task} from 'api/index.js'
import {getCookie} from '@/common/js/cookie.js'
import { Loading } from 'element-ui';
import treeGrid from '@/components/treeTable/vue2/TreeGrid'
  export default{
    name: "mydata",
    data(){
      return {
        tabsVal:'upload',             //默认tabs的value值
        disTableSelect:false,         // 禁用表格多选框
        disShowNo:true,               // 分配按钮禁用
        batchShowBtn:false,           // 右下角按钮的显示隐藏
        showSelection:false,          // 默认不显示选择数据，点击右上角分配数据后显示
        slotModel:false,              // 分配数据弹层，默认隐藏
        selectPcId:"All",             // 批次默认选中项
        piciList:[],                  // 批次下拉数据
        patientidList: [],            // 选中病人信息id列表
        deptidList: [],               // 选中组成员id列表
        groupMemberData:[],           // 组、成员数据
        assignedData:[],              // 分配人的数据
        assinged:true,                //加载分配人时loading
        height:'500',                 //表格默认高              
        uploadDisabled: true,         //上传按钮是否禁用
        platformId:'',                //绑定platform
        enrichmentkitId:'',           //绑定enrichmentkit
        takendate:'',                 //绑定日期
        receivedate:'',
        seqdate:'',
        sampleshow:false,             //显示样本文件信息弹窗
        pageSize:50,                  //每页显示数量
        total:0,                      //总条数
        pageIndex:1,                  //页码
        patid:'',                     //存放patientid
        samid:'',                     //存放sampleid
        sampcode:'',
        removeModel:false,            //显示删除提示框
        sampleEdit: false,            //显示样本弹窗
        upModal: false,               //显示文件上传弹窗
        sampleInfo: {},               //存放样本信息
        samplefile:[],                //存放样本文件信息
        fileCategoryList: [],                // 本地
        fileServerCategoryList: [],          // 服务
        pipeline:'',                         //存放pipeline 
        allocation:false,                    //代表是否在分配状态
        ruleCustom: {                        //表单验证规则
          samplecode: [
              { required: true, message: '样本编号不能为空', trigger: 'blur' }
          ],
          designator: [
              { required: true, message: '亲属关系不能为空', trigger: 'blur' }
          ],
          region:[
              {required: true, message: '测序区域不能为空', trigger: 'blur' }
          ]},
        columns: [                          //上传树形表格的标题
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
            //    text: '传输时间',
            //     dataIndex: 'transition',
            //     width:'10'
            // }
          ],
        sampletype: [{  //样本类型
          value: '血样',
          label: '血样'
          }, {
          value: '肿瘤活检',
          label: '肿瘤活检'
          }, {
          value: '口腔',
          label: '口腔'
          }],
        designator: [{    //亲属关系
            value: '先证者',
            label: '先证者'
            }, {
            value: '父亲',
            label: '父亲'
            }, {
            value: '母亲',
            label: '母亲'
            }, {
            value: '兄弟',
            label: '兄弟'
            }, {
            value: '姐妹',
            label: '姐妹'
            }, {
            value: '祖父',
            label: '祖父'
            }, {
            value: '祖母',
            label: '祖母'
            }, {
            value: '外祖父',
            label: '外祖父'
            }, {
            value: '外祖母',
            label: '外祖母'
            }, {
            value: '舅舅',
            label: '舅舅'
            }, {
            value: '姨妈',
            label: '姨妈'
            }, {
            value: '叔叔',
            label: '叔叔'
            }, {
            value: '姑姑',
            label: '姑姑'
            }, {
            value: '同卵双胞胎',
            label: '同卵双胞胎'
            }, {
            value: '异卵双胞胎',
            label: '异卵双胞胎'
            }, {
            value: '其他',
            label: '其他'
        }],
        region: [{    //测序区域
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
        platform: [],           //存放platform
        enrichmentkit: [],      //存放enrichmentkit
        seqtype: [{    //测序类型
            value: 'DNA-Seq',
            label: 'DNA-Seq'
            }, {
            value: 'RNA-Seq',
            label: 'RNA-Seq'
        }],
        tableData3: [],     //数据列表
        userId:'',          //存放userId
        idList:[],          //sampleid的集合
        searchColumn:'',            //查询字段
        searchColumnList:[          //查询字段集合
            {
                label:'全部数据',
                value:'all'
            },{
                label:'病人编号',
                value:'patientcode'
            },{
                label:'样本批次',
                value:'samplebatch'
            },{
                label:'样本编号',
                value:'samplecode'
            },
        ],
        keyword:'',             //查询内容
        currentPage:1,         //当前页数
      }
    },
    methods: {
        //点击病人编号
        clickPatientcode(row){
            this.$store.state.patientInfo.patientId=row.dchPatient.patientid;
            this.$store.state.patientInfo.patientCode=row.dchPatient.patientcode;
            this.$router.push('/admin/gene/edit')
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
        //获取查询字段
        getSearchColumn(val){
            this.pageIndex=1;
            this.currentPage=1;
            this.keyword='';
            if(val=="all"){
                this.load();
                this.searchColumn="";
            }
            switch(val){
                case 'patientcode':
                  this.searchColumn="1";
                  break;
                case 'samplebatch':
                  this.searchColumn="2";
                  break;  
                case 'samplecode':
                  this.searchColumn="3";
                  break;  
            }     
        },
        // 点击树形结构复选框
        clickCheckBtn(value) {
            console.log(JSON.stringify(value));
            
            // 存放成员id
            let num;
            this.deptidList.length=0;
            // 获得勾选成员id
            if(M.isArray(value)) {
                M.each(value,(item)=> {
                    num = item.deptId;
                    if(item.children && item.children.length>0) {
                        this.clickCheckBtn(item.children);
                    }
                    this.deptidList.push(num);
                    // 去掉数组中的重复
                    this.deptidList = M.uniqueArray(this.deptidList);
                })
            }
            console.log(this.deptidList);
        },
        // 表格左侧选择事件
        handleSelectionChange(value) {
            // console.log(JSON.stringify(value));
            if(value.length>0) {
                this.disShowNo = false;
            }else {
                this.disShowNo = true;
            }
            // console.log(this.useridList);
            //调用方法
            this.orgTableSubmmitArr(value);
        },
        // 组织提交数据-表格"patientidList":[]
        orgTableSubmmitArr(arr) {
            let patientidList = [];
            if(M.isArray(arr) && !M.isEmptyArray(arr)) {
                M.each(arr,(item)=> {
                    let str = '';
                        str = item.dchPatient.patientid;
                    patientidList.push(str);
                })
            }
            // console.log(patientidList);
            this.patientidList = patientidList;
            return patientidList;
        },
        // 右下角取消按钮
        batchClickBtn() {
            this.showSelection = false;
            // 按钮隐藏
            this.batchShowBtn = false;
            // 设置批次选中项
            this.selectPcId = "All";
            this.allocation=false;
            this.pageIndex=1;
            // 返回列表
            this.load();
        },
        // 分配数据-弹层打开
        bactnSubmmitBtn() {
            // 调用组、成员接口
            this.getDeptAndUser();
            // 弹层打开
            this.slotModel = true;
        },
        // 分配数据-确定事件
        handleSubmit() {
            // if(this.deptidList.length==1){
                console.log(this.deptidList)
                let obj = {
                    "userId":getCookie('userid'),
                    "patientidList":this.patientidList || [],
                    "deptidList":this.deptidList
                }
                data.assignData(obj).then((data)=> {
                    if(data.returnCode==0 || data.returnCode==200) {
                        this.$Message.success(data.msg);
                        this.slotModel = false;
                        // this.patientidList= [];           // 置空
                        this.deptidList=[];               // 置空
                    }else if(data.returnCode==422 || data.returnCode==204){
                        this.$router.push('/login')
                    }else{
                        this.$Message.error("请选择分配组成员");
                    }
                })
            // }else if(this.deptidList.length==0){
            //     this.$Message.error('请选择一位组成员')
            // }else{
            //     this.$Message.error('只能选择一位组成员')
            // }
            
        },
        // 取消点击
        cancelBtn() {
            this.slotModel = false;
            this.patientidList= [];           // 置空
            this.deptidList=[];               // 置空
        },
        // 批次改变事件
        SelectChangeData(val) {
            this.selectPcId = val? val : "All";
            if(this.selectPcId=="All") {
                this.showSelection = false;
                // 按钮隐藏
                this.batchShowBtn = false;
                this.allocation=false;
                this.pageIndex=1;
                this.currentPage=1;
                this.load();
            }else {
                this.allocation=true;
                this.pageIndex=1;
                this.currentPage=1;
                this.SoltDataList();
            } 
            // console.log(this.selectPcId);
        },
        // 分配数据点击事件-切换成选择表格
        clickSoltData(){
            this.pageIndex=1;
            this.currentPage=1;
            this.allocation=true;
            this.SoltDataList();
        },
        // 分配数据点击事件-切换成选择表格
        SoltDataList() {
            // 显示选项
            this.showSelection = true;
            // 右下角按钮显示
            this.batchShowBtn = true;
            // 根据样本获得病人信息参数
            let obj = {
                "productId":"1" ,
                "batchId":this.selectPcId,
                "pageSize":this.pageSize,
                "pageIndex":this.pageIndex
            }
            if(this.pageIndex==1){
                this.tableData3.length=0;
            }
            // 根据批次获得对应数据信息
            data.getProjectListByBatchId(obj).then((data)=> {
                if(data.returnCode==200 || data.returnCode==0) {
                    if(data.data!=null){
                        this.tableData3 = data.data.projectList;
                        this.total=data.data.count;
                        M.each(this.tableData3,(item)=> {
                            // console.log(item.dchSampleList);
                            if(item.dchSampleList.length==0) {
                                this.disTableSelect = true;
                            }
                        })
                    }else{
                        this.tableData3=[];
                    }
                }else if(data.returnCode==422 || data.returnCode==204){
                    this.$router.push('/login')
                }else{
                    this.$Message.error(data.msg);
                    this.tableData3=[];
                }
            })
        },
        // 获得组成员列表
        getDeptAndUser() {
            let obj = {
                "userId": getCookie('userid')
            }
            data.queryDeptAndUser(obj).then((data)=> {
                if(data.returnCode==0 || data.returnCode==200){
                    this.groupMemberData = data.data;
                }else if(data.returnCode==422 || data.returnCode==204){
                    this.$router.push('/login')
                }else{
                    this.$Message.error(data.msg)
                }
            })
        },
        // 获得批次信息
        getBatchList() {
            let obj = {
                userId: getCookie('userid'),
                productId:'1'
            }
            task.getBatchList(obj).then((data)=> {
                // console.log(data);
                if(data.returnCode==0 || data.returnCode==200) {
                    this.piciList = this.transformToSelect(data.data);
                }else if(data.returnCode==422 || data.returnCode==204){
                    this.$router.push('/login')
                }else{
		    this.$Message.error(data.msg)
		}
            })
        },
        // 转成select需要数据
        transformToSelect(arr) {
            // 返回值
            let array = [];
            if(M.isArray(arr)) {
                M.each(arr,(item,index)=> {
                    // console.log(item);
                    if(item && item !=0) {
                        let obj = {};
                        obj.value = item;
                        obj.label = item;
                        array.push(obj);
                    }
                })
            }
            return array;
        },
        //格式化表格数据（结束时间）
        foreignFlag(row,column,cellValue) {
            // console.log(typeof(cellValue));
            if(cellValue =='0'){
                return cellValue = "未执行"
            }else if(cellValue =='1') {
                return cellValue = "等待";
            }else if(cellValue =='2') {
                return cellValue = "正在运行";
            }else if(cellValue =='3') {
                return cellValue = "已完成";
            }else if(cellValue =='4') {
                return cellValue = "错误";
            }
        },
        // 解读跳转
        jumpTgexPage(row) {
            // console.log(row.dchPatient.patientid)
            let loadingInstance = Loading.service({target:document.querySelector(".mydata-content")});
            let obj = {
                "userId":getCookie("userid"),
                paientId:row.dchPatient.patientid
            }
            // console.log(obj)
            data.createCaseByPaientId(obj).then((data)=> {
                console.log(data.data);
                if(data.returnCode=="200" || data.returnCode =="0"){
                    let a = document.createElement('a');
                    // http://10.131.101.173:88/#/analyses/
                    // http://tgex-dev.dchgenecloud.com:88/#/analyses/
						a.setAttribute('href',"http://10.131.101.173:88/#/analyses/"+data.data);
						a.setAttribute('target', '_blank');
						document.body.appendChild(a)
						a.click(); 
						a.parentNode.removeChild(a);
                }else if(data.returnCode==422 || data.returnCode==204){
                    this.$router.push('/login')
                }else{
                    this.$Message.error(data.msg)
                }
                loadingInstance.close();
            }).catch((error)=>{
            	this.$Message.error(error.statusText);
				loadingInstance.close();
            })
        },
        clearFiles(){
            const fileList = this.$refs.upload.fileList;
            this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
        },
        upsuccess(response, file, fileList){
            if(response.returnCode==0){
                this.$Message.success(response.msg)
            }else if(response.returnCode==217){
                this.$Message.error(response.msg)
            }else if(response.returnCode==422 || response.returnCode==204){
                this.$router.push('/login')
            }
            this.$refs.upload.clearFiles();
        },
        uperror(error, file, fileList){
            this.$Message.error(error.msg)
        },
        // 弹层关闭
        clickCancel() {
            this.uploadDisabled = true;
        },
        // tabs切换事件
        serverlocal(name){  //serverlocal
            if(name=='local') {
                console.log(this.tabsVal)
                this._getLocalDataList();
                this.$store.state.treeGrid=1;
            }else if(name=='server') {
                console.log(this.tabsVal)
                this._getServerDataList();
                this.$store.state.treeGrid=2;
            }
        },
        //关闭上传文件弹层清空数据
        clearData(){
            this.tabsVal='upload'
            this.fileCategoryList=[];
            this.fileServerCategoryList=[];
            this.uploadDisabled=true;
        },
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
        pull(){  //获取下拉菜单
            let obj={
                "userId":getCookie("userid"),
                "productId":"1"
            }
            data.getTGexPara(obj).then((data)=>{
            // console.log(data.data)
                if(data.returnCode==0 || data.returnCode==200){
                    let eklen=data.data.enrichmentkit.length;
                    M.each(data.data.enrichmentkit,(item,index)=>{
                        var result={};
                        result.value=item;
                        result.label=item;
                        this.enrichmentkit.push(result)
                    })
                    M.each(data.data.platform,(item,index)=>{
                        var result={};
                        result.value=item;
                        result.label=item;
                        this.platform.push(result)
                    })
                }else if(data.returnCode==422 || data.returnCode==204){
                    this.$router.push('/login')
                }
            }).catch((error)=>{

            })
        },
        addsample(row){//点击添加
            console.log(row)
            this.uploadDisabled = true;
            this.patid=row.dchPatient.patientid;
            this.sampleEdit=true;
            this.sampleInfo={};
            this.samid='';
            this.pull();
            console.log(this.patid)
        },
	//点击人物ICON
        getUserBySample(row){
        	let len=row.dchSampleList.length;
        	let userid = getCookie("userid");
        	this.assignedData=[];
        	this.assinged=true;
        	if(len && len>0){
        		let obj={
        			"userid": userid,
                    // "sampleid":row.dchSampleList[0].sampleid
                    "patientid":row.dchPatient.patientid
        		}
        		data.getUsesBySampleId(obj).then((data)=>{
                    console.log(data)
	        		if(data.returnCode==200 || data.returnCode==0){
	        			if(data.data && data.data.length>0){
	        				// if(data.data.length==1 && data.data[0].dchUserId==userid){ //当只有一条数据时
	        				// 	this.assignedData=[{"username":"暂未分配","dept":{"name":""}}];
	        				// }else if(data.data.length>1){
	        				this.assignedData=data.data;
	        				// }
	        			}
	        		}else if(data.returnCode==422 || data.returnCode==204){
                        this.$router.push('/login')
                    }else{
	        			this.$Message.error(data.msg);
	        		}
	        		this.assinged=false;
	        	}).catch((error)=>{
	        		this.$Message.error(error.statusText);
					this.assignedData=[];
					this.assinged=false;
	            })
        	}else{
        		this.assinged=false;
        	}
        },
        // 上传
        uploadSample(){
            this.sampleEdit = false;
            this.upModal = true;
        },
        keep(name){  //点击保存
            let obj={
                userId:getCookie("userid"),
                patientid:this.patid,
                productId:"1",
                sampleid:this.samid,
                enrichmentkit:this.enrichmentkitId,
                platform:this.platformId,
                takendate:String(this.takendate),
                receivedate:String(this.receivedate),
                seqdate:String(this.seqdate)
            }
            M.extend(this.sampleInfo,obj);
            console.log(this.sampleInfo)
            this.$refs[name].validate((valid) => {
                if(valid){
                    if(this.sampleInfo.sampleid!=''){
                        data.updateSample(this.sampleInfo).then((data)=>{
                            console.log(data)
                            if(data.returnCode==0 || data.returnCode==200){
                                this.$Message.success(data.msg);
                                this.load();
                                this.uploadDisabled = false;
                            }else if(data.returnCode==422 || data.returnCode==204){
                                this.$router.push('/login')
                            }else{
                                this.$Message.error(data.msg)
                            }
                        }).catch((error)=>{

                        })
                }else{
                    data.addSample(this.sampleInfo).then((data)=>{
                        console.log(data)
                        if(data.returnCode==0 || data.returnCode==200){
                            if(data.data!="null"||data.data!=null){
                                this.$Message.success(data.msg);
                                this.load();
                                this.uploadDisabled = false;
                                this.samid=data.data.sampleid;
                            }
                        }else if(data.returnCode==422 || data.returnCode==204){
                            this.$router.push('/login')
                        }else{
                            this.$Message.error(data.msg)
                        }
                        
                    }).catch((error)=>{
                            
                    })
                }
            }
            })
        },
        saveInfoClick(){  //删除确定
            let obj={
                "idList":this.idList,
                "userId":getCookie("userid"),
                "productId":"1"
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
            }).catch((error)=>{
                            
            })
        },
        delet(index,row){  //删除样本
            this.removeModel=true;
            this.idList=[];
            if(row.dchSampleList.length==1){
                index=0;
            }
            this.idList.push(row.dchSampleList[index].sampleid)
        },
        samcode(index,row){ //点击样本编号
            this.sampcode=row.dchSampleList[index].samplecode;
            this.sampleshow=true;
            this.samplefile=[];
            let obj={
                "userId":getCookie("userid"),
                "sampleid":row.dchSampleList[index].sampleid,
                "productId":"1"
            }
            console.log(obj.sampleid)
            let flag=true;
            if(flag){
                flag=false;
                data.getFileList(obj).then((data)=>{
                    if(data.returnCode==0 || data.returnCode==200){
                        if(data.data!=null || data.data!='null'){
                            this.samplefile=data.data;
                        }
                    }else if(data.returnCode==422 || data.returnCode==204){
                        this.$router.push('/login')
                    }else{
                        this.$Message.error(data.msg)
                    }
                    flag=true;
                }).catch((error)=>{
                            
                })
            }
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
        files(){ //点击批量数据
            this.$store.state.projectid=1;
            this.$router.push('/admin/fileup')
        },
        single(){//点击单一数据
            this.datashow = false;
            this.$router.push('/admin/gene/info');
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
                "productId":"1",
                "pipeline": this.pipeline,
                "templateId": "0",
                "fileGroupId":"aa",
            }
            data.executeSample(obj).then((data)=>{
                if(data.returnCode==200 || data.returnCode==0){
                // 再次获取列表
                    this.load();
                    this.$Message.success("添加成功")
                }else if(data.returnCode==422 || data.returnCode==204){
                    this.$router.push('/login')
                }else{
                    this.$Message.error(data.msg)
                }
            }).catch((error)=>{
                            
            }) 
        },
        //数据列表加载
        load(){ //数据列表加载
            let obj={
                "pageSize" : this.pageSize,
                "pageIndex" : this.pageIndex,
                "productId" : "1",
                "userId":getCookie('userid'),
            }  
            this.tableData3.length=0;
            if(this.searchColumn!='' && this.searchColumn!="all"){
                obj.searchColumn=this.searchColumn;
                obj.keyword=this.keyword;
            }
            console.log(obj)
            data.getProjectList(obj).then((data)=>{
                console.log(data)
                if(data.returnCode==0 || data.returnCode==200){
                    if(data.data!=null){
                        this.total=data.data.count;
                        this.tableData3= data.data.projectList;
                    }
                }else if(data.returnCode==422 || data.returnCode==204){
                    this.$router.push('/login')
                }
            }).catch((error)=>{
                this.$Message.error(error.statusText);
            })
        },
        //点击编辑
        edit(index,row){ 
            this.sampleEdit = true;
            this.upModal = false;
            this.pull();
            this.patid=row.dchPatient.patientid;
            this.enrichmentkitId=row.dchSampleList[index].enrichmentkit;
            this.platformId=row.dchSampleList[index].platform;
            this.samid=row.dchSampleList[index].sampleid;
            this.seqdate=row.dchSampleList[index].seqdate;
            this.takendate=row.dchSampleList[index].takendate;
            this.receivedate=row.dchSampleList[index].receivedate;
            this.sampleInfo=row.dchSampleList[index];
            this.userId=getCookie("userid");
        },
        //点击上传
        upload(){ 
            this.sampleEdit = false;
            this.upModal = true;
        },
    },
    components: {treeGrid},
    created(){
        this.load();
        // 获得批次列表
        this.getBatchList();
    },
    filters: {
        // 格式化数据
        foreignFlag(cellValue) {
            // console.log(cellValue)
            if(cellValue == '0'){
                return cellValue = ""
            }else if(cellValue){
                return cellValue
            }
        },
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
