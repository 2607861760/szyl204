<style lang="scss" scoped>
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
}
</style>
<template>
    <div class="basic_info">
        <div class="basic_info_title">
            <Icon type="android-list"></Icon>
            <span>样本信息</span>
        </div>
        <div style="padding-top:20px;">
            <el-table :data="samplelist" border style="width: 100%;" height="400" :highlight-current-row="true">
            <el-table-column label="样本编号" min-width="10%" >
                <template slot-scope="scope">
                    <span style="color:#3c8dbc;cursor:pointer;" @click="sam(scope.row)">{{ scope.row.samplecode }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="samplesource" label="样本类型" min-width="10%"></el-table-column>
            <el-table-column prop="sampletype" label="样本来源" min-width="10%"></el-table-column>
            <el-table-column prop="region" label="测序区域" min-width="10%"></el-table-column>
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
                        <span class="bian" @click="run(scope.$index,scope.row)" v-if="scope.row.isexecute==0">运行</span>
                        <span class="bian" @click="delet(scope.$index,scope.row)">删除</span>
                        <span class="bian" @click="edit(scope.$index,scope.row)">编辑</span>
                    </div>
                </template>
            </el-table-column>
        </el-table>
        <div style="padding-top:10px;padding-bottom:10px;">当前显示1-{{total}}条，共{{total}}条</div>
        </div>

        <!--新建样本/编辑-->
        <Modal width="835px" v-model="sampleModal" :mask-closable="false">
            <div class="sample-title">样本信息</div>
            <div class="sample-main">
                <div class="stitle">
                <Icon type="clipboard" style="font-size:22px;"></Icon>
                <span style="padding-left:5px;">样本信息（*为必填项）</span>
                </div>
                <div class="sample-inner">
                    <Form :model="sampleInfo" label-position="left" ref="sampleInfo" :label-width="110" inline :rules="ruleCustom">
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
                                <Upload multiple action="/dchealth-platform/1.0/upload/fileUpload" show-upload-list :data="{'sampleid':this.samid,'userId':userId,'type':'vcf'}" 
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
            <div class="sample-title">样本文件信息</div>
            <div class="sample-inner">
                <div style="padding:20px 10px;">
                    <el-table border align="left" :data="sampleDataList">
                        <el-table-column label="文件名称" prop="filename" min-width="150%"></el-table-column>
                        <el-table-column label="文件大小" prop="size" ></el-table-column>
                        <el-table-column label="上传时间" prop="uploaddate"></el-table-column>
                        <el-table-column label="状态"  prop="status" :formatter="statusFormatter"></el-table-column>
                    </el-table>
                </div>
            </div>
        </Modal>
        <!--删除确定-->
        <Modal v-model="removeModel" title="删除提示" width="300" :mask-closable="false">
            <p style="padding:20px;text-align:center;">您确定要删除这条信息吗？</p>
            <div class="fastq-footer">
                <Button size="small" type="primary" @click="saveInfoClick">确定</Button>
            </div>
        </Modal>
    </div>
</template>
<script>
import {data} from 'api/index.js'
import { filePath, httpUrl } from 'common/js/Base';
import treeGrid from '@/components/treeTable/vue2/TreeGrid'
import {getCookie} from '@/common/js/cookie.js'
export default {
    data(){
        return{
            samplelist: [],
            total:0,
            sampleModal:false,
            sampleInfo: {},
            ruleCustom: {
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
            takendate:'',
            receivedate:'',
            seqdate:'',
            sampletype: [{
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
            platform: [{
                value: 'Illumina',
                label: 'Illumina'
                }, {
                value: 'Ion Torrent',
                label: 'Ion Torrent'
            }],
            samplesource: [{
                value: '对照样本',
                label: '对照样本'
                }, {
                value: '肿瘤样本',
                label: '肿瘤样本'
            }],
            seqtype: [{
                value: 'DNA',
                label: 'DNA'
            }, {
                value: 'RNA',
                label: 'RNA'
            }],
            seqtarget: [{
                value: '点突变+插入缺失',
                label: '点突变+插入缺失'
            }, {
                value: '基因融合',
                label: '基因融合'
            }],
            uploadDisabled:true,
            upModal: false,
            tabsVal:'upload',
            samid:'',
            userId:'',
            loading:true,
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
                },
                {
                    text: '传输时间',
                    dataIndex: 'transition',
                    width:'10'
                }
            ],
            fileCategoryList: [],
            fileServerCategoryList:[],
            sampleshow:false,
            sampleDataList:[],
            removeModel:false,
        }
    },
    methods:{
        getList(){   //获取样本列表
            this.samplelist=[];
            let obj={
                "patientid":this.$store.state.patientInfo.patientId,
                "userId":getCookie("userid"),
                "productId":"2"
            }
            console.log(obj)
            data.getSampleList(obj).then((data)=>{
            console.log(data)
                if(data.returnCode==0 || data.returnCode==200){
                    if(data.data!=null || data.data!='null'){
                        this.samplelist=data.data;
                        this.total=data.data.length;
                    }
                }else if(data.returnCode==422 || data.returnCode==204){
                    this.$router.push('/login')
                }else{
                    this.$Message.error(data.msg);
                }
            })
        },
        keep(name){  //点击保存
            let obj={
                userId:getCookie("userid"),
                patientid:this.$store.state.patientInfo.patientId,
                productId:"2",
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
                            }else if(data.returnCode==422 || data.returnCode==204){
                                this.$router.push('/login')
                            }else{
                                this.$Message.error(data.msg)
                            }
                    
                        })
                    }else{
                        data.addSample(this.sampleInfo).then((data)=>{
                            if(data.returnCode==0 || data.returnCode==200){
                                if(data.data=="null"||data.data==null){
                                    this.$Message.error(data.msg);
                                }else{
                                    this.$Message.success(data.msg);
                                    this.uploadDisabled = false;
                                    this.getList();
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
        edit(index,row){  //点击编辑
            this.sampleid=row.sampleid;
            this.uploadDisabled = false;
            // this.$refs.tree.sid(row.sampleid);
            console.log(this.sampleid)
            this.sampleModal = true;
            this.upshow = true;
            this.sampleInfo=row;
        },
        delet(index,row){  //删除样本
            this.idList=[];
            this.idList.push(row.sampleid);
            this.removeModel=true;
        },
        run(index,row){  //点击运行
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
                "productId":"2",
                "pipeline": this.pipeline,
                "templateId": "0",
                "fileGroupId":"aa",
            }
            data.executeSample(obj).then((data)=>{
            if(data.returnCode==200 || data.returnCode==0){
                // 再次获取列表
                    this.getList();
                    this.$Message.success("添加成功")
                }else if(data.returnCode==422 || data.returnCode==204){
                    this.$router.push('/login')
                }else{
                this.$Message.error(data.msg)
            }
            })
        },
        sam(row){  //点击样本编号
            this.sampleshow=true; 
            this.getSampleList(row);
        },
        // 根据sampleId 获得对应数据
        getSampleList(row) {
            let obj = {
                userId: getCookie("userid"),
                sampleid:row.sampleid,
                productId: '2'
            }
            console.log(obj);
            data.getFileList(obj).then((data)=> {
                console.log(data);
                if(data.returnCode==0 || data.returnCode==200){
                    this.sampleDataList = data.data;
                }else if(data.returnCode==422 || data.returnCode==204){
                    this.$router.push('/login')
                }else{
                    this.$Message.error(data.msg)
                }
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
        // 上传失败
        uperror(error, file, fileList) {
            this.$Message.error(error.msg)
        },
        // 上传成功
        upsuccess(response, file, fileList) {
            if(response.returnCode==0){
                this.$Message.success(response.msg)
            }else if(response.returnCode==217){
                this.$Message.error(response.msg)
            }
        },
         //上传点击
        uploadSample(){  
            this.sampleModal = false;
            this.upModal = true;
            this.loading=true;
        },
        //关闭上传文件弹层清空数据
        clearData(){
            this.tabsVal='upload'
            this.fileCategoryList=[];
            this.fileServerCategoryList=[];
        },
        // tabs切换事件
        serverlocal(name){  //serverlocal
            if(name=='local') {
                this._getLocalDataList();
            }else if(name=='server') {
                this._getServerDataList();
            }
        },
    },
    mounted(){
        this.getList();
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
    }
}
</script>



