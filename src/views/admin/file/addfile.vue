    <style lang="scss">
    .filesup{
        background:#3C3F60;
        width:100%;
        height:50px;
        color:#fff;
        font-size:16px;
        line-height:50px;
        text-indent:1.5em;
    }
    .fileshow{
        padding:0px 20px 10px;
    }
    .allfile{
        margin-top:20px;
    }
    .newname{
        padding-top:20px;
        padding-bottom:20px;
        text-align:center;
        font-size:16px;
    }
    </style>
    <template>
    <div class="file-upload">
        <div class="filesup">批量上传</div>
        <div style="padding:20px;"><span style="cursor:pointer;" @click="back"><&nbsp;&nbsp;批量添加</span>
        <div style="float:right;">
            <Button type="primary" @click="upstart" :disabled="updisabled">开始上传</Button>
        </div>
    </div>
    
    <div class="allfile fileshow">
    <el-table ref="multipleTable" :data="sampleDataWithExcel" border tooltip-effect="dark" style="width: 100%" 
    align="left"  @select-all="handleSelectionAll" @select="handleSelection" >
        <el-table-column type="selection" width="55" :selectable="selectable"> </el-table-column>
        <el-table-column label="文件名称" prop="samplecode">
        <template slot-scope="scope">
        {{scope.row.filename}}
        </template>
        </el-table-column>
        <el-table-column label="样本编号"  prop="samplecode"> </el-table-column>
        <el-table-column label="病人编号"  prop="patientcode"> </el-table-column>
        <el-table-column min-width="80%" >
        <template slot-scope="scope">
            <div>
                <Button type="primary" size="small" style="padding:3px 20px;" v-if="scope.row.execelDataEnum =='keExecelDataType_FILE_EXIST'" @click="rename(scope.row)">重命名</Button>
                <Button type="ghost" size="small" style="margin-left:10px;padding:3px 24px;" v-if="scope.row.execelDataEnum =='keExecelDataType_FILE_EXIST'" @click="cover(scope.row)">覆盖</Button>
            </div>
        </template>
        </el-table-column>
    </el-table>
    </div>
    <Modal width="500px" v-model="reName" :mask-closable="false">
    <div class="sample-title">重命名</div>
    <div class="newname">
        <div>
            <span>原文件名</span>
            <input type="text" v-model="nowname"/>
        </div>
        <div style="margin-top:10px;">
            <span>新文件名</span>
            <input type="text" v-model="newname"/>
        </div>
        <div>
            <Button type="primary" size="small" @click="confirm" style="margin-top:20px;">确定</Button>
        </div>
    </div>
    </Modal>
    </div>
    </div>
    </template>
    <script>
    import {getCookie} from '@/common/js/cookie.js'
    import {data} from 'api/index.js'
    export default{
        name:'addfile',
        data(){
            return{
                loading:true,
                newname:'',
                nowname:'',
                reName:false,
                show:false,
                allfile:[],
                excelList:[],  //选择数据
                sampleDataWithExcel:[],  //当前表格数据
                saplist:[],
                updisabled:false,  //上传按钮禁用
            }
        },
        methods:{
            selectable(row,index){
                if(row.execelDataEnum =='keExecelDataType_FILE_EXIST'){
                    return 0
                }else{
                    return 1
                }
            },
            confirm(){  //确定
                if(this.newname!=''){
                    this.saplist.filename=this.newname;
                    this.reName=false;
                    this.newname="";
                }
                // else{
                //     this.$Message.error('请重命名')
                // }
            },
            cover(row){  //覆盖
                row.execelDataEnum ="keExecelDataType_FILE_OVERWRITE";
                this.$Message.success("已覆盖")
            },
            rename(row){  //重命名
                row.execelDataEnum = "keExecelDataType_SAMPLE_EXIST";
                this.reName=true;
                this.nowname=row.filename;
                this.saplist=row;
            },
            handleSelection(val) {  //选择
                this.excelList=val;
            },
            handleSelectionAll(val){ //全选
                this.excelList=val;
            },
            back(){  //后退
                this.$router.push('/admin/fileup');
            },
            upstart(){  //开始上传
                this.loading=false;
                this.updisabled=true;
                let obj={
                    "excelList":this.excelList,
                    "userId":getCookie("userid"),
                    "productId":this.$store.state.projectid
                }
                if(this.excelList.length>0){
                    data.uploadExcelFile(obj).then((data)=>{
                        console.log(data.data)
                        if(data.returnCode==0 || data.returnCode==200){
                            this.$Message.success(data.msg);
                            if(this.$store.state.projectid=="1"){
                                this.$router.push('/admin')
                            }else if(this.$store.state.projectid=="2"){
                                this.$router.push('/admin/tumour')
                            }
                        }else if(data.returnCode==422 || data.returnCode==204 ){
                            this.$router.push('/login')
                        }else{
                            this.$Message.error(data.msg);
                        }
                        this.loading=true;
                        this.updisabled=false;
                    }).catch((error)=>{
                        this.updisabled=false;
                        this.$Message.error(error.statusText);
                    })
                }else{
                    this.updisabled=false;
                    this.$Message.error('请选择需要上传的文件');
                }
                
            }
        },
        mounted(){  //加载数据列表
            this.allfile.length=0;
            this.allfile=this.$store.state.allfile;
            let len=this.allfile.length;
            for(var i=0;i<len;i++){
                this.sampleDataWithExcel.push(this.allfile[i].sampleDataWithExcel)
            }
        }
    }
    </script>