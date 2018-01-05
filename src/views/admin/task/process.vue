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
            margin-left:150px;
        }
    }
    .process-mid {
        padding-top: 10px;
        padding-bottom: 30px;
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
                <Row :gutter="16">
                    <Col pull="1" span="2">文件名称:</Col>
                    <Col pull="1" span="2"><div style="white-space:nowrap;">{{file}}</div></Col>
                </Row>
                <Row>
                    <div class="process-mid">
                        <Col pull="1" span="2">运行流程:</Col>
                        <Col pull="1" span="2">{{pipeline}}</Col>
                    </div>
                </Row>
                <Row v-show="errorShow">
                    <div>
                        <Col pull="1" span="2">错误日志:</Col>
                        <Col pull="1" span="2">
                            <el-button type="primary" size="small" style="background:#4578ad;border-color: #4578ad;">下载错误日志</el-button>
                        </Col>
                    </div>
                </Row>
                <Row>
                    <Col pull="1" span="2">运行状态:</Col>
                    <Col pull="4" span="20">
                        <div class="process-ver"> 
                            <Steps :current="currentStatus" direction="vertical" :status="runStatus">
                                <Step v-for="(item,index) in processData" :key="index" :title="item.execTool" :content="item.status | statusFlag ">
                                </Step>
                            </Steps>
                        </div>
                    </Col>
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
            //  jobid
            url:M.url(), 
            // 当期状态
            currentStatus: -1, 
            // 文件名称
            file:M.url().file,
            // 流程
            pipeline:M.url().pip,
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
        statusFlag(cellValue) {
            if(cellValue=='1'){
                return cellValue = "完成"
            }else if(cellValue=='2') {
                return cellValue = "正在运行"
            }else if(cellValue=='3') {
                return cellValue = "未执行"
            }else if(cellValue=='4') {
                return cellValue = "错误"
            }
        },
    },
    methods: {
        // 获取运行流程列表
        getCurrentStep() {
            let obj = {
                // jobid:this.url.jobid,
                jobid:"a3e8c87a17584802b4817da2b1325537",
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