<style lang="scss" scope>
// 引入公共变量及方法
@import '~common/scss/public/base-url.scss';
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
.process {
    .process-cont {
        background:#fff;
        overflow: hidden;
    }
    .process-step {
        margin-left:150px;
        padding-top:15px;
        .process-ver {
            margin-left:80px;
        }
    }
    .process-mid {
        padding-top: 10px;
        padding-bottom: 10px;
    }
}
.process-cont {
    .process-head {
        border-bottom: 1px solid #f1f1f1;
        p {
            padding: 10px 30px;
        }
    }
}
</style>
<template>
    <div class="process">
        <div class="cont-head">
            <div class="head">
                <Row>
                    <Col span="24">流程监控</Col>
                </Row>
            </div>
        </div>
        <div class="process-cont">
            <div class="process-head">
                <p>任务名称</p>
            </div>
            <div class="process-step">
                <Row>
                    <div style="width:80px;float:left;">文件名称:</div>
                    <div style="width:100%;"><div style="white-space:nowrap;">{{file}}</div></div>
                </Row>
                <Row>
                    <div class="process-mid">
                        <div style="width:80px;float:left;">运行流程:</div>
                        <div style="width:100%;">{{pipeline}}</div>
                    </div>
                </Row>
                <Row v-show="errorShow">
                    <div style="padding-bottom:10px;">
                        <div style="width:80px;float:left;">错误日志:</div>
                        <div style="width:100%;">
                            <!-- <a :href="'http://10.131.101.159:8080/dchealth-platform/1.0/job/errorLogFileDownload?jobid='+this.$store.state.jobid" download class="download" style="padding:5px 15px;">下载错误日志</a> -->
                             <a :href="'http://42.123.124.204:8081/dchealth-platform/1.0/job/errorLogFileDownload?jobid='+this.$store.state.jobid" download class="download" style="padding:5px 15px;">下载错误日志</a> 
                        </div>
                    </div>
                </Row>
                <Row>
                    <div style="width:80px;float:left;">运行状态:</div>
                    <div style="width:100%;">
                        <div class="process-ver"> 
                            <Steps :current="currentStatus" direction="vertical" :status="runStatus">
                                <Step v-for="(item,index) in processData" :key="index" :title="item.execTool" :content="item.errorInfo ">
                                </Step>
                            </Steps>
                        </div>
                    </div>
                </Row>
            </div>
            
        </div>
        
    </div>
</template>
<script>
// 引入任务管理方法
import {task} from 'api/index.js'
import {getCookie} from '@/common/js/cookie.js'
export default {
    name:"process",
    data() {
        return {
            // 流程数据 
            processData: [],
            // 当期状态
            currentStatus: -1, 
            // 文件名称
            file:this.$store.state.file,
            // 流程
            pipeline:this.$store.state.pip,
            //运行错误
            runStatus:'process',
            //错误下载显示
            errorShow:false,
        }
    },
    // 实例创建时
    created() {
        this.getCurrentStep()
    },
    watch: {

    },
    filters: {
        // 格式化数据
        // statusFlag(cellValue) {
        //     if(cellValue=='1'){
        //         return cellValue = "完成"
        //     }else if(cellValue=='2') {
        //         return cellValue = "正在运行"
        //     }else if(cellValue=='3') {
        //         return cellValue = "未执行"
        //     }else if(cellValue=='4') {
        //         return cellValue = "错误"
        //     }
        // },
    },
    methods: {
        // 获取运行流程列表
        getCurrentStep() {
            let obj = {
                jobid:this.$store.state.jobid,
                // jobid:"a3e8c87a17584802b4817da2b1325537",
                userId:getCookie('userid')
            }
            task.getCurrentStep(obj).then((data)=> {
                console.log(JSON.stringify(data));
                if(data.returnCode==0 || data.returnCode==200){
                    this.processData = data.data.execTools;
                    console.log(this.processData)
                    // 设置当前正在执行的状态
                    M.each(this.processData,(item,index)=> {
                        if(item.status==4) {
                            this.currentStatus= Number(index);
                            this.runStatus="error";
                            this.errorShow=true;
                        }else if(item.status==2){
                            this.currentStatus= Number(index);
                        }
                    })
                }else if(data.returnCode==422 || data.returnCode==204){
                    this.$router.push('/login')
                }else{
                    this.$Message.error(data.msg)
                }
            }) 
        }
    }
}
    
</script>