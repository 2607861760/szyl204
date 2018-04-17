<style lang="scss" scoped>
.tumour_page{
   h3{
        text-align:center;
        line-height:160px;
        height: 160px;
        font-size:20px;
        font-weight:400;
        color:#666;
    }
    .video_box {
        width: 100%;
        height: 349px;
        background: rgba(247, 247, 247, 1);
        .ivu-col {
            height: 349px;
        }
        video {
            margin-top: 50px;
        }
        embed{
            margin-top:50px;
        }
        span {
            width: 450px;
            text-align: center;
            display: block;
            height: 40px;
            line-height: 40px;
            color: #333;
        }
        p {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            margin: auto;
            line-height: 30px;
            height: 150px;
            font-size: 16px;
        }
    }
    /*数据库*/
    .data_lab{
        height:350px;
        .ad{
            display:inline-block;
            margin-top:20px;
            width:100%;
            span{
                display:inline-block;
                width:40px;
                height:40px;
                border-radius:50%;
                text-align:center;
                background:#1996cd;
                .ivu-icon{
                    color:#fff;
                    margin-top:7px;
                    font-size:25px;
                }
            }
            b{
                display:inline-block;
                width:230px;
                height: 40px;
                line-height:40px;
                font-weight:400;
                margin-left:20px;
                color:#333;
                font-size:16px;
                i{
                    font-style:normal;
                    color:#FF6600;
                    font-size:18px;
                    margin:0 2px;
                }
            }
        }    
    }
    /*应用场景*/
    .scen{
        height: 500px;
        background:rgba(247,247,247,1);
        .viewConent{
            width:1100px;
            height: 340px;
            margin:auto;
            .card{
                float:left;
                background:#ff0;
                height:200px;
                width:320px;
                margin:0 23px;
                position: relative;
                .card_op{
                    position: absolute;
                    width:320px;
                    height:200px;
                    background:rgba(25, 150, 205, 0.5);
                    p{
                        height: 60px;
                        line-height:60px;
                        color:#fff;
                        font-weight:700;
                        text-align:center;
                        font-size:18px;
                    }
                    span{
                        display:inline-block;
                        width:100%;
                        padding:0 20px;
                        font-size:16px;
                        color:#fff;
                        margin-top:30px;
                        line-height:20px;
                        width:100%;
                        text-align:center;
                        clear: both;
                    }
                }
                
            }  
            .card:nth-child(2){
                .card_op{
                    background:rgba(255, 102, 0, 0.5)
                }
            }
            .zszz {
                background: url('./img/zszz.png') no-repeat;
                background-size: cover;
            }
            .yyzd {
                background: url('./img/yyzd.png') no-repeat;
                background-size: cover;
            }
            .lxyc {
                background: url('./img/lxyc.png') no-repeat;
                background-size: cover;
            }
        }
    }
    /*患者全周期的服务**/
    .server{
        .server-content{
            width:1082px;
            height:564px;
            margin:0 auto;
            margin-bottom:30px;
            img{
                display:block;
                width:1082px;
                height:564px;
            }
        }
    }
}
</style>

<template>
    <div class="tumour_page">
        <!--视频播放区域-->
        <div class="video_box">
            <Row>
                <Col span="3"></Col>
                <Col span="9">
                    <video v-show="videoShow" width="450" height="248" :src="videoUrl" loop="loop" controls="controls"></video>
                    <embed v-show="!videoShow" src="https://imgcache.qq.com/tencentvideo_v1/playerv3/TPout.swf?max_age=86400&v=20161117&vid=k0631n7v0fl&auto=0" allowFullScreen="true" quality="high" width="450" height="248" align="middle" allowScriptAccess="always" type="application/x-shockwave-flash"></embed>
                    <span>肿瘤检测报告-demo</span>
                </Col>
                <Col span="9">
                    <p>癌症基因数据解读平台可完成肿瘤早期遗传筛查、靶向用药指导、化疗用药指导、预后分析及耐药位点监控等多方面基因数据解读，为临床医生治疗决策提供详实的、最新最权威的循证医学方案。</p>
                </Col>
                <Col span="3"></Col>
            </Row>
        </div>
        <!--数据库-->
        <div class="data_lab">
            <h3>数据库</h3>
            <Row type="flex" justify="center">
                <Col span="2"></Col>
                <Col span="6">
                    <div class="ad">
                        <div style="float:left"><span><Icon type="ios-upload-outline"></Icon></span></div>
                        <div style="float:left"><b>易感基因及药物代谢相关基因</b></div>
                    </div>
                    <div class="ad">
                        <div style="float:left"><span><Icon type="social-buffer-outline"></Icon></span></div>
                        <div style="float:left"><b>位点注释信息和药物注释信息</b></div>
                    </div>
                </Col>
                <Col span="6">
                   <div class="ad">
                        <div style="float:left"><span><Icon type="stats-bars"></Icon></span></div>
                        <div style="float:left"><b>SNP、CNV等变异类型</i></b></div>
                    </div>
                    <div class="ad">
                        <div style="float:left"><span><Icon type="clipboard"></Icon></span></div>
                        <div style="float:left"><b>治疗方案</b></div>
                    </div>
                </Col>
                <Col span="6">
                   <div class="ad">
                        <div style="float:left"><span><Icon type="stats-bars"></Icon></span></div>
                        <div style="float:left"><b>药物信息</b></div>
                    </div>
                </Col>
            </Row>
        </div>
        <!--应用场景-->
        <div class="scen">
            <h3>应用场景</h3>
            <div class="viewConent">
                <div class="card zszz">
                    <div class="card_op">
                        <p class="card-title">早筛早诊</p>
                        <span>遗传风险、高危环境、早期辅助诊断</span>
                    </div>
                </div>
                <div class="card yyzd">
                    <div class="card_op">
                        <p class="card-title">用药指导</p>
                        <span>分子分型、靶向药物、靶向化疗药物、药物敏感和毒副作用</span>
                    </div>
                </div>
                <div class="card lxyc">
                    <div class="card_op">
                        <p class="card-title">疗效预测</p>
                        <span>实时监测、耐药监测、复发转移监测</span>
                    </div>
                </div>
            </div>
        </div>
        <!--患者全周期的服务-->
        <div class="server">
            <h3>患者全周期的服务</h3>
            <div class="server-content">
                <img src="./img/server.png">
            </div>
        </div>
    </div>
</template>

<script>
import { data } from 'api/index.js';
export default {
    name: "tumourPage",
    data() {
        return {
            videoUrl: "",
            videoShow:true
        }
    },
    methods: {
        getVideoUrl() {
            let obj = {
                "productId": "2"
            }
            data.getPlayVideoPath(obj).then((data) => {
                if (data.returnCode == 0) {
                    if(data.data.path==null || data.data.path==""){
                        this.videoShow=false;
                    }else{
                        this.videoShow=true;
                        this.videoUrl = data.data.path;
                    }
                    
                }
            }).catch((error) => {
                this.videoShow = false;
                this.$Message.error(error.statusText);
            })
        }
    },
    mounted() {
        this.getVideoUrl();
    }
}
</script>
