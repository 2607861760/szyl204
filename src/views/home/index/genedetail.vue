<style lang="scss" scoped>
.gene_page{
    .video_box{
        width:100%;
        margin:auto;
        height: 349px;
        background:rgba(247,247,247,1);
        .v-box{
            width:1200px;
            height:349px;
            margin:auto;
            .fl{
                float:left;
            }
            .v_show_box{
                width:450px;
                margin-left:20px;
            }
            .v_show_title{
                width:650px;
                margin-left:80px;
                height:349px;
                position: relative;
                p{
                    position: absolute;
                    top:0;
                    left: 0;
                    right:0;
                    bottom:0;
                    margin:auto;
                    line-height:30px;
                    height:200px;
                    font-size:16px;
                }
            }
        }
        .ivu-col{
            height: 349px;
        }
        video{
            margin-top:50px;
            background:#000;
        }
        embed{
            margin-top:50px;
            background:#000;
        }
        span{
            width:450px;
            text-align:center;
            display:block;
            height:40px;
            line-height:40px;
            color:#333;
        }
    }
    .advantage{
        width:100%;
        height: 450px;
        padding-top:30px;
        background:#fff;
        .ad_content{
            width:1100px;
            margin:0 auto;
        }
        .ivu-col{
            height: 349px;
        }
        h3{
            margin-top:20px;
            text-align:center;
            font-size:20px;
            font-weight:800;
            color:#666;
            margin-bottom:30px;
        }
        .ad{
            display:inline-block;
            margin-top:20px;
            width:100%;
            span{
                display:inline-block;
                width:60px;
                height:60px;
                border-radius:50%;
                text-align:center;
                background:#1996cd;
                .ivu-icon{
                    color:#fff;
                    margin-top:15px;
                    font-size:30px;
                }
            }
            b{
                display:inline-block;
                width:230px;
                height: 60px;
                line-height:60px;
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
}
</style>

<template>
    <div class="gene_page">
        <div class="video_box">
            <div class="v-box">
                <div class="v_show_box fl">
                    <video v-show="videoShow" width="450" height="248" :src="videoUrl" loop="loop" controls="controls"></video>
                    <embed v-show="!videoShow" src="https://imgcache.qq.com/tencentvideo_v1/playerv3/TPout.swf?max_age=86400&v=20161117&vid=d0631s99fh2&auto=0" allowFullScreen="true" quality="high" width="450" height="240" align="middle" allowScriptAccess="always" type="application/x-shockwave-flash"></embed>
                    <span>罕见病检测报告-demo</span>
                </div>
                <div class="v_show_title fl">
                    <p>本产品拥有自主研发的信息分析平台,可快速准确地对临床样本的各种类型数据进行分析,并基于庞大的知识库提供合理的数据解读和报告。通过分析患者的组学信息对患患者进行精准诊断,并提供个性化的用药指导。可以有效地降低药物毒副作用,减少药物不良反应,提高患者的生活质量。
精准医学解决方案可进行私有化部署,SAAS层包含 GeneReviews、CHPO、 Vishuo、TGeX、 Spark、Aspera等,可为肿瘤、罕见病、队列研究等应用提供稳定、快速、准确地运行环境支持。</p>
                </div>
            </div>
        </div>
        <!--罕见病精准医学系统的优势-->
        <div class="advantage">
            <h3>罕见病精准医学系统的优势</h3>
            <div class="ad_content">
                <Row type="flex" justify="center">
                    <Col class="col" span="4"></Col>
                    <Col class="col" span="10">
                        <div class="ad">
                            <div style="float:left"><span><Icon type="ios-upload-outline"></Icon></span></div>
                            <div style="float:left"><b>大规模数据的<i>批量上传</i>和管理</b></div>
                        </div>
                        <div class="ad">
                            <div style="float:left"><span><Icon type="social-buffer-outline"></Icon></span></div>
                            <div style="float:left"><b style="line-height:30px;">强大的数据库<i>资源支撑</i>的变异位点的<i>解读系统</i></b></div>
                        </div>
                    </Col>
                    <Col span="10">
                    <div class="ad">
                            <div style="float:left"><span><Icon type="stats-bars"></Icon></span></div>
                            <div style="float:left"><b>严格质控的生物信息<i>分析流程</i></b></div>
                        </div>
                        <div class="ad">
                            <div style="float:left"><span><Icon type="clipboard"></Icon></span></div>
                            <div style="float:left"><b>自动的<i>报告生成</i>系统</b></div>
                        </div>
                    </Col>
                 </Row>
            </div>
        </div>
    </div>
</template>

<script>
import { data } from 'api/index.js';
export default {
  name:"genePage",
  data(){
      return{
            videoUrl:"",
            videoShow:true
      }
  },
  methods:{
    getVideoUrl(){
        let obj = {
            "productId": "1"
        }
        data.getPlayVideoPath(obj).then((data) => {
            if(data.returnCode==0){
                if(data.data.path==null || data.data.path==""){
                    this.videoShow=false; 
                }else{
                    this.videoShow=true;
                    this.videoUrl=data.data.path;
                }
            }
        }).catch((error) => {
            this.videoShow = false;
        })
    }
  },
  mounted(){
    this.getVideoUrl();
  }
}
</script>
