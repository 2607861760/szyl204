<style lang="scss">
.upload {
    padding: 10px 10px 30px;
    background: #fff;
    border-radius: 3px;
    .ivu-btn {
        background: #767cc3;
        padding: 6px 20px;
        color: #fff;
    }
}

.fun {
    span {
        color: #3c8dbc;
        padding-right: 10px;
        font-size: 12px;
        cursor: pointer;
    }
}

</style>
<template>
<div class="sample-info">
    <Dropdown style="margin-left:20px;">
        <Button type="primary" class="build" @click="found">
            <Icon type="android-add"></Icon>
            添加样本
        </Button>
    </Dropdown>
    <Dropdown v-if="finishBtnShow" style="float:right;margin-right:20px;">
        <Button type="primary" class="build" @click="finish">
        <Icon type="android-done"></Icon>
        	完成
    	</Button>
    </Dropdown>
    <div style="width:100%;padding:15px 20px;box-sizing:border-box;">
        <el-table :data="samplelist" border style="width: 100%;" height="250" v-loading="listload" :highlight-current-row="true">
            <el-table-column label="样本编号" min-width="10%">
                <template slot-scope="scope">
                    <span style="color:#3c8dbc;cursor:pointer;" @click="clickSample(scope.row)">{{ scope.row.samplecode }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="sampletype" label="样本类型" min-width="10%"></el-table-column>
            <el-table-column prop="region" label="测序区域" min-width="10%"></el-table-column>
            <el-table-column prop="designator" label="亲属关系" min-width="10%"></el-table-column>
            <el-table-column label="文件状态" width="200">
                <template slot-scope="scope">
                    <!-- <div v-for="(list,index) in scope.row"  style="height:40px;"> -->
                        <Poptip  placement="bottom-end" v-if="scope.row.fastq_R1!=null" width="300">
                            <div slot="content" style="height: 80px;word-wrap: break-word;text-align: left;">
                                {{scope.row.fastq_R1}}
                            </div>
                            <div class="imgbox">
                                <div class="fastq_R1_on" ></div>
                            </div>
                        </Poptip>
                        <div class="imgbox" v-else>
                            <div class="fastq_R1_off"></div>
                        </div>
                        <Poptip  placement="bottom-end" v-if="scope.row.fastq_R2!=null " width="300">
                            <div slot="content" style="height: 80px;word-wrap: break-word;text-align: left;">
                                {{scope.row.fastq_R2}}
                            </div>
                            <div class="imgbox">
                                <div class="fastq_R2_on" ></div>	
                            </div>
                        </Poptip>
                        <div class="imgbox" v-else>
                            <div class="fastq_R2_off"></div>
                        </div>
                        <Poptip  placement="bottom-end" v-if="scope.row.vcf!=null" width="300">
                            <div slot="content" style="height: 80px;word-wrap: break-word;text-align: left;">
                                {{scope.row.vcf}}
                            </div>
                            <div class="imgbox">
                                <div class="vcf_on" ></div>
                            </div>
                        </Poptip>
                        <div class="imgbox" v-else>
                            <div class="vcf_off"></div>
                        </div>
                        <Poptip placement="bottom-end" v-if="scope.row.etcFiles!=null " width="300">
                            <div class="imgbox">
                                <div class="etc_on" ></div>
                            </div>
                            <div  slot="content">
                                <table>
                                    <tbody>
                                        <tr v-for="(item,index) in scope.row.etcFiles" :key="index" style="height:60px;word-wrap: break-word;text-align: left;">
                                            {{item}}
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </Poptip>
                        <div class="imgbox" v-else>
                            <div class="etc_off"></div>
                        </div>
                    <!-- </div> -->
                </template>
            </el-table-column>
            <el-table-column label="状态" min-width="10%">
                <template slot-scope="scope">
                    <div class="handle">
                        <span class="status">{{scope.row.samplestatus | dataFormat}}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="操作" min-width="20%">
              <template slot-scope="scope">
                  <div class="handle">
                    <button class="bian" style="border:none;background:none;color:#ccc;padding: 0px 10px;" disabled @click="run(index,scope.row)" v-if="scope.row.samplestatus=='0'||scope.row.samplestatus=='5'">运行</button>
                    <span class="bian" @click="run(index,scope.row)" v-else-if="scope.row.samplestatus=='6'">运行</span>
                    <span class="bian" @click="delet(scope.$index,scope.row)">删除</span>
                    <span class="bian" @click="edit(scope.$index,scope.row)">编辑</span>
                  </div>
              </template>
            </el-table-column>
        </el-table>
        <div>当前显示1-{{total}}条，共{{total}}条</div>
    </div>
    <!--新建样本/编辑-->
    <Modal width="835px" v-model="sampleModal" :mask-closable="false" @on-cancel="closeModal">
        <div class="sample-title">样本信息</div>
        <div class="sample-main">
            <div class="stitle">
                <Icon type="clipboard" style="font-size:22px;"></Icon>
                <span style="padding-left:5px;">样本信息（*为必填项）</span>
            </div>
            <div class="sample-inner">
                <Form :model="sampleInfo" ref="sampleInfo" label-position="left" :label-width="100" inline :rules="ruleCustom">
                    <Row>
                        <Col class="tables">
                            <FormItem label="样本编号" style="width:30%;" prop="samplecode">
                                <Input v-if="sampleEditType==0" v-model.trim="sampleInfo.samplecode"></Input>
                                <Input v-else-if="sampleEditType==1" disabled v-model="sampleInfo.samplecode"></Input>
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
                                <Select v-model="sampleInfo.seqtype" >
                                    <Option v-for="item in seqtype" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                </Select>
                            </FormItem>
                        </Col>
                        <Col class="tables">
                            <FormItem label="样本批次" style="width:30%;">
                                <Input v-model="sampleInfo.samplebatch"></Input>
                            </FormItem>
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
                        <Button type="primary" @click="uploadSample" :disabled="uploadDisabled">上传</Button> 
                    </div>
                </Col>
            </Row> 
        </div>
    </Modal>
    <!--文件上传-->
    <Modal width="835px" v-model="upModal" :mask-closable="false" @on-cancel="clearData">
        <div class="sample-title">文件上传</div>
        <div class="upload">
            <Col span="24" class="demo-tabs-style2">
                <Tabs type="card" @on-click="serverlocal" v-model="tabsVal">
                    <TabPane label="upload" name="upload">
                        <div>
                            <Upload multiple action="/dchealth-platform/1.0/upload/fileUpload" show-upload-list :data="{'sampleid':this.samid,'userId':this.userId,'type':'vcf'}" 
                                :on-success="upsuccess" :on-error="uperror"> 
                                <Button type="ghost" style="background:#4578ad;">上传文件</Button>
                            </Upload>
                        </div>
                    </TabPane>
                    <TabPane label="harddisk" name="local">
                        <div style="width:100%;">
                            <tree-grid :columns="columns" v-loading="loading" ref="tree" :tree-structure="true" :data-source="fileCategoryList" :requestUrl="samid">
                            </tree-grid>
                        </div>
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
    <!--样本文件信息-->
    <Modal width="835px" v-model="sampleshow" :mask-closable="false">
        <div class="sample-title">
            样本文件信息:
            <span>{{sampcode}}</span>
        </div>
        <div class="sample-inner">
            <div style="padding:20px 10px;">
                <el-table border aligin="left" :data="sampleDataList">
                    <el-table-column label="文件名称" prop="filename" min-width="150%"></el-table-column>
                    <el-table-column label="文件大小" prop="size" ></el-table-column>
                    <el-table-column label="上传时间" prop="uploaddate"></el-table-column> 
                    <el-table-column label="状态"  prop="status" :formatter="statusFormatter"></el-table-column>
                </el-table>
            </div>
        </div>
    </Modal>
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
import {filePath} from 'common/js/Base';
import {data} from 'api/index.js'
import treeGrid from '@/components/treeTable/vue2/TreeGrid'
import {getCookie} from '@/common/js/cookie.js'
export default{
    name: "samplelist",
    props:["flag"],
    data(){
        return {
            finishBtnShow:true, //是否显示完成按钮
            userId:getCookie("userid"),  //存放userid
            sampleDataList: [],        // 样本列表弹层
            uploadDisabled:true,
            enrichmentkitId:'',        // ek
            platformId:'',             // 测序平台
            takendate:'',    //取样日期
            receivedate: '',  //收样日期
            seqdate: '',   //测序日期
            sampleEditType:0, //样本编辑状态 0，添加状态 1：修改状态
            listload:true,
            ptid:'',
            total:0,
            loading:true,
            sampleid:"",
            samid:'',
            sampcode:'',
            sampleModal:false,
            change: true,
            sampleshow:false,
            samplelist: [],
            upModal: false,
            upshow:false,
            fastq:false,
            sampleModal: false,
            choice:[],
            choices:[],
            fileCategoryList: [],
            fileServerCategoryList:[],            // 服务上传
            columns: [
                  {
                      text: '文件名称',
                      dataIndex: 'filename',
                      width:'40%'
                  },
                  {
                      text: '文件大小',
                      dataIndex: 'size',
                      width:'10'
                  }
              ],
            sampleInfo: {},
            sampletype: [{
                value: '血样',
                label: '血样'
              }, {
                  value: '肿瘤活检',
                  label: '肿瘤活检'
              }, {
                  value: '口腔',
                  label: '口腔'
            }],
            designator: [{
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
            region: [{
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
            platform: [],
            pipeline:'',
            enrichmentkit: [],
            seqtype: [{
                value: 'DNA-Seq',
                label: 'DNA-Seq'
              }, {
                value: 'RNA-Seq',
                label: 'RNA-Seq'
            }],
            ruleCustom: {
              samplecode: [
                  { required: true, message: '样本编号不能为空', trigger: 'blur' }
              ],
              designator: [
                  { required: true, message: '亲属关系不能为空', trigger: 'blur' }
              ],
              region:[
                  {required: true, message: '测序区域不能为空', trigger: 'blur' }
              ]
            },
            idList:[],
            removeModel:false,
            tabsVal:'upload'
        }
    },
    watch:{
        "sampleInfo.samplecode":function(val,oldval){
            this.sampleInfo.samplecode=val.replace(/\s|\xA0/g,"");
        }
    },
    methods: {
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
        //关闭上传文件弹层清空数据
        clearData(){
            this.tabsVal='upload'
            this.fileCategoryList=[];
            this.fileServerCategoryList=[];
            this.uploadDisabled=true;
        },
        //关闭新建样本模态框
        closeModal(){
            this.takendate="";
            this.receivedate="";
            this.seqdate="";
            this.platformId="";
            this.enrichmentkitId="";
            this.uploadDisabled=true;
            this.$refs.sampleInfo.resetFields();
        },
        // 上传成功
        upsuccess(response, file, fileList) {
            if(response.returnCode==0){
                this.$Message.success(response.msg)
            }else if(response.returnCode==217){
                this.$Message.error(response.msg)
            }else if(response.returnCode==422 || response.returnCode==204){
                this.$router.push('/login')
            }
        },
        finish(){//点击完成
        	this.$router.push('/admin');
        },
        // 上传失败
        uperror(error, file, fileList) {
            this.$Message.error(error.msg)
        },
        handleChecked(value){
            this.choice=value;
        },
        saveInfoClick(){  //删除确定
            let obj={
                "idList":this.idList,
                "userId":getCookie('userid'),
                "productId":"1"
            }
            data.deleteSampleById(obj).then((data)=>{
                if(data.returnCode==0 || data.returnCode==200){
                    this.$Message.success(data.msg);
                    this.removeModel=false;
                    this.getList();
                }else if(data.returnCode==422 || data.returnCode==204){
                    this.$router.push('/login')
                }else{
                    this.$Message.error(data.msg);
                    this.removeModel=false;
                    this.getList();
                }
            })
        },
        delet(index,row){  //删除样本 
            this.idList=[];
            this.idList.push(row.sampleid);
            this.removeModel=true;
            console.log(this.idList)
        },
        run(index,row){  //点击运行
            // this.fastq=true;
            this.samid=row.sampleid;
            this.pipeline=row.region;
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
            let obj={
                "sampleId":this.samid,
                "userId":getCookie("userid"),
                "productId":"1",
                "pipeline": this.pipeline,
                "templateId": "0",
                "fileGroupId":"aa",
            }
            console.log(obj)
            data.executeSample(obj).then((data)=>{
                console.log(data)
                if(data.returnCode==200 || data.returnCode==0){
                    this.$Message.success("添加成功");
                    this.getList();
                }else if(data.returnCode==422 || data.returnCode==204){
                    this.$router.push('/login')
                }else{
                    this.$Message.error(data.msg)
                }
            }) 
        },
        pull(){ //获取下拉列表
            let obj={
                "userId":getCookie("userid"),
                "productId":"1"
            }
            data.getTGexPara(obj).then((data)=>{
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
            })
        },
        found(){ //点击新建样本
            this.upshow = false;
            this.sampleEditType=0;
            this.sampleModal=true;
            this.sampleInfo={};
            this.pull();
        },
        //点击样本编号
        clickSample(row){  
            // console.log(row);
            this.sampcode=row.samplecode;
            this.sampleshow=true; 
            // 调用方法
            this.getSampleList(row);
        },
        // 根据sampleId 获得对应数据
        getSampleList(row) {
            this.sampleDataList=[];
            let obj = {
                userId: getCookie("userid"),
                sampleid:row.sampleid,
                productId: '1'
            }
            console.log(obj);
            data.getFileList(obj).then((data)=> {
                if(data.returnCode==0 || data.returnCode==200){
                    if(data.data!=null || data.data!='null'){
                        this.sampleDataList = data.data;
                    }
                }else if(data.returnCode==422 || data.returnCode==204){
                    this.$router.push('/login')
                }else{
                    this.$Message.error(data.msg)
                }
                
            })
        },
        keep(name){  //点击保存
            let obj={
                userId:getCookie("userid"),
                patientid:this.$store.state.patientInfo.patientId,
                productId:"1",
                enrichmentkit:this.enrichmentkitId,
                platform:this.platformId,
                takendate:String(this.takendate),
                receivedate:String(this.receivedate),
                seqdate:String(this.seqdate)
            }
            M.extend(this.sampleInfo,obj)
            this.$refs[name].validate((valid) => {
                if(valid){
                    if(M.has(this.sampleInfo,'sampleid')==true){
                        data.updateSample(this.sampleInfo).then((data)=>{
                            if(data.returnCode==0 || data.returnCode==200){
                                this.$Message.success(data.msg);
                                this.uploadDisabled = false;
                                this.getList();
                                this.listload = false;
                            }else if(data.returnCode==422 || data.returnCode==204){
                                this.$router.push('/login')
                            }else{
                                this.$Message.error(data.msg);
                            }
                        })
                    }else{
                        data.addSample(this.sampleInfo).then((data)=>{  
                            console.log(data.returnCode)
                            if(data.returnCode==0 || data.returnCode==200){
                                if(data.data!="null"||data.data!=null){
                                    this.$Message.success(data.msg);
                                    this.uploadDisabled = false;
                                    this.getList();
                                    this.listload = false;
                                    this.samid=data.data.sampleid;
                                }
                            }else if(data.returnCode==422 || data.returnCode==204){
                                this.$router.push('/login')
                            }else{
                                this.$Message.error(data.msg);
                            }      
                            
                        })
                    }           
                }
            })
        },
        edit(index,row){  //点击编辑
            // console.log(row);
            this.pull();
            // this.sampleid=row.sampleid;
            this.samid=row.sampleid;
            this.sampleEditType=1;
            if(row.samplebatch){
                if(row.samplebatch == 0){
                    row.samplebatch="";
                }
            }
            this.enrichmentkitId= row.enrichmentkit;      
            this.platformId= row.platform;
            this.sampleModal = true;
            this.upshow = true;
            this.sampleInfo=row;
            this.takendate=row.takendate;
            this.receivedate=row.receivedate;
            this.seqdate=row.seqdate;
            // console.log(this.sampleInfo)
        },
        // tabs切换事件
        serverlocal(name){  //serverlocal
            if(name=='local') {
                this._getLocalDataList();
            }else if(name=='server') {
                this._getServerDataList();
            }
        },
        //上传点击
        uploadSample(){  
            this.sampleModal = false;
            this.upModal = true;
            this.loading=true;
        },
        // 获得服务
        _getServerDataList() {
            let obj={
                "path": filePath.path.server,
                "userId":getCookie("userid"),
                "productId":"1",
                "type":"2"
            }
            data.getSingleForldList(obj).then((data)=>{
                if(data.returnCode==0 || data.returnCode==200){
                    if(M.isArray(data.data)) {
                        this.fileServerCategoryList=data.data;
                    }
                }else if(data.returnCode==422 || data.returnCode==204){
                    this.$router.push('/login')
                }else{
                    this.$Message.error(data.msg)
                }
            })
        },
        // 获得本地
        _getLocalDataList(){
            let obj={
                "path": filePath.path.local, 
                "userId":getCookie("userid"),
                "productId":"1",
                "type":"2"
            }
            data.getSingleForldList(obj).then((data)=>{
                // console.log(data)
                if(data.returnCode==0 || data.returnCode==200){
                    if(M.isArray(data.data)) {
                        this.fileCategoryList=data.data;
                        
                    }
                    this.loading=false;
                }else if(data.returnCode==422 || data.returnCode==204){
                    this.$router.push('/login')
                }else{
                    this.$Message.error(data.msg)
                    this.loading=false;
                }
            })
        },
        getList(){   //获取样本列表
            this.enrichmentkit=[]
            this.platform=[]
            this.listload=true;
            this.samplelist=[]
            let obj={
                "patientid":this.$store.state.patientInfo.patientId,
                "userId":getCookie("userid"),
                "productId":"1"
            }
            data.getSampleList(obj).then((data)=>{
                console.log(data)
                this.listload=false;
                if(data.returnCode==0 || data.returnCode==200){
                    
                    if(data.data && data.data.length>0){
                        this.samplelist=data.data;
                        this.total=this.samplelist.length;
                        console.log(this.samplelist);
                    }
                }else if(data.returnCode==422 || data.returnCode==204){
                    this.$router.push('/login')
                }else{
                    this.$Meesage.error(data.msg)
                }
            })
        }
    },
    mounted(){
      this.getList();
      if(this.flag && this.flag==1){
            this.finishBtnShow=false;
        }
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
    components:{
        treeGrid,
        // creatsample
    }
}
</script>