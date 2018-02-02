<script lang="scss" scoped>
    
</script>
<template>
    <div>
        <div>
            <Col span="24" class="demo-tabs-style2" v-if="datashow" style="background:#fff;">
                <Tabs type="card">
                    <TabPane label="我的数据"></TabPane>
                    <!--<TabPane label="公共数据"></TabPane>-->
                </Tabs>
                <div class="mydata">
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
                    </Row>
        
                    <div style="width:100%;padding:15px 20px;box-sizing:border-box;">
                        <el-table :data="tableData3" border  :height="height" v-loading="loadone" :highlight-current-row="true">
                            <el-table-column label="病人编号" sortable prop="dchPatient.patientcode">
                                <template slot-scope="scope">
                                    <a  @click="clickPatientcode(scope.row)" href='javascript:;' class="bian">
                                    {{ scope.row.dchPatient.patientcode }} 
                                    </a>
                                </template>
                            </el-table-column>
                            <el-table-column label="姓名" prop="dchPatient.patientname">
                            </el-table-column>
                            <el-table-column label="样本类型" prop="sample" >
                                <template slot-scope="scope">
                                    <div v-for="list in scope.row.dchSampleList" :key="list.id" class="handle" style="height:40px;">{{list.sampletype}}</div>
                                </template>
                            </el-table-column>          
                            <el-table-column label="样本编号">
                                <template slot-scope="scope">
                                    <div @click="addsample(scope.row)"style="font-size:12px;text-decoration:underline;color:#3c8dbc;cursor:pointer;" v-if="scope.row.dchSampleList.length==0">添加</div>
                                    <div class="bian"v-for="(list,index) in scope.row.dchSampleList" style="cursor:pointer;height:40px;"  :key="list.id" @click="samcode(index,scope.row)">{{ list.samplecode }}</div>
                                </template>
                            </el-table-column>
                            <el-table-column label="文件状态" width="200">
                                <template slot-scope="scope">
                                    <div v-for="(list,index) in scope.row.dchSampleList"  style="height:40px;" :key="index">
                                        <Poptip  :placement="scope.$index<=2?'bottom-end':'top-end'" v-if="list.fastq_R1!=null" width="300">
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
                                        <Poptip  :placement="scope.$index<=2?'bottom-end':'top-end'" v-if="list.fastq_R2!=null " width="300">
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
                                        <Poptip  :placement="scope.$index<=2?'bottom-end':'top-end'" v-if="list.vcf!=null" width="300">
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
                                        <Poptip :placement="scope.$index<=2?'bottom-end':'top-end'" v-if="list.etcFiles!=null " width="300">
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
                                    <div v-for="(list,index) in scope.row.dchSampleList" class="handle" style="height:40px;">
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
                                        <!-- <router-link :to="{path:'/admin/tumour/cgdap?samid='+list.sampleid}" v-if="list.isexecute==='3'">C GDAP</router-link> -->
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
                </div>
            </Col>
        </div>
        
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
       
        
    </div>
</template>
<script>
import {data} from 'api/index.js'
import {getCookie} from '@/common/js/cookie.js'
import treeGrid from '@/components/treeTable/vue2/TreeGrid'
  export default{
    name: "mydata",
    data(){
      return {
        height:'500',  //表格默认高
        takendate:'',  //日期
        receivedate:'',
        seqdate:'',
        loadone:'',   //加载loading
        removeModel:false,//删除确定
        fastq:false,   //点击运行 fastq弹窗
        loading:true,  //加载loading
        sampleshow:false,   //点击样本编号 弹窗
        pageSize:50,  //页数
        total:0,  //总条数
        pageIndex:1,  //页码
        patid:'',  //存储patientid
        samid:'',  //存储sampleid
        datashow: true,  //显示我的数据部分
        sampleEdit: false,  //点击编辑 弹窗
        upModal: false,   //点击上传 弹窗
        sampleInfo: {},  //样本信息弹窗信息
        samplefile:[],  //样本文件信息弹窗信息
        fileCategoryList: [],                // 本地
        fileServerCategoryList: [],          // 服务
        choice:[], //fastq文件数据
        choices:[],  //fastq文件数据
        pipeline:'',   //存放pipeline
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
        userId:'',
        seqtype: [{  //测序类型下拉菜单
            value: 'DNA',
            label: 'DNA'
          }, {
            value: 'RNA',
            label: 'RNA'
          }],
        tableData3: [],   //数据列表
        tabsVal:'upload',  //绑定文件上传页面的当前tab
        currentPage:1,         //当前页数
        searchColumn:'',            //查询字段
        searchColumnList:[          //查询字段集合
            {
                label:'--请选择--',
                value:'all'
            },{
                label:'病人编号',
                value:'patientcode'
            },{
                label:'样本编号',
                value:'samplecode'
            },
        ],
        keyword:'',             //查询内容
      }
    },
    methods: {
        //点击病人编号
        clickPatientcode(row){
            this.$store.state.patientInfo.patientId=row.dchPatient.patientid;
            this.$store.state.patientInfo.patientCode=row.dchPatient.patientcode;
            this.$router.push('/admin/tumour/edit')
        },
        //获取查询字段
        getSearchColumn(val){
            this.pageIndex=1;
            this.currentPage=1;
            this.keyword='';
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
        //关闭上传文件弹层清空数据
        clearData(){
            this.tabsVal='upload'
            this.fileCategoryList=[];
            this.fileServerCategoryList=[];
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
        // 上传
        uploadSample(){
            this.sampleEdit = false;
            this.upModal = true;
        },
        keep(name){  //点击保存
            let obj={
                userId:getCookie("userid"),
                patientid:this.patid,
                productId:"2",
                sampleid:this.samid,
                takendate:String(this.takendate),
                receivedate:String(this.receivedate),
                seqdate:String(this.seqdate),
            }
            M.extend(this.sampleInfo,obj)
            this.$refs[name].validate((valid) => {
                if(valid){
                    if(this.sampleInfo.sampleid!=''){
                        data.updateSample(this.sampleInfo).then((data)=>{
                            if(data.returnCode==0 || data.returnCode==200){
                                this.$Message.success(data.msg);
                                this.load();
                            }else if(data.returnCode==422 || data.returnCode==204){
                                this.$router.push('/login')
                            }else{
                                this.$Message.error(data.msg);
                            }
                            
                        })
                }else{
                    data.addSample(this.sampleInfo).then((data)=>{
                        if(data.returnCode==0 || data.returnCode==200){
                            if(data.data=="null"||data.data==null){
                                this.$Message.error(data.msg);
                            }else{
                                this.$Message.success(data.msg);
                                this.load();
                                this.samid=data.data.sampleid;
                            }
                        }else if(data.returnCode==422 || data.returnCode==204){
                            this.$router.push('/login')
                        }else{
                            this.$Message.error(data.msg)
                        }
                    })
                }
            }
            })
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
        // 获得本地/storage/serverData/
        _getLocalDataList() {
            let obj={
                "path":"/storage/serverData/",
                // "path":"/opt/NfsDir/PublicDir/demo/",
                        // /opt/NfsDir/PublicDir/demo/  电信云
                        // /storage/serverData/   159
                "userId":getCookie("userid"),
                "productId":"2",
                "type":"2"
            }
            data.getSingleForldList(obj).then((data)=>{
                if(data.returnCode==0 || data.returnCode==200){
                    if(M.isArray(data.data)) {
                        this.fileCategoryList=data.data;
                    }else {
                        this.$Message.error(data.msg)
                    } 
                }else if(data.returnCode==422 || data.returnCode==204){
                    this.$router.push('/login')
                }else{
                    this.$Message.error(data.msg)
                }
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
                "productId":"2",
                "type":"2"
            }
            data.getSingleForldList(obj).then((data)=>{
                    // console.log(data)
                if(data.returnCode==0 || data.returnCode==200){
                    if(M.isArray(data.data)) {
                        this.fileServerCategoryList=data.data;
                    }else {
                        this.$Message.error(data.msg)
                    } 
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
        delet(index,row){  //删除样本
            this.removeModel=true;
            this.idList=[];
            if(row.dchSampleList.length==1){
                index=0;
            }
            this.idList.push(row.dchSampleList[index].sampleid)
        },
        samcode(index,row){ //点击样本编号
            this.sampleshow=true;
            this.samplefile=[];
            let obj={
                "userId":getCookie("userid"),
                "sampleid":row.dchSampleList[index].sampleid,
                "productId":"2"
            }
            console.log(obj)
            data.getFileList(obj).then((data)=>{
                if(data.returnCode || data.returnCode==200){
                    if(data.data==null||data.data=="null"){
                        this.$Message.error(data.msg);
                    }else{
                        this.samplefile=data.data;
                    }
                }else if(data.returnCode==422 || data.returnCode==204){
                    this.$router.push('/login')
                }else{
                    this.$Message.error(data.msg)
                }
            })
            // }
            
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
        files(){
            this.$router.push('/admin/fileup?productId=2')
        },
        single(){
            this.datashow = false;
            this.$router.push('/admin/tumour/info?type=single');
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
        
        load(){
            let obj={
                "pageSize" : this.pageSize,
                "pageIndex" : this.pageIndex,
                "productId" : "2",
                "userId":getCookie("userid")
            }
            this.loading=true;
            this.tableData3.length=0;
            if(this.searchColumn!='' && this.searchColumn!="all"){
                obj.searchColumn=this.searchColumn;
                obj.keyword=this.keyword;
            }
            data.getProjectList(obj).then((data)=>{
                console.log(data)
                this.loadone=false;
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
                this.loading=false;
                this.loadone=false;
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
        },
        components: {treeGrid},
        mounted(){
            this.load();
        },
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
