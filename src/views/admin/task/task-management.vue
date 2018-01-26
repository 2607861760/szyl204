<style lang="scss" scope>
// 引入公共变量及方法
@import '~common/scss/public/base-url.scss';
.cont-main{
    width:100%;
    padding:15px 20px 30px;
    box-sizing:border-box;
    .table-btn{
        width:60px;
        height:28px;
    }
    .download,.dis-download{
        display: inline-block;
    }
    .el-button--primary{
        background:#4578ad;
    }
}
.cont-head {
    width:100%;
    padding:15px 20px;
    box-sizing:border-box;
    border-bottom: 20px solid #ECF0F5;
    .head {
        padding:10px;
        background:#f5f5f5;
        color:#666;
        &:hover {
            color:#3C8DBC;
        }
    }
}
.per-page {
    margin-top: 40px;
}
.cont-research {
    padding-bottom: 35px;
    padding-top:20px;
    .build {
        margin-left: 20px;
        padding:6px 20px;
    }
}

</style>
<template>
    <div calss="task">

        <Tabs type="card" @on-click="choice" >
            <TabPane label="罕见病"></TabPane>
            <TabPane label="癌症" class="tabcard"></TabPane>
        </Tabs>

        <div class="cont-research">
            <div style="float:left;">
                <Button type="primary" size="small" class="build" @click="build">
                  <Icon type="android-add"></Icon>
                  新建任务
                </Button>
            </div>
            <div style="float:right;">
                查询：
                <input type="text" style="margin-right:20px;height:30px;width:180px;"/>
            </div>
        </div>

        <div class="cont-main">
            <el-table :data="tableList" border default-expand-al="true" :height="height" >
                <el-table-column type="index" min-width="5%"></el-table-column>
                <el-table-column prop="samplecode" label="样本编号" min-width="10%">
                    <template slot-scope="scope">
                        <div style="color:#2D8cF0;cursor:pointer;" @click="routeChange(scope.row)">{{ scope.row.samplecode}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="file" label="文件名称" min-width="18%">
                    <template slot-scope="scope">
                       <tr style="white-space: nowrap; text-align: center;display:block;" v-for="list in scope.row.file" :key="list.id">{{list}}</tr>
                    </template>
                </el-table-column>
                <el-table-column prop="pipeline" label="流程" min-width="8%">
                </el-table-column>
                <el-table-column prop="createtime" label="创建时间" min-width="11%"></el-table-column>
                <el-table-column prop="spendtime" :formatter="foreignFlag" label="结束时间" min-width="10%"></el-table-column>
                <el-table-column prop="status" label="状态" min-width="10%">
                    <template slot-scope="scope">
                        <a href="javascript:;" class="bian" @click="clickStatus(scope.row)">{{ scope.row.status | foreignFlag}}
                        </a>
                        
                    </template>
                </el-table-column>
                <el-table-column prop="path" label="vcf文件下载" min-width="10%" v-if="this.$store.state.projectid==1">
                    <template slot-scope="scope">
                       
                         <a :href="'http://42.123.124.204:8081/dchealth-platform/1.0/data/vcfdownload?jobid='+scope.row.jobid" download class="download" v-if="scope.row.status==99">下载</a> 
                        <!-- <a :href="'http://10.131.101.159:8080/dchealth-platform/1.0/data/vcfdownload?jobid='+scope.row.jobid" download class="download" v-if="scope.row.status==99">下载</a> -->
                       
                        <a class="dis-download" href="javascript:;" download  disabled v-else>下载</a>
                    </template>
                </el-table-column>
                <el-table-column label="操作" min-width='15%'>
                    <template slot-scope="scope" @click="handlerBtn($event, scope.row)">
                        <Row>
                            <Col span="12" push="2">
                                <el-button size="small" v-if="scope.row.status==99 || scope.row.status==98" disabled>终止</el-button>
                                <el-button size="small" type="primary" name="stop"  @click="handlerBtn('stop', scope.row)" v-else>终止</el-button>
                            </Col>
                            <Col span="12" pull="2">
                                <el-button size="small" type="primary" name="remove"  @click="handlerBtn('remove', scope.row)">删除</el-button>
                            </Col>
                        </Row>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页 -->
            <div class="per-page">
                <el-pagination
                @size-change="handleSizeChanges"
                @current-change="handleCurrentChanges"
                :current-page="currentPage"
                :page-sizes="[50, 100, 200, 500, 1000]"
                :page-size="pageSizes"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
                </el-pagination>
            </div>
        </div>
        <!-- 删除模块提示框 -->
        <Modal v-model="removeModel" title="删除提示" width="300" :mask-closable="false">
            <p style="padding:20px;text-align:center;">您确定要删除这条任务吗？</p>
            <div class="fastq-footer">
                <Button size="small" type="primary" @click="saveInfoClick">确定</Button>
            </div>
        </Modal>

        <!-- 终止模块提示框 -->
        <Modal
            v-model="stopModel"
            title="终止提示" width="300" :mask-closable="false">
            <p style="padding:20px;text-align:center;">您确定要终止这条任务吗？</p>
            <div class="fastq-footer">
                <Button size="small" type="primary" @click="saveStopInfo">确定</Button>
            </div>
        </Modal>

        <!-- 新建任务 -->
        <Modal v-model="newModel" width="835px" :mask-closable="false" @on-cancel="closeModel">
            <div class="sample-title">新建任务</div>
            <div class="sample-main">
                <div class="stitle">
                    <span>请选择需要运行的样本批次：</span>
                    <Select style="width:50%;display:inline-block;" v-model="batchId" @on-change="changeSelect">
                        <Option v-for="item in batchlist" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </div>
                <div class="sample-inner">
                    <el-table :data="sampleList" @select="handleselect" @select-all="handleselectAll" style="width: 100%;">
                        <el-table-column type="selection" width="55" :selectable="selectable"></el-table-column>
                        <el-table-column label="样本编号" prop="samplecode" width="350"></el-table-column>
                        <el-table-column label="流程" prop="region" width="350"></el-table-column>
                    </el-table>
                    <div class="per-page" style="margin-top:10px;height:30px;">
                        <!-- <div style="float:left;">当前显示{{pageIndex*pageSize-19}}-{{pageIndex*pageSize}}条，共{{jobTotal}}条
                        </div> -->
                        <div style="float:right;">
                            <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleChangPage"
                            :current-page="pageIndexModel"
                            :page-sizes="[10, 20, 30, 40]"
                            :page-size="pageSize"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="jobTotal">
                            </el-pagination> 
                        </div> 
                    </div>
                </div>
                <div class="sample-footer">
                    <Button type="ghost" style="margin-left:205px;" @click="onCanel">取消</Button>
                    <Button type="primary" style="margin-left:0px;" @click="submitFormData" :disabled="disSubmit">提交</Button>
                </div>
            </div>
        </Modal>
        <!-- 执行失败错误提示框 -->
        <Modal v-model="failMassageModel" width="620" :mask-closable="false">
            <div class="sample-title">失败信息</div>
            <div align="center" style="font-size:20px;height:150px;line-height:150px;" class="sample-block">
                {{failMassage}}
            </div>
        </Modal>
    </div>
</template>
<script>
// 引入任务管理方法
import {
    task
} from 'api/index.js'
import {getCookie} from '@/common/js/cookie.js'
// 引入公共操作函数
import { editArrayRow, removeArrayRow } from 'common/js/Base.js';
// 组件实例
export default {
    name:"task",
    data() {
        return {
            currentPage:1,         //当前页数
            height:'500',
            more:'',
            routes:'',
            path:'',
            disSubmit:true, //提交按钮禁用
            loading:true,
            tableList: [],            // 表格数组
            openEditModel:false,      // 弹层显隐
            formInfo:{},              // 表单数据
            cookies:getCookie('userid'),             // cookies
            nowEditInfo:null,
            removeModel:false,        // 删除弹层
            stopModel: false,         // 终止
            btnType: null,
            pageIndexModel: 1,   // 弹层当前页
            pageSize: 20,
            pageSizes:50,
            pageIndex: 1,
            pageIndexs: 1,
            jobTotal: 0,      // 新建总数
            total: 0,
            newModel: false,    //新建任务弹层
            failMassageModel: false, //执行失败弹出窗
            failMassage: "",         //执行失败信息
            batchlist: [],      // 样本批次列表
            batchId: '',        // 批次选中项
            sampleList: [],     // 样本列表
            selectList: [],     // 样本选中项
            tabledata: [],
        }
    },
    // directives: {  //监听滚动
    //     scroll: {
    //         bind: function (el, binding){
    //             var ele=el.querySelector('.el-table__body-wrapper');
    //             ele.addEventListener('scroll', function(){
    //                 if(this.scrollTop + this.clientHeight >= this.scrollHeight) {
    //                     let fnc = binding.value; 
    //                     fnc();
    //                 }
    //             })
    //         }
    //     }
    // },
    watch: {
    },
    filters: {
        // 格式化数据
        foreignFlag(cellValue) {
            if(cellValue=='1'){
                return cellValue = "等待"
            }else if(cellValue=='2' || cellValue=='3') {
                return cellValue = "正在运行"
            }else if(cellValue=='99') {
                return cellValue = "运行完成"
            }
            else if(cellValue=='98') {
                return cellValue = "运行失败"
            }
        },
    },
    // 实例创建时
    created() {
        this.$store.state.projectid=1;
        this._getTaskList();      
    },
    methods: {
        //每页显示改变
        handleSizeChanges(val) {
            this.pageSizes=val;
            this._getTaskList();
        },
        //页码改变
        handleCurrentChanges(val) {
            this.pageIndexs=val;
            this._getTaskList();
        },
         // 点击状态
        clickStatus(row){
            console.log(row)
            this.$store.state.jobid=row.jobid;
            this.$store.state.file=row.file.join(',');
            this.$store.state.pip=row.pipeline;
            this.$router.push('/admin/process')
        },
        // tabs切换
        choice(name){
            console.log(name)
            this.$store.state.projectid=name+1;
            this._getTaskList(); 
            this.batchlist = [];
            this.sampleList = [];
            this.jobTotal = 0;
        },
        //点击样本编号
        routeChange(row){
            if(row.status==99){
                if(this.$store.state.projectid==1){
                    this.$router.push({path:'/admin/task-details?type=quality'})
                }else if(this.$store.state.projectid==2){
                    this.$router.push({path:'/admin/task-details-tumour?type=quality'})
                }
            }else if(row.status==98){
                this.$Message.error("该任务运行失败")
            }else{
                this.$Message.warning("该任务正在运行")
            }
            
        },
        //获取样本批次
        _getBatchList(){
            let obj={
                "userid":getCookie("userid"),
                "productId":this.$store.state.projectid
            }
            // 置空批次列表
            this.batchlist = [];
            task.getBatchList(obj).then((data)=> {
                // console.log(data)
                if(data.returnCode==0 || data.returnCode==200){
                    M.each(data.data,(item,index)=>{
                        var result={};
                        if(item){
                            result.value=item;
                            result.label=item;
                            this.batchlist.push(result); 
                        }
                    })
                } else if (data.returnCode == 422 || data.returnCode == 204) {
                    this.$router.push('/login')
                } else {
                    this.$Message.error(data.msg)
                }
            }).catch((error)=>{
                this.$Message.error(data.msg)
            })
        },
        // 样本批次改变
        changeSelect(val) {
            this.batchId = val;
            this.sampleList=[];
            this.jobTotal=0;
            // 获得样本列表
            if(this.batchId!=''){
                this.getSampleList();
            }
        },
        //根据样本批次，获取样本列表
        getSampleList(pageIndexModel=1){
            this.pageIndexModel = pageIndexModel;
            let obj={
                batchId:this.batchId,
                pageSize:this.pageSize,
                pageIndex:pageIndexModel,
                userid:getCookie('userid'),
                productId:this.$store.state.projectid
            }
            // console.log(obj);
            task.getSampleByBatchId(obj).then((data)=>{
                console.log(data)
                if (data.returnCode == 0 || data.returnCode == 200) {
                    if(data.data==null || data.data=="null"){
                        this.$Message.error(data.msg);
                        this.jobTotal=0;
                    }else {
                        this.sampleList = data.data.sampleList;
                        this.jobTotal = data.data.count; 
                    }
                } else if (data.returnCode == 422 || data.returnCode == 204) {
                    this.$router.push('/login')
                } else {
                    this.$Message.error(data.msg)
                }
                
            })
        },
        //是否可以勾选
        selectable(row,index){
            if(row.samplestatus==='0'){
                return 1;
            }else{
                return 0;
            }
        },
        //选择
        handleselect(val){
            console.log(val);
            M.each(val,(item,index)=>{
                this.selectList.push(item.sampleid);
            })
            if(val.length==0){
                this.disSubmit = true;
            }else{
                this.disSubmit = false;
            }
        },
        // 全选
        handleselectAll(val){
            M.each(val,(item,index)=>{
                this.selectList.push(item.sampleid);
            })
            if(val.length==0){
                this.disSubmit = true;
            }else{
                this.disSubmit = false;
            }
        },
        // 弹层关闭
        closeModel() {
            // 弹层关闭重置批次列表
            this.batchlist = [];
            this.sampleList = [];
            this.jobTotal = 0;
        },
        // 取消
        onCanel() {
            this.newModel = false;
            // 取消-弹层关闭重置批次列表
            this.batchlist = [];
            this.sampleList = [];
            this.jobTotal = 0;
        },
        //提交-成功后提交过得样本不可选
        submitFormData(){
            let obj={
                "sampleIds":this.selectList,
                'userId':getCookie('userid'),
                "productId":this.$store.state.projectid
            }
            console.log(obj);
            task.executeJobBySampleIds(obj).then((data)=>{
                console.log(data)
                if(data.returnCode==0 || data.returnCode==200){
                    // this.newModel=false;
                    // 提交完成清空数组
                    this.selectList = [];
                    // 提示信息
                    this.$Message.success(data.msg);
                    // 重新渲染样本列表
                    // this.getSampleList(this.pageIndex);
                    // 重新渲染列表
                    this._getTaskList();
                } else if (data.returnCode == 422 || data.returnCode == 204) {
                    this.$router.push('/login')
                } else {
                    this.$Message.error(data.msg)
                }
                
            })
        },
        //新建任务
        build(){
            this.newModel=true;
            this._getBatchList();
        },
        // 表格操作按钮
        handlerBtn(type,row) {
            this.nowEditInfo = M.clone(row) || {};
            // 设置当前操作类型
            this.btnType = type;
            if(type=="stop") {
                this.stopModel = true;
            }else if(type=="remove") {
                this.removeModel = true;
            }
        },
        // 删除
        saveInfoClick() {
            let isRemove = this.btnType === 'remove';
            // 需要删除的数据
            let idList = [];
            idList.push(this.nowEditInfo.jobid);
            let obj = {
                userId:this.cookies,
                idList:idList,
                productId:this.$store.state.projectid
            }; 
            // console.log(obj);  
            task.mergeJobById(obj).then((data) => {
                if (data.returnCode == 0 || data.returnCode == 200) {
                    if (isRemove) {
                        this._getTaskList();
                        this.removeModel = false;
                        this.$Message.success("删除成功！");
                    }
                } else if (data.returnCode == 422 || data.returnCode == 204) {
                    this.$router.push('/login')
                } else {
                    this.$Message.error(data.msg)
                }
            })
        },
        // 终止
        saveStopInfo() {
            let isStop = this.btnType === 'stop';
            let idList = [];
            idList.push(this.nowEditInfo.jobid);
            let obj = {
                userId:this.cookies,
                idList:idList,
                productId:this.$store.state.projectid
            }; 
            task.mergeStopJob(obj).then((data) => {
                if (data.returnCode == 0 || data.returnCode == 200) {
                    if (isStop) {
                        this._getTaskList();
                        this.stopModel = false;
                        this.$Message.success("终止任务成功！");
                    }
                } else if (data.returnCode == 422 || data.returnCode == 204) {
                    this.$router.push('/login')
                } else {
                    this.$Message.error(data.msg)
                }
            })
        },
        // 每页显示条数改变
        handleSizeChange(val){ 
            this.pageSize=val;
            // 每页显示条数改变
            this.getSampleList();
        },
        // 页码改变
        handleCurrentChange(val){ 
            this.pageIndex=val;
            console.log(this.pageIndex);
            this.getSampleList();
        },
        // 弹层页面改变
        handleChangPage(val) {
            this.pageIndexModel = val;
            console.log(this.pageIndexModel);
            // 页码改变后调用方法
            this.getSampleList(val);
        },
        // 获得表格数据
        _getTaskList() {
            let obj = {
                "pageIndex": this.pageIndexs,
                "pageSize": this.pageSizes,
                "userId":this.cookies,
                "productId":this.$store.state.projectid
            }
            console.log(obj)
            task.getTaskList(obj).then((data) => {
                console.log(data);
                if (data.returnCode == 0 || data.returnCode == 200) {
                    if (data.data == "null" || data.data == null) {
                        this.loading = false;
                        this.tableList = [];
                    } else {
                        this.total = data.data.count;
                        this.tableList=data.data.jobList;
                    }
                } else if (data.returnCode == 422 || data.returnCode == 204) {
                    this.$router.push('/login')
                } else {
                    this.$Message.error(data.msg)
                }
            }).catch((error)=> {
                this.$Message.success(error.msg);
            })
        },
        //格式化表格数据（结束时间）
        foreignFlag(row,column,cellValue) {
            console.log(typeof(cellValue));
            if(cellValue=='0'){
                return cellValue = "— —"
            }else if(cellValue !='0') {
                return cellValue = cellValue;
            }
        },
        //获取执行失败信息
        doGetJobError(row) {
            console.log(row);
            this.failMassageModel = true;
            let obj = {
                "userId": this.cookies,
                "jobId": row.jobid
            }
            task.getJobErrorById(obj).then((data) => {
                console.log(data);
                if (data.returnCode == 1) {
                    if (data.data == null || data.data == "") {
                        this.failMassage = "任务失败，请联系管理员！"
                    } else {
                        this.failMassage = data.data;
                    }
                }
            }).catch((error) => {
                this.failMassage = error.statusText;
            })
        }
    }
}
    
</script>