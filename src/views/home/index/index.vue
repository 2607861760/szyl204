<style lang="scss" scoped>
@import '~common/scss/public/base-variable';
@import '~common/scss/public/base-mixin';
@import '~common/scss/base-style';
.clear {
    @include clear;
}

.top-bar {
    border: 1px solid #d7dde4;
    background: $home-blue;
    height: 32px;
}
.top-content {
    float: right;
    margin-right: 25px;
    height: 32px;
    line-height: 32px;
    a {
        color: #fff;
        margin: 0 10px;
    }
}

.banner {
    overflow:hidden;
    margin:0 auto;
    .carousel {
         width: 100%;
            height: 100%;
        img {
            width: 100%;
            display:block;
        }
    }
}
.inner{
        padding-top:60px;
        text-align:center;
        color:#333;
        .inner-title{
            font-size:20px; 
            font-weight:bold;
            letter-spacing:0.5rem;
            span{
                font-size:14px;
                color:#ff6600;
                letter-spacing:0;
                font-weight:normal;
            }
        }
    }
    /*精准医学*/
    .medicine{
        height:430px;
        background:rgba(242, 242, 242, 1);
        .medicine-inner{
            padding:60px;
            .medicine-pic{
                width:120px;
                margin:auto;
                .medicine-icon{
                    width:100%;
                    height:120px;
                    border-radius:50%;
                    img{
                        width:60px;
                        height:60px;
                        display:inline-block;
                        margin-top:30px;
                    }
                }
                p{
                    margin-top:20px;
                    width:130px;
                    &:hover{
                        color:#ff6600;
                    }
                }
            }
        }
    }
    /*组学云平台*/ 
    .cloud{
        height:720px;
        background:rgba(255, 255, 255, 1);
        .cloud-inner{
            height:488px;
            padding:40px 50px 0;
            .cloud-pic-fs{
                height:488px;
                background:url('./img/u8.jpg') no-repeat;
            }
            .cloud-pic-sc{
                height:244px;
                background:url('./img/u6.jpg') no-repeat;
            }
            .cloud-pic-th{
                height:244px;
                background:url('./img/u218.jpg') no-repeat;
            }
            .cloud-pic-fr{
                height:244px;
                background:url('./img/u94.jpg') no-repeat;
                background-size:100% 100%;
            }
            .cloud-pic{
                position:relative;
                .cloud-bg{
                    width:100%;
                    height:100%;
                    position:absolute;
                    top:0;
                    left:0;
                    z-index:333;
                    font-size:20px;
                    font-weight:700;
                    line-height:244px;
                    text-align:center;
                    color:#fff;
                }
                .cloud-bg.cloud-bg-fs{
                    background:rgba(25, 158, 216, .7);
                    line-height:488px;
                    &:hover{
                        background:rgba(25, 158, 216, .5);
                    }
                }
                .cloud-bg.cloud-bg-sc{
                    background:rgba(0, 181, 0, .7);
                    &:hover{
                        background:rgba(0, 181, 0, .5);
                    }
                }
                .cloud-bg.cloud-bg-th{
                    background:rgba(255, 102, 0, .7);
                    &:hover{
                        background:rgba(255, 102, 0, .5);
                    }
                }
                .cloud-bg.cloud-bg-fr{
                    background:rgba(0, 0, 0, .7);
                    &:hover{
                        background:rgba(0, 0, 0, .5);
                    }
                }
            }
        }
    }
        /*关于我们 */
    .about{
       height:420px;
       background-image:url('./img/about.jpg');
       background-size:100% 100%;
       width:100%; 
       position: relative;
       .about-bg{
           width:100%;
           height:100%;
           background: rgba(0, 0, 0, .3);
           position: absolute;
           top:0;
           left:0;
       }
       .inner{
           color:#fff;
       }
       .about-txt{
           color:#fff;
           text-indent:2em;
           padding:30px 0 0;
           margin:auto;
           line-height:28px;
       }
    }
    /*科研合作 */
    .cooperate{
        height:490px;
        background:rgba(255, 255, 255, 1);
        .cooperate-inner{
            padding:60px 50px 0;
            position:relative;
            height:196px;
            .cooperate-left,.cooperate-right{
                position: absolute;
                top: 70%;
                width: 40px;
                height: 40px;
                background-image:url('./img/left.png');
                background-size:200% 200%;
                
            }
            .cooperate-left{
                left:0;
                background-position:-1px -1px;
                &:hover{
                    background-position:-1px -40px;
                }
            }
            .cooperate-right{
                right:0;
                background-position:-40px -1px;
                &:hover{
                    background-position:-40px -40px;
                }
            }
            .cooperate-content{
                width:100%;
                height:198px;
                position:relative;
                .cooperate-pic{
                    width:100%;
                    height:100%;
                    position:absolute;
                    top:0;
                    left:0;
                    &:hover{

                        transition:all ease .10s;
                    //     top:-10px;
                         box-shadow:0 0 10px #999; 
                        .cooperate-bg{
                            display:block;
                        }
                        .cooperate-tras{
                            // background:rgba(25, 150, 205, 1);
                            height:40px;
                        }
                    }
                    .cooperate-tras {
                        width:100%;
                        height:0;
                        background:#178ec1;
                        transition-property:height;
                        transition-duration:.3s;
                        //transition-delay:.2s;
                        z-index:-1;
                        position:absolute;
                        bottom:0;
                    }
                    .cooperate-bg{
                        width:100%;
                        height:100%;
                        position:absolute;
                        top:0;
                        left:0;
                        z-index:222;
                        background:rgba(0,0,0,.3);
                        color:#fff;
                        display:none;
                        p{
                            padding:0 20px;
                            text-indent:2rem;
                            font-size:14px;
                        }
                        
                    }
                    .cooperate-title{
                        position:absolute;
                        bottom:0;
                        left:0;
                        z-index:333;
                        width:100%;
                        height:40px;
                        background:rgba(0,0,0,.6);
                        color:#fff;
                        text-align:center;
                        line-height:40px;
                        transition:all 1s ease 0;
                    }
                }
                .cooperate-pic.cooperate-pic-fs{
                    background:url('./img/fd.png');
                }
                .cooperate-pic.cooperate-pic-sc{
                    background:url('./img/hb.png');
                }
                .cooperate-pic.cooperate-pic-th{
                    background:url('./img/xj.png');
                }
            }
        }
    }
</style>
<template>
    <div class="index">
        <div class="banner">
            <el-carousel :interval="5000" arrow="never" :height="height" >
                <el-carousel-item v-for="(item,index) in banners" :key="index">
                    <div class="carousel">
                        <img :src="item.img" alt="" :height="height">
                    </div>
                </el-carousel-item>
            </el-carousel>  
        </div>
        <!--精准医学-->
        <div class="medicine">
            <div class="inner container">
                <div class="inner-title">精准医学</div>
                <div class="medicine-inner">
                    <Row type="flex" justify="space-between">
                        <Col :lg="{span:6}">
                            <div class="medicine-pic">
                                <div class="medicine-icon" style="background:#1ea8e3;">
                                    <img src="./img/tu2.png"/>
                                </div>
                                <p>罕见病精准医学</p>
                            </div>
                        </Col>
                        <Col :lg="{span:6}">
                            <div class="medicine-pic">
                                <div class="medicine-icon" style="background:#00c800;">
                                    <img src="./img/tu3.png"/>
                                </div>
                                <p>肿瘤精准医学</p>
                            </div>
                        </Col>
                        <Col :lg="{span:6}">
                            <div class="medicine-pic">
                                <div class="medicine-icon" style="background:#00c8c8;">
                                    <img src="./img/tu1.png"/>
                                </div>
                                <p>药物基因组精准分析</p>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
        
        <!--组学云平台-->
        <div class="cloud">
            <div class="inner container">
                <div class="inner-title">组学云平台</div>
                <div class="cloud-inner">
                    <Row>
                        <Col span="6">
                            <div class="cloud-pic cloud-pic-fs">
                                <div class="cloud-bg cloud-bg-fs">基因组学研究</div>
                            </div>
                        </Col>
                        <Col span="18">
                            <div class="cloud-pic cloud-pic-sc">
                                <div class="cloud-bg cloud-bg-sc">蛋白质组研究</div>
                            </div>
                            <Row>
                                <Col span="12">
                                    <div class="cloud-pic cloud-pic-th">
                                        <div class="cloud-bg cloud-bg-th">代谢组</div>
                                    </div>
                                </Col>
                                <Col span="12">
                                    <div class="cloud-pic cloud-pic-fr">
                                        <div class="cloud-bg cloud-bg-fr">更多</div>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
        <!--关于我们-->
        <div class="about" id="#about">
            <div class="about-bg">
                <div class="inner container">
                    <div class="inner-title">关于我们</div>
                    <div class="about-txt">
                        <Row>
                            <Col span="24">
                                <p style="text-align:left;">
                                    <span style="color:#C10028;font-weight:700;font-size:20px;">神</span>州医疗目前是国内最早、  最权威的能够承担国家级健康医疗大数据建设和运营的企业。拥有健康医疗领域多项自主知识产权及软件著作权，拥有医疗信息化、医疗大数据分析、基因、医疗影像、生物信息、临床医学、病理、放疗等方面的专业技术、业务专家、医生及博士团队。神州医疗专注于健康医疗大数据、医疗云服务、  医疗卫生信息化等领域，向客户提供医疗信息化及健康医疗大数据服务，  帮助客户提高健康医疗服务水平，努力成为中国健康医疗大数据品牌领导者。神州医疗承担过国家“十二五”计划—人口宏观管理与决策信息系统（PADIS系统)，国家肿瘤大数据平台（863课题），  国家罕见病临床队列登记注册网络平台、  国家卫生计生委建设装备审批监管系统工程软件开发等国家级项目建设，  同时在北京、 天津、 江苏、 湖南、 湖北、黑龙江等多地承担着区域卫生信息平台、医院信息集成平台等省市级项目建设。神州医疗依托目前主流的云计算、大数据、物联网、  人工智能、机器学习、可穿戴设备等新技术，不断驱动我国健康医疗大数据发展的变革与创新，向客户提供健康医疗大数据解决方案、医疗信息化建设咨询、健康医疗软件产品开发、  医疗卫生大数据中心建设及安全体系建设等全面医疗服务解决方案，具有区域人口健康信息平台、医院随访、远程医疗、医疗影像等几大产品线。
                                </p>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
            
        </div>
        <!--科研合作-->
        <div class="cooperate">
            <div class="inner container">
                <div class="inner-title">科研合作</div>
                <div class="cooperate-inner">
                    <div class="cooperate-left"></div>
                    <Row type="flex" justify="space-around">
                        <Col span="6">
                            <div class="cooperate-content">
                                <div class="cooperate-pic cooperate-pic-fs">
                                    <div class="cooperate-bg">
                                        <div style="padding:18px 0 10px;"><img src="./img/fdlg.png" height="40" width="40" /></div>
                                        <p>这里是对合作伙伴简短的介绍，包括医院成立时间、地址、级别合作项目等介绍</p>
                                    </div>
                                    <div class="cooperate-title">上海复旦儿科
                                    <div class="cooperate-tras"></div>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col span="6">
                            <div class="cooperate-content">
                                <div class="cooperate-pic cooperate-pic-sc">
                                    <div class="cooperate-bg">
                                        <div style="padding:18px 0 10px;"><img src="./img/hblg.png" height="40" width="40"/></div>
                                        <p>这里是对合作伙伴简短的介绍，包括医院成立时间、地址、级别合作项目等介绍</p>
                                    </div>
                                    <div class="cooperate-title">湖北省肿瘤医院
                                    <div class="cooperate-tras"></div>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col span="6">
                            <div class="cooperate-content">
                                <div class="cooperate-pic cooperate-pic-th">
                                    <div class="cooperate-bg">
                                        <div style="padding:18px 0 10px;"><img src="./img/xjlg.png" height="40" width="40"/></div>
                                        <p>这里是对合作伙伴简短的介绍，包括医院成立时间、地址、级别合作项目等介绍</p>
                                    </div>
                                    <div class="cooperate-title">西京医院
                                    <div class="cooperate-tras"></div>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <div class="cooperate-right"></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {
    feature,
    database
} from 'api/index.js';
export default {
    name: "index",
    data() {
        return {
            height:"408px",
            banners:[{img:require('./img/bn1.jpg')},{img:require('./img/bn2.jpg')},{img:require('./img/bn3.jpg')},{img:require('./img/bn4.jpg')}]
        }
    },
    methods: {
    	resize:function(){//动态改变banner图的高度
    		 const that = this;
    		 window.screenWidth = document.body.clientWidth;
             that.screenWidth = window.screenWidth;
             that.height=that.screenWidth*0.2125+"px";
    	}
    },
    mounted () { 
       	this.resize();
       	const that = this;
       	window.onresize = function() {
        	return that.resize();
        } 
    }
}
</script>
